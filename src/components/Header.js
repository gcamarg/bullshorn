import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../Contexts/stateProvider";
import "./Header.css";
function Header() {
  const { authenticated, handleLogout } = useContext(StateContext);

  return (
    <>
      <nav className="navBar">
        <Link to="/" className="navBar__clickable navBar__logo">
          BullsHorn
        </Link>
        <div className="navbar__rightmenu">
          <Link to="/myportfolio" className="navBar__clickable">
            My Portfolio
          </Link>
          <Link
            to={authenticated ? "/" : "/login"}
            onClick={authenticated ? handleLogout : ""}
            className="navBar__clickable"
          >
            {authenticated ? "LogOut" : "LogIn"}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Header;
