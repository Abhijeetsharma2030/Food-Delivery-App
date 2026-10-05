import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../assets/assets";
import "./Login.css";
import PropTypes from "prop-types";

const Login = ({ onLogin }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${url}/api/user/login`, data);
    if (response.data.success && response.data.isAdmin) {
      localStorage.setItem("adminToken", response.data.token);
      axios.defaults.headers.common["token"] = response.data.token;
      onLogin(response.data.token);
    } else if (response.data.success) {
      toast.error("This account is not an admin");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-form" onSubmit={onSubmitHandler}>
        <h2>Admin Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={onChangeHandler}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;
