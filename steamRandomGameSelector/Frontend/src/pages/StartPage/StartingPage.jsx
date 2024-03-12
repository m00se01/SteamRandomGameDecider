import "./StartingPage.css";
import "./StartingPageModal.css";
import { Footer } from "../../components/Footer/Footer";
import { Link, redirect, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import infoIcon from "../../assets/infoIcon.svg";
import { Loading } from "../../components/Loading/Loading";
import { AccountInput } from "../../components/AccountInput/AccountInput";

export const StartingPage = () => {
  const [steamid, setSteamid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // UserData
  const [playerData, setPlayerData] = useState(null);
  const [avatar, setPlayerAvatar] = useState("");
  const [playerName, setPlayerName] = useState("");

  const steamidApiUrl = "http://localhost:8000/api/steamid";
  const playerInfoUrl = "http://localhost:8000/api/playerInfo";
  const navigate = useNavigate();

  // Fetch
  // Would making a generic get, post etc function be useful?

  useEffect(() => {
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
    fetchPlayerData();
  }, [isModalOpen]);

  const handleSubmit = async (steamid) => {
    const response = await fetch(steamidApiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ steamid }),
    });

    if (response.ok) {
      setIsModalOpen(true);
    } else if (response.status === 500) {
      alert("Cannot Access Players Library");
    } else {
      console.error("Invalid SteamID");
    }
  };

  const openNewWindow = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="startpage-container">
        <h1 className="startpage-header">Welcome to SteamRoll</h1>

        <div className="steamid-input-container">
          <h2 className="steamid-input-container-header">
            To get started please enter your steamid in the box below
          </h2>

          <AccountInput onSubmit={handleSubmit} />
        </div>

        {/* Confirmation Modal */}
        <ReactModal
          className={"Modal"}
          overlayClassName={
            isModalOpen
              ? "Overlay Overlay--after-open"
              : "Overlay Overlay--before-close"
          }
          contentLabel={"Confirmation Modal"}
          shouldCloseOnEsc={true}
          isOpen={isModalOpen}
          onAfterOpen={useEffect(() => {
            if (playerData === null) {
              console.log("No player info");
            } else {
              setIsLoading(true);

              setTimeout(() => {
                setIsLoading(false);
              }, 1100);

              setPlayerName(playerData.personaname);
              setPlayerAvatar(playerData.avatarfull);
            }
          }, [playerData])}
          closeTimeoutMS={300}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <img className="profile" src={avatar} alt="profile picture" />
              <h1>{playerName}</h1>
            </div>
          )}

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

        <span className="note">
          Note: Inorder for us to access your game library, your profile must be
          set to public!{" "}
          <a
            href="#"
            onClick={() =>
              openNewWindow(
                "https://help.steampowered.com/en/faqs/view/588C-C67D-0251-C276"
              )
            }
          >
            <img className="infoIcon" src={infoIcon} alt="info-icon" />{" "}
          </a>
        </span>
      </div>
      <Footer />
    </>
  );
};
