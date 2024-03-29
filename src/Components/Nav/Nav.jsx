import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import "./Nav.css";
import image1 from "../../assets/Vector.png";

const Nav = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <>
      <nav>

        <div className="nav-container">
          <div className='nav-item'>
            <span className='nav-img'> <img src={image1} alt="Logo" /> 912121131313</span>
          </div>
          <div className='nav-item'>
            Get 50% off on selected items | Shop Now
          </div>
          {token ? (
            <div className="nav-item logout" onClick={handleLogout}>Logout</div>
          ) : (
            <div className='nav-item signup-login-container'>
              <Link className=' nav-item login-signup' to={"/login"}> Login </Link>
              |
              <Link className=' nav-item login-signup' to={"/signup"}>Signup</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Navigation Icons */}
      <div className="bottom-nav-icons">
        <Link to="/home"><FontAwesomeIcon icon={faHome} /></Link>
        <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link>
        <Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link>
      </div>
    </>
  );
};

export default Nav;
