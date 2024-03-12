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

export const Home = () => {
  const [rollCount, setRollCount] = useState(3);

  const [gameData, setGameData] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [totalGames, setTotalGames] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [steamid, setSteamid] = useState("");

  const steamidApiUrl = "http://localhost:8000/api/steamid";
  const apiUrl = "http://localhost:8000/api/randomAll";
  const playerInfoUrl = "http://localhost:8000/api/playerInfo";
  const gamesCountUrl = "http://localhost:8000/api/data/gamesCount";

  // Fetch Player Data

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

  useEffect(() => {
    fetchPlayerData();
    console.log(playerData);
  }, [steamid]);

  useEffect(() => {
    const gamesCount = async () => {
      try {
        const response = await fetch(gamesCountUrl);

        if (!response.ok) {
          throw new Error("Fetch Error was not ok");
        }

        const data = await response.json();

        setTotalGames(data);
      } catch (error) {
        console.error("Fetch Error: ", error);
      }
    };
    gamesCount();
  }, [playerData, gameData, steamid]);

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
  }, [gameData, playerData, steamid]);

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

  const toggleAccountModal = () => {
    setIsModalOpen((prev) => !prev);
    console.log(isModalOpen);
  };

  // Game stats
  // Achievments
  // const getAchievments = () =>{

  // }

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
    } else if (response.status === 500) {
      alert("Cannot Access Players Library");
    } else {
      console.error("Invalid SteamID");
    }
  };

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
          <Stats playtime={gameData ? gameData.playtime_forever : 0} />

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
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
