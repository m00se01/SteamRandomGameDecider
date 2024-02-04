import React from "react";
import "./StartingPage.css";
import { Footer } from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

export const StartingPage = () => {
  const [steamid, setSteamid] = useState("");

  const change = (event) => {
    setSteamid(event.target.value);
  };

  return (
    <div className="startpage-container">
      <h1 className="startpage-header">Welcome to SteamRoll</h1>

      <div className="steamid-input-container">
        <h2>To get started please enter your Steam ID in the box below</h2>

        <div>
          <label htmlFor="steamid">Steam ID: </label>
          <input
            id="steamid"
            placeholder="XXXXXXXXXXX"
            type="text"
            name="steamid"
            onChange={change}
            value={steamid}
          />
        </div>

        <Link
          onClick={() => {
            alert(steamid);
          }}
          className="submit-btn"
          to="/home"
        >
          Submit
        </Link>
      </div>

      <p>
        Please note that inorder to access your game library your steam account
        must be set to public.<br></br> If you need help changing these settings
        please{" "}
        <a id="steamid-help-link" href="#">
          click here
        </a>
      </p>

      <Footer />
    </div>
  );
};
