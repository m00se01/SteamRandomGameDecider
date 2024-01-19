const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 8000;

const KEY = process.env.STEAM_API_KEY;
const STEAMID = process.env.STEAMID;

let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${STEAMID}&format=json&include_appinfo=true`;
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});

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

app.get("/api/randomAll", async (req, res) => {
  try {
    const apiResponse = await axios.get(url);

    if (!apiResponse.data) {
      res.status(404).json({ error: "Image not found" });
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

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
