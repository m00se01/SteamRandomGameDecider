import { React, useEffect, useState } from "react";
import "./Home.css";
import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";
import { GameReveal } from "../../components/GameReveal/GameReveal";

export const Home = () => {
  const [rollCount, setRollCount] = useState(3);
  // Game Data
  const [appid, setAppid] = useState(0);
  const [gameTitle, setGameTitle] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  // Player Info
  const [playerData, setPlayerData] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [playerAvatar, setPlayerAvatar] = useState("");

  const apiUrl = "http://localhost:8000/api/randomAll";
  const playerInfoUrl = "http://localhost:8000/api/playerInfo";

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
    console.log(playerData);
  }, []);

  useEffect(() => {
    if (playerData === null) {
      console.log("No player info");
    } else {
      setPlayerName(playerData.personaname);
      setPlayerAvatar(playerData.avatarmedium);
    }
  }, [playerData]);

  const roll = async () => {
    if (rollCount > 0) {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAppid(data.appid);
        setGameTitle(data.name);
        setIconUrl(data.img_icon_url);
        setRollCount(rollCount - 1);
        console.log(data);
        console.log(gameTitle, appid, iconUrl);
      } catch (error) {
        console.error("Fetch Error: ", error);
      }
    }
  };

  const resetRoll = () => {
    setRollCount(3);
  };

  return (
    <>
      <div className="home-wrapper">
        <Navbar />

        <h1 className="main-title">Let Us Decide Your Fate</h1>

        <div>
          <GameReveal
            gameTitle={gameTitle}
            appid={appid}
            imgUrl={iconUrl}
            rollCount={rollCount}
          />
        </div>

        <div className="info-section">
          {/* Avatar and Username */}
          <div className="profile-info">
            <img src={playerAvatar} alt="profile-pic" />
            <span>{playerName}</span>
          </div>

          <div className="roll-container">
            <p className="roll-counter">Rolls Left: {rollCount} </p>
            <button onClick={resetRoll}>Reset</button>
            <button className={".rounded-btn"} onClick={roll}>
              Roll
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
