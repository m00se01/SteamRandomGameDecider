import React, { useEffect, useState } from "react";
import "./GameReveal.css";

export const GameReveal = ({ numRolled, gameTitle, imgUrl, appid }) => {
  const [display, setDisplay] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let iconUrlTemplate = `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${imgUrl}.jpg`;
  let boxArtUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/library_600x900_2x.jpg`;

  console.log(boxArtUrl);

  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const shuffle = () => {
      let tempDisplay = gameTitle;
      //Keep track of which letter we are on
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

  //Get Image
  // useEffect(() => {}, []);

  return (
    <div>
      <div className="container">
        {/* <p>{numRolled}</p> */}

        {/* <img src={imgUrlTemplate} alt={gameTitle} className="gameIcon" /> */}

        {/* TODO: Error Handling, Refactor */}
        <img src={boxArtUrl} alt={gameTitle} className="gameBoxArt" />

        <p>{display}</p>
      </div>
    </div>
  );
};
