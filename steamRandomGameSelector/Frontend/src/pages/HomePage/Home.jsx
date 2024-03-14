import { useEffect, useState } from "react";
import "./Home.css";
import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";
import { GameReveal } from "../../components/GameReveal/GameReveal";
import { Filters } from "../../components/Filters/Filters";
import { Stats } from "../../components/Stats/Stats";
import parseSteamUrl from "../../utils/utils";
import { AccountInput } from "../../components/AccountInput/AccountInput";
import ReactModal from "react-modal";
import {
  fetchGameData,
  fetchGamesCount,
  fetchPlayerData,
  fetchRandomGame,
} from "../../utils/apiFunctions";

export const Home = () => {
  const [rollCount, setRollCount] = useState(3);
  const [gameData, setGameData] = useState({});
  const [playerData, setPlayerData] = useState({});
  const [steamid, setSteamid] = useState("");
  const [totalGames, setTotalGames] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [achievmentData, setAchievmentData] = useState([]);

  const steamidApiUrl = "http://localhost:8000/api/steamid";

  // Fetch Player Data
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlayerData();
      setPlayerData(data);
    };

    fetchData();
  }, [steamid]);

  //Fetch Games Count
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGamesCount();
      setTotalGames(data);
    };

    fetchData();
  }, [playerData, gameData, steamid]);

  // // Fetch Game Data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchGameData(playerData.steamid);
  //     setGameData(data);
  //   };

  //   fetchData();
  // }, [gameData, playerData, steamid]);

  const roll = async () => {
    if (rollCount > 0) {
      const fetchData = async () => {
        const data = await fetchRandomGame();
        setGameData(data);
      };
      fetchData();
      console.log(gameData);
      setRollCount(rollCount - 1);
    }
  };

  const resetRoll = () => {
    setRollCount(3);
  };

  const toggleAccountModal = () => {
    setIsModalOpen((prev) => !prev);
    console.log(isModalOpen);
  };

  const handleSubmit = async (steamid) => {
    const response = await fetch(steamidApiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ steamid }),
    });

    if (response.ok) {
      setIsModalOpen(false);
      fetchPlayerData();
      setSteamid(steamid);
    } else if (response.status === 500) {
      alert("Cannot Access Players Library");
    } else {
      console.error("Invalid SteamID");
    }
  };

  // Parse Steamid
  useEffect(() => {
    setTimeout(() => {
      if (parseSteamUrl(steamid) != false) {
        setSteamid(parseSteamUrl(steamid));
      }
    }, 150);
  }, [steamid]);

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
            <button onClick={toggleAccountModal}>Switch Accounts</button>
          </div>
          {gameData && <GameReveal gameData={gameData} rollCount={rollCount} />}
          {/* TODO make the component be only the table instead of the container and the table */}
          <Stats
            playtime={gameData ? gameData.playtime_forever : 0}
            // achievments={achievmentData ? achievmentData : []}
            rollcount={rollCount}
            appid={gameData ? gameData.appid : ""}
            steamid={playerData.steamid}
          />

          <Filters />

          <ReactModal
            className={"Modal"}
            overlayClassName={
              isModalOpen
                ? "Overlay Overlay--after-open"
                : "Overlay Overlay--before-close"
            }
            contentLabel={"Confirmation Modal"}
            shouldCloseOnEsc={true}
            isOpen={isModalOpen}
            closeTimeoutMS={300}
            onRequestClose={() => {
              setIsModalOpen(false);
            }}
            onAfterClose={() => {
              setRollCount(3);
            }}
          >
            <div>
              <h1>Switch Accounts</h1>

              <AccountInput onSubmit={handleSubmit} />

              <button onClick={toggleAccountModal}>Close</button>
            </div>
          </ReactModal>
        </main>

        <div className="box-container roll-content">
          <div className="roll-container">
            <p className="roll-counter">Rolls Left: {rollCount} </p>
            <button onClick={resetRoll}>Reset</button>
            <button className={".rounded-btn"} onClick={roll}>
              Roll
            </button>

            <button>Change Filters</button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
