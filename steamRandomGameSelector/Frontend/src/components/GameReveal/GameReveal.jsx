import { useEffect, useState } from "react";
import "./GameReveal.css";
import { Loading } from "../Loading/Loading";

export const GameReveal = (props) => {
  const { gameData, rollCount } = props;

  let iconUrlTemplate = `http://media.steampowered.com/steamcommunity/public/images/apps/${gameData.appid}/${gameData.img_icon_url}.jpg`;
  let boxArtUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${gameData.appid}/library_600x900_2x.jpg`;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const load = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    load();
  }, [gameData]);

  return (
    <>
      <div className="box-container game-content">
        {rollCount === 3 ? (
          <p>Click Roll to begin</p>
        ) : loading ? (
          <Loading />
        ) : (
          <div>
            <img src={boxArtUrl} alt={gameData.name} className="gameBoxArt" />
            <div className="gameTitleWithIcon">
              <img
                src={iconUrlTemplate}
                alt={gameData.name}
                className="gameIcon"
              />
              <p>{gameData.name}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
