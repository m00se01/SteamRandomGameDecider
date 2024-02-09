import React from "react";
import "./StartingPage.css";
import { Footer } from "../../components/Footer/Footer";
import { Link, redirect, useNavigate, Navigate } from "react-router-dom";

import { useState } from "react";

export const StartingPage = () => {
  const [steamid, setSteamid] = useState("");

  const apiUrl = "http://localhost:8000/api/steamid";

  const navigate = useNavigate();

  const change = (event) => {
    setSteamid(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ steamid }),
    });

    if (response.ok) {
      alert("Success");
      // redirect("/home");
      navigate("/home");
    } else {
      console.log(steamid);
      console.error("Invalid SteamID");
    }
  };

  return (
    <div className="startpage-container">
      <h1 className="startpage-header">Welcome to SteamRoll</h1>

      <div className="steamid-input-container">
        <h2>To get started please enter your Steam ID in the box below</h2>

        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="steamid">Steam ID: </label>
            <input
              id="steamid"
              required="true"
              placeholder="Enter Steam ID"
              type="text"
              name="steamid"
              onChange={change}
              value={steamid}
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* <Link
          onClick={() => {
            alert(steamid);
          }}
          className="submit-btn"
          to="/home"
        >
          Submit
        </Link> */}
      </div>

      <p>
        Please note that inorder to access your game library your steam account
        must be set to public.<br></br> If you need help changing these settings
        please{" "}
        <a
          id="steamid-help-link"
          href="https://help.steampowered.com/en/faqs/view/2816-BE67-5B69-0FEC"
        >
          click here
        </a>
      </p>

      <Footer />
    </div>
  );
};
