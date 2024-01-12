import { useState, useEffect } from "react";
import "./App.css";
import { GameReveal } from "../components/GameReveal";

function App() {
  const [rollCount, setRollCount] = useState(3);
  const [rolledNum, setRolledNum] = useState(0);
  // const games = gamelist.length;

  const gamelist = [
    { appid: 1, name: "Dota 2", icon: "" },
    { appid: 2, name: "CS 2", icon: "" },
    { appid: 3, name: "Portal", icon: "" },
    { appid: 4, name: "Portal 2", icon: "" },
    { appid: 5, name: "Kenshi", icon: "" },
    { appid: 6, name: "Persona 4", icon: "" },
    { appid: 7, name: "Baldurs Gate 3", icon: "" },
    { appid: 8, name: "Chrono Trigger", icon: "" },
    { appid: 9, name: "Firewatch", icon: "" },
  ];

  const games = gamelist.length;
  const roll = () => {
    if (rollCount > 0) {
      setRolledNum(Math.floor(Math.random() * games));
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

      <GameReveal numRolled={rolledNum} gameTitle={gamelist[rolledNum].name} />
      <label htmlFor="steamid" className="steamid">
        Enter Your Steam ID:{" "}
      </label>

      <input type="text" className="steamidInput" />

      <p className="rollCounter">Rolls Left: {rollCount} </p>
      <button onClick={resetRoll}>Reset</button>
      <button onClick={roll}>Roll</button>
    </>
  );
}

export default App;
