const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 8000;

const KEY = process.env.STEAM_API_KEY;
const STEAMID = process.env.STEAMID;

let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${STEAMID}&format=json`;

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
  res.send(KEY);
});

app.get("/api/data", async (req, res) => {
  try {
    const apiResponse = await axios.get(url);

    const responseData = apiResponse.data;

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
