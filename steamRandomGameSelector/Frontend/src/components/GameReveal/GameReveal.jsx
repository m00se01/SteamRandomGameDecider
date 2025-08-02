import { useEffect, useState } from "react";
import "./GameReveal.css";
import { Loading } from "../Loading/Loading";
import Card from "../Cards/Card";

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
      <Card className="game-content">
        {rollCount === 3 ? (
          <p>Click Roll to begin</p>
        ) : loading ? (
          <Loading />
        ) : (
          <div className="game-info">
            <div className="box-art">
              <img
                src={boxArtUrl}
                alt={gameData.name}
                className="box-art-img"
              />
            </div>
            <div className="game-title-with-icon">
              <img
                src={iconUrlTemplate}
                alt={gameData.name}
                className="game-icon"
              />
              <p>{gameData.name}</p>
            </div>
          </div>
        )}
      </Card>
    </>
  );
};
