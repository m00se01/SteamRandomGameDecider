import { useEffect, useState } from "react";
import "./Home.css";
import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";
import { GameReveal } from "../../components/GameReveal/GameReveal";
import { Filters } from "../../components/Filters/Filters";
import { Stats } from "../../components/Stats/Stats";

export const Home = () => {
  const [rollCount, setRollCount] = useState(3);

  const [gameData, setGameData] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const [totalGames, setTotalGames] = useState(0);

  const apiUrl = "http://localhost:8000/api/randomAll";
  const playerInfoUrl = "http://localhost:8000/api/playerInfo";

  // Fetch Player Data
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(playerInfoUrl);

        if (!response.ok) {
          throw new Error("Fetch Error was not ok");
        }

        const data = await response.json();

        setPlayerData(data);
      } catch (error) {
        console.error("Fetch Error: ", error);
      }
    };

    fetchPlayerData();
    console.log(playerData);
  }, []);

  // Fetch Game Data
  useEffect(() => {
    async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGameData(data);
        console.log(data);
      } catch (error) {
        console.error("Fetch Error: ", error);
      }
    };
  }, [gameData]);

  const roll = async () => {
    if (rollCount > 0) {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGameData(data);
        setRollCount(rollCount - 1);
        console.log(gameData);
      } catch (error) {
        console.error("Fetch Error: ", error);
      }
    }
  };

  const resetRoll = () => {
    setRollCount(3);
  };

  return (
    <>
      <div className="home-wrapper">
        <Navbar />

        <h1 className="main-title">Let Us Decide Your Fate</h1>

        <main className="hompage-main-content-section">
          <div className="box-container user-info-section">
            {/* Avatar and Username */}
            {playerData && (
              <div className="profile-info">
                <img src={playerData.avatarfull} alt="profile-pic" />
                <span>{playerData.personaname}</span>
              </div>
            )}

            <p>Games in library: {totalGames}</p>

            {/* Switch accounts implementation */}
            <button>Switch Accounts</button>
          </div>
          {gameData && <GameReveal gameData={gameData} rollCount={rollCount} />}

          <Stats />
        </main>

        <div className="box-container roll-content">
          <div className="roll-container">
            <p className="roll-counter">Rolls Left: {rollCount} </p>
            <button onClick={resetRoll}>Reset</button>
            <button className={".rounded-btn"} onClick={roll}>
              Roll
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
