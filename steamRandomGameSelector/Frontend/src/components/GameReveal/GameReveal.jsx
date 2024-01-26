import React, { useEffect, useState } from "react";
import "./GameReveal.css";
import { Loading } from "../Loading/Loading";

export const GameReveal = ({ gameTitle, imgUrl, appid, rollCount }) => {
  const [display, setDisplay] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let iconUrlTemplate = `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${imgUrl}.jpg`;
  let boxArtUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/library_600x900_2x.jpg`;

  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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

    const load = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    load();
    shuffle();
  }, [gameTitle]);

  return (
    <div>
      <div className="container">
        {/* TODO: style begin rolling screen */}
        {rollCount === 3 ? (
          <p>Click Roll to begin</p>
        ) : loading ? (
          <Loading />
        ) : (
          <div>
            <img src={boxArtUrl} alt={gameTitle} className="gameBoxArt" />
            <div className="gameTitleWithIcon">
              <img src={iconUrlTemplate} alt={gameTitle} className="gameIcon" />
              <p>{display}</p>
            </div>
          </div>
        )}

        {/* TODO: Error Handling, Refactor
        <img src={boxArtUrl} alt={gameTitle} className="gameBoxArt" />

        <div className="gameTitleWithIcon">
          <img src={iconUrlTemplate} alt={gameTitle} className="gameIcon" />
          <p>{display}</p>
        </div> */}
      </div>
    </div>
  );
};
