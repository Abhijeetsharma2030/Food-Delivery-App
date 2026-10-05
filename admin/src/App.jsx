import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || "",
  );

  const onLogout = () => {
    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common["token"];
    setAdminToken("");
  };

  if (!adminToken) {
    return (
      <>
        <ToastContainer />
        <Login onLogin={setAdminToken} />
      </>
    );
  }

  return (
    <div className="app">
      <ToastContainer />
      <Navbar onLogout={onLogout} />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/add" replace />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
