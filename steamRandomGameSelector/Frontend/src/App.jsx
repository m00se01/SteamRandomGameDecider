import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [rollCount, setRollCount] = useState(0);

  return (
    <>
      <h1>Choose For Me</h1>

      {/* Text box that scrolls */}

      <p>Text Box?</p>

      <button>Spin</button>
    </>
  );
}

export default App;
