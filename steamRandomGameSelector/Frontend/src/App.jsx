import { useState, useEffect } from "react";
import "./App.css";
import { GameReveal } from "../components/GameReveal";
import games from "../src/data/testdata";

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
    } else {
      alert("no more rolls left");
    }
  };

  const resetRoll = () => {
    setRollCount(3);
  };

  return (
    <>
      <h1>Choose For Me</h1>

      <div>
        <GameReveal
          numRolled={rolledNum}
          gameTitle={games[rolledNum].name}
          appid={games[rolledNum].appid}
          imgUrl={games[rolledNum].img_icon_url}
        />
      </div>

      <div>
        <label htmlFor="steamid" className="steamid">
          Enter Your Steam ID:{" "}
        </label>

        <input type="text" className="steamidInput" />
      </div>

      <p className="rollCounter">Rolls Left: {rollCount} </p>
      <button onClick={resetRoll}>Reset</button>
      <button onClick={roll}>Roll</button>
    </>
  );
}

export default App;
