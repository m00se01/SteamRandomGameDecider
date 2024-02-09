const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const KEY = process.env.STEAM_API_KEY;
let STEAMID = process.env.STEAMID;

let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${STEAMID}&format=json&include_appinfo=true`;

app.get("/api/data", async (req, res) => {
  try {
    const apiResponse = await axios.get(url);

    const responseData = apiResponse.data;

    console.log(responseData);
    res.json(responseData);
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

    data = apiResponse.data;

    //GamesCount
    const gamesCount = data.response.game_count;
    const gamesArray = data.response.games;

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

app.post("/api/steamid", async (req, res) => {
  try {
    const steamid = req.body;
    let vanityName = steamid.steamid;
    const vanityUrl = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${KEY}&vanityurl=${vanityName}`;

    STEAMID = steamid.steamid;

    // Check if vanityurl returns a steamid otherwise, test the raw input to validate the steamid , if both fail then return INVALID ID
    // vanityurl to steamid
    try {
      vanityNameRes = await axios.get(vanityUrl);

      if (!vanityNameRes) {
        console.log("No Vanity Name Found");
        res.status(404).json({ error: "UserData Not Found" });
      }

      if (vanityNameRes.data.response.success == 42) {
        console.log("No Match Found");
      }

      if (vanityNameRes.data.response.success == 1) {
        vanityName = vanityNameRes.data.response.steamid;

        console.log(`Success: 1 ${vanityName}`);

        // Update STEAMID
        STEAMID = vanityName;
      }

      console.log(vanityNameRes.data);
    } catch (error) {
      console.error(error);
    }

    // Steam 64bit id encoding
    // For the purpose of this app and to keep things simple we will only deal with public user id's for the time being:
    // 76561198#########

    if (steamid.steamid.length != 17) {
      console.log(`steamid: ${steamid.steamid} Not Valid`);
    }

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
