import { useState, useEffect } from "react";
import "./App.css";
import { GameReveal } from "./components/GameReveal/GameReveal";
import games from "../src/data/testdata";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [rollCount, setRollCount] = useState(3);
  const [rolledNum, setRolledNum] = useState(0);

  //Game Icon Image
  const [imgUrl, setImgUrl] = useState("");

  const gamesLength = games.length;

  const roll = () => {
    if (rollCount > 0) {
      setRolledNum(Math.floor(Math.random() * gamesLength));
      setRollCount(rollCount - 1);
    }
  };

  const resetRoll = () => {
    setRollCount(3);
  };

  return (
    <>
      <Navbar />

      <h1 className="main-title">Let Us Decide Your Fate</h1>

      <div>
        <GameReveal
          numRolled={rolledNum}
          gameTitle={games[rolledNum].name}
          appid={games[rolledNum].appid}
          imgUrl={games[rolledNum].img_icon_url}
        />
      </div>

      <div className="info-section">
        <div>
          <label htmlFor="steamid" className="steamid">
            Enter Your Steam ID:{" "}
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

      {/* <p>Can't Decide what to play? Let us decide for you!</p> */}

      <Footer />
    </>
  );
}

export default App;
