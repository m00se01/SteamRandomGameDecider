import { React, useState } from "react";
import "./Home.css";
import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";
import { GameReveal } from "../../components/GameReveal/GameReveal";

export const Home = () => {
  const [rollCount, setRollCount] = useState(3);
  const [appid, setAppid] = useState(0);
  const [gameTitle, setGameTitle] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  const apiUrl = "http://localhost:8000/api/randomAll";

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
          <div>
            <label htmlFor="steamid" className="steamid">
              Enter Your Steam ID:
            </label>

            <input type="text" className="steamid-input" />
          </div>

          <span>*Note: your steam profile must be set to public </span>
          <br />
          <span
            onMouseEnter={() => {
              console.log("Where to find your steamid?");
            }}
          >
            <a className="find-steamid" href="#">
              Find steamid
            </a>
          </span>
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
