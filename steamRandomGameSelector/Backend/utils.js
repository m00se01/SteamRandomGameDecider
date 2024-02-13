const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Maybe Reformat Steamid parsing of steamid to an object later

const to64BitBinary = (number) => {
  // Convert the number to a BigInt
  let bigintNumber = BigInt(number);

  // Convert the BigInt to a 64-bit binary string
  let binaryString = bigintNumber.toString(2);

  // If the binary string length is less than 64, pad it with leading zeros
  while (binaryString.length < 64) {
    binaryString = "0" + binaryString;
  }

  return binaryString;
};

/* 
    SteamIDs follow a fairly simple format when represented textually: "STEAM_X:Y:Z," where X, Y, and Z are integers. In select cases, "STEAM_ID_PENDING" or "UNKNOWN" are used (see the section "Types of Steam Accounts" for more details).

    X represents the "Universe" the steam account belongs to.
    Y is part of the ID number for the account. Y is either 0 or 1.
    Z is the "account number").
*/

// Return Steams Textual Format "STEAM_X:Y:Z," where X, Y, and Z are integers
const steamidToTextualFormat = (steamid) => {
  /* 
  The lowest bit represents Y.
    The next 20 bits represent the instance of the account. It is usually set to 1 for user accounts.
    The next 4 bits represent the type of account.
    The next 8 bits represent the "Universe" the steam account belongs to.
    The next 31 bits represent the account number.
*/
  const binaryString = to64BitBinary(steamid);

  const Y = binaryString.charAt(binaryString.length - 1);

  const accountNumber = binaryString.slice(
    binaryString.length - 32,
    binaryString.length - 1
  );

  const instance = binaryString.slice(
    binaryString.length - (accountNumber.length + 20),
    binaryString.length - accountNumber.length - 1
  );

  const accountType = binaryString.slice(8, 12);
  const universe = binaryString.slice(0, 8);

  return `STEAM_${parseInt(universe, 2)}:${parseInt(Y, 2)}:${parseInt(
    accountNumber,
    2
  )}`;
};

// Validation only for single user accounts in the public domain
const steamidValidator = (steamid) => {
  const binaryString = to64BitBinary(steamid);

  const Y = binaryString.charAt(binaryString.length - 1);

  const accountNumber = binaryString.slice(
    binaryString.length - 32,
    binaryString.length - 1
  );

  const instance = binaryString.slice(
    binaryString.length - (accountNumber.length + 20),
    binaryString.length - accountNumber.length - 1
  );

  const accountType = binaryString.slice(8, 12);
  const universe = binaryString.slice(0, 8);

  // For the purpose of this app and to keep things simple we will only deal with public user id's for the time being:
  //   Universe 1 => Public
  //   SteamAccountType 1 => Individual/Single User Account
  if (parseInt(universe, 2) == 1 && parseInt(accountType, 2) == 1) {
    return true;
  }

  return false;
};

console.log(steamidToTextualFormat("76561198099806606"));

const isPublicAccount = async (key, steamid) => {
  try {
    const getPlayerSummariesUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamid}`;

    const apiResponse = await axios.get(getPlayerSummariesUrl);

    /* This represents whether the profile is visible or not, and if it is visible,why you are allowed to see it.
     Note that because this WebAPI does not use authentication, there are only two possible values returned:
       1 - the profile is not visible to you (Private, Friends Only, etc),
       3 - the profile is "Public", and the data is visible. 
    */
    const data = apiResponse.data.response.players[0];

    const status = data.communityvisibilitystate;

    return status === "3";
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
};

module.exports = {
  steamidToTextualFormat,
  steamidValidator,
  to64BitBinary,
  isPublicAccount,
};
