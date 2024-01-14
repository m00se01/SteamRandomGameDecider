import React from "react";
import "./Navbar.css";
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
            <a href="#">*Home</a>
          </li>
          <li>
            <a href="#">*Help</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
