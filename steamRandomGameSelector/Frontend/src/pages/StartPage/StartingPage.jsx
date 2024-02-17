import "./StartingPage.css";
import "./StartingPageModal.css";
import { Footer } from "../../components/Footer/Footer";
import { Link, redirect, useNavigate, Navigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import ReactModal from "react-modal";

export const StartingPage = () => {
  const [steamid, setSteamid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // UserData
  const [playerData, setPlayerData] = useState(null);
  const [avatar, setPlayerAvatar] = useState("");
  const [playerName, setPlayerName] = useState("");

  const apiUrl = "http://localhost:8000/api/steamid";
  const playerInfoUrl = "http://localhost:8000/api/playerInfo";
  const navigate = useNavigate();

  // Fetch
  // Would making a generic get, post etc function be useful?
  const fetchPlayerData = async () => {
    try {
      const response = await fetch(playerInfoUrl);

      if (!response.ok) {
        throw new Error("Fetch Error was not ok");
      }

      const data = await response.json();

      setPlayerData(data);
    } catch (error) {
      console.error("Fetch Error: ", error);
    }
  };

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

    // Potentially add a popup confirmation to check if the user entered the correct steamid
    if (response.ok) {
      setIsModalOpen(true);
      // navigate("/home");
    } else if (response.status === 500) {
      alert("Cannot Access Players Library");
    } else {
      console.log(steamid);
      console.error("Invalid SteamID");
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, [isModalOpen]);

  return (
    <div className="startpage-container">
      <h1 className="startpage-header">Welcome to SteamRoll</h1>

      <div className="steamid-input-container">
        <h2>To get started please enter your Steam ID in the box below</h2>

        <div className="startscreen-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div>
              {/* <label htmlFor="steamid">Steam ID: </label> */}
              <input
                id="steamid"
                required="true"
                placeholder="Enter Steam ID"
                type="text"
                name="steamid"
                onChange={change}
                value={steamid}
              />
            </div>

            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>

          <span>
            <a href="https://help.steampowered.com/en/faqs/view/2816-BE67-5B69-0FEC">
              Where to find steamid?
            </a>
          </span>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ReactModal
        className={"Modal"}
        overlayClassName={"Overlay"}
        isOpen={isModalOpen}
        onAfterOpen={useEffect(() => {
          if (playerData === null) {
            console.log("No player info");
          } else {
            setPlayerName(playerData.personaname);
            setPlayerAvatar(playerData.avatarfull);
          }
        }, [playerData])}
      >
        <div>
          <img className="profile" src={avatar} alt="profile picture" />
          <h1>{playerName}</h1>
        </div>

        <p>Is this who you were looking for?</p>
        <div>
          <button
            onClick={() => {
              navigate("/home");
            }}
          >
            Yes
          </button>

          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            No
          </button>
        </div>
      </ReactModal>

      <p>
        Note: Inorder for us to access your game library your steam account must
        be set to public.<br></br> If you need help changing these settings
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
