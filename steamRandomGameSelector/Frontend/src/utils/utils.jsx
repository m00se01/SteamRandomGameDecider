const parseSteamUrl = (url) => {
  // Format: https://steamcommunity.com/id/.../
  const format = "https://steamcommunity.com/id/";
  const formatAlt = "https://steamcommunity.com/profiles/";
  let id = "";

  //Remove whitespace
  if (url.trim().startsWith(format)) {
    const temp = url.trim().split("id/");

    id = temp[1];
    console.log(temp);

    //Remove the last '/' from the id
    if (id[id.length - 1] === "/") {
      id = id.slice(0, id.length - 1);
    }

    console.log(`id:${id}`);
    // console.log("Steam profile url is detected");
    return id;
  } else if (url.trim().startsWith(formatAlt)) {
    const temp = url.trim().split("profiles/");

    id = temp[1];
    console.log(temp);

    //Remove the last '/' from the id
    if (id[id.length - 1] === "/") {
      id = id.slice(0, id.length - 1);
    }

    return id;
  } else {
    console.log(
      "Not in steam community url format...proceeding to check entered format"
    );
    return false;
  }
};

const fetchPlayerData = () => {};

const fetchGameData = () => {};

export default { parseSteamUrl, fetchGameData, fetchPlayerData };
