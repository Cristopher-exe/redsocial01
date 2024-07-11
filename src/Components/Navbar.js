import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import Profile from "./pages/Profile";
import LogoutButton from "./pages/LogoutButton";
import "./Navbar.css";
import { useAuth0 } from '@auth0/auth0-react';
function Navbar() {
  const {isAuthenticated} = useAuth0();
  const {loginWithRedirect} = useAuth0();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            EVCUNAH
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/reservation"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Reservation
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About us?
              </Link>
            </li>
            <li>
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {isAuthenticated ? <LogoutButton/> : button && <Button onClick={() => loginWithRedirect() } buttonStyle="btn--outline">SIGN UP</Button>}
         
          
          <Profile/>
          
        </div>
      </nav>
    </>
  );
}
export default Navbar;
