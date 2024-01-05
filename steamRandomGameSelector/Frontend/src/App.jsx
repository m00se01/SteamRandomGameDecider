import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [rollCount, setRollCount] = useState(3);
  const [rolledNum, setRolledNum] = useState(0);
  const games = 379;

  const roll = () => {
    if (rollCount > 0) {
      setRolledNum(Math.floor(Math.random() * games));
      console.log(rollCount);
      console.log(`rollednum: ${rolledNum}`);
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

      <label htmlFor="steamid">Enter Your Steam ID: </label>
      <input type="text" />

      <p>{rolledNum}</p>

      <p>Rolls Left: {rollCount} </p>
      <button onClick={resetRoll}>reset</button>
      <button onClick={roll}>Roll</button>
    </>
  );
}

export default App;
