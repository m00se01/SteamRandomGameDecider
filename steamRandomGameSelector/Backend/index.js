const express = require("express");
const axios = require("axios");
const cors = require("cors");
const utils = require("./utils");
require("dotenv").config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const KEY = process.env.STEAM_API_KEY;

// For testing purposes using env
let STEAMID = process.env.STEAMID;

app.get("/api/data", async (req, res) => {
  try {
    let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${STEAMID}&format=json&include_appinfo=true`;

    const apiResponse = await axios.get(url);

    const responseData = apiResponse.data;

    console.log(responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "internal Server Error" });
  }
});

app.get("/api/data/gamesCount", async (req, res) => {
  try {
    let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${STEAMID}&format=json&include_appinfo=true`;

    const apiResponse = await axios.get(url);

    const gamesCount = apiResponse.data.response.game_count;

    console.log(gamesCount);
    res.json(gamesCount);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "internal Server Error" });
  }
});

// Returns a random game from the users entire game library
app.get("/api/randomAll", async (req, res) => {
  try {
    let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${STEAMID}&format=json&include_appinfo=true`;

    const apiResponse = await axios.get(url);

    if (!apiResponse.data) {
      res.status(404).json({ error: "Not Found" });
      return;
    }

    //GamesCount
    const gamesCount = apiResponse.data.response.game_count;
    const gamesArray = apiResponse.data.response.games;

    if (!gamesCount || !Array.isArray(gamesArray) || gamesArray.length === 0) {
      console.log("No Games Found");
      res.status(404).json({ error: "No games found" });
      return;
    }

    console.log(`gamesCount:${gamesCount}`);

    //Random Num Gen
    let randNum = Math.floor(Math.random() * (gamesCount - 1));

    console.log("randNum: " + randNum);
    const game = gamesArray[randNum];

    console.log(gamesCount);
    console.log(game);
    res.json(game);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Player Data: communityvisibilitystate, avatar-img , persona name
app.get("/api/playerInfo", async (req, res) => {
  try {
    const getPlayerSummariesUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${KEY}&steamids=${STEAMID}`;
    let getOwnedGamesUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${STEAMID}&format=json&include_appinfo=true`;

    const apiResponse = await axios.get(getPlayerSummariesUrl);
    const ownGamesResponse = await axios.get(getOwnedGamesUrl);

    const data = apiResponse.data.response.players[0];

    // Add Number of Games in Library to PlayerInfo Object

    res.status(200).json(data);
    console.log(data.communityvisibilitystate);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/gameStats", async (req, res) => {
  try {
    const appid = 250900;
    const getStatsUrl = ` http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${KEY}&steamid=${STEAMID}`;
    const apiResponse = await axios.get(getStatsUrl);

    const data = apiResponse.data;
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/steamid", async (req, res) => {
  try {
    const steamid = req.body;
    let vanityName = steamid.steamid;
    const vanityUrl = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${KEY}&vanityurl=${vanityName}`;

    STEAMID = steamid.steamid;

    // Check if vanityurl returns a steamid otherwise, test the raw input to validate the steamid , if both fail then return INVALID ID
    try {
      vanityNameRes = await axios.get(vanityUrl);

      if (!vanityNameRes) {
        console.log("No Vanity Name Found");
        res.status(404).json({ error: "UserData Not Found" });
      }

      if (vanityNameRes.data.response.success == 42) {
        console.log("No Match Found");
      } else if (vanityNameRes.data.response.success == 1) {
        vanityName = vanityNameRes.data.response.steamid;
        console.log(`Success: 1 ${vanityName}`);
        // Update STEAMID
        STEAMID = vanityName;

        // Check if account is public
        if (!utils.isPublicAccount(KEY, STEAMID)) {
          console.log("Account is not public");
          res.status(500).json({ message: "Account is not public" });
          return;
        } else {
          res.status(200).json({ message: "Ok" });
          return;
        }
      }

      console.log(vanityNameRes.data);
    } catch (error) {
      console.error(error);
    }

    // For the purpose of this app and to keep things simple we will only deal with public user id's for the time being:
    if (!utils.steamidValidator(STEAMID)) {
      console.log("Invalid SteamID");
      res.status(500).json({ message: "Invalid SteamID" });
      return;
    }

    STEAMID = steamid.steamid;
    console.log(STEAMID);
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
