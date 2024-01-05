const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 8000;

const KEY = process.env.STEAM_API_KEY;
const STEAMID = process.env.STEAMID;

let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${STEAMID}&format=json&include_appinfo=true`;
let data = {};

const getRandomGame = (gamesCount) => {
  Math.floor(Math.random(gamesCount));
};

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

app.get("/api/game/img/:appid/:hash", async (req, res) => {
  try {
    const appid = req.params.appid;
    const hash = req.params.hash;

    const url = `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`;
    const apiResponse = await axios.get(url);

    if (!apiResponse.data) {
      res.status(404).json({ error: "Image not found" });
      return;
    }

    res.setHeader("Content-Type", "image/jpeg");
    res.send(apiResponse.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "internal Server Error" });
  }
});

app.get("/api/testimg", async (req, res) => {
  try {
    url = `http://media.steampowered.com/steamcommunity/public/images/apps/17390/00e6b5f1f7173e5a2db9978de34df03abb886430.jpg`;
    const apiResponse = await axios.get(url);

    if (!apiResponse) {
      res.status(404).json({ error: "Image not found" });
      console.error("NO IMAGE FOUND");
      return;
    }

    res.setHeader("Content-Type", "image/jpg");
    console.log("HERE");
    res.json(apiResponse.json);
  } catch (error) {
    console.error("Error: ", error);
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
