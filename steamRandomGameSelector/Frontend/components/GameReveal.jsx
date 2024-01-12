import React, { useEffect, useState } from "react";
import "./GameReveal.css";

export const GameReveal = ({ numRolled, gameTitle }) => {
  const [display, setDisplay] = useState("");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const shuffle = () => {
      let tempDisplay = gameTitle;
      let iterations = 0;

      console.log(gameTitle);

      const interval = setInterval(() => {
        setDisplay(
          tempDisplay
            .split("")
            .map((letter, index) => {
              if (index < iterations + 1) {
                return tempDisplay[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        if (iterations > tempDisplay.length) {
          clearInterval(interval);
        }

        iterations += 1;
      }, 50);
    };

    shuffle();
  }, [numRolled, gameTitle]);

  return (
    <div>
      <div className="container">
        <p>{numRolled}</p>
        {/* Reveal Animation, Spinner, Symbols to Letters,  */}
        <p>{display}</p>
      </div>
      {/* <button onClick={shuffle}>Test</button> */}
    </div>
  );
};
