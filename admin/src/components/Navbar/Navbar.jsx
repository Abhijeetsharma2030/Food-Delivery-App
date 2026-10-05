import "./Navbar.css";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <div className="navbar-right">
        <button className="logout-btn" onClick={onLogout}>Logout</button>
        <img className="profile" src={assets.profile_image} alt="" />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func,
};

export default Navbar;
