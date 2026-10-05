import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";
import PropTypes from "prop-types";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "₹";
  const deliveryCharge = 50;

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } },
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId] || prev[itemId] <= 0) return prev;
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } },
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success && response.data.data) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (tokenParam) => {
    const authToken =
      typeof tokenParam === "object" && tokenParam?.token
        ? tokenParam.token
        : tokenParam;
    if (!authToken) return;
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token: authToken } },
      );
      if (response.data.success && response.data.cartData) {
        setCartItems(response.data.cartData);
      } else {
        setCartItems({});
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
      setCartItems({});
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
    currency,
    deliveryCharge,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreContextProvider;
