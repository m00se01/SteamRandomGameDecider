import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
// import { steamDisclaimerBtn } from "../../assets/SteamDisclaimer.png";
export const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="" alt="Logo" />
        </div>

        {/* <h1 className="navbar-title">Decide My Fate</h1> */}

        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
