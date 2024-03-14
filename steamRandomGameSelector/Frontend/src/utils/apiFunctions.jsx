const urlBase = "http://localhost:8000/api/";

export const fetchPlayerData = async () => {
  try {
    const response = await fetch(`${urlBase}/randomAll`);

    if (!response.ok) {
      throw new Error("Fetch Error was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const fetchGameData = async (steamid) => {
  try {
    const response = await fetch(`${urlBase}/steamid`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ steamid }),
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Cannot Access Players Library");
      } else {
        throw new Error("Invalid SteamID");
      }
    }

    return true;
  } catch (error) {
    console.error("Fetch Error: ", error);
    return false;
  }
};

export const getAllAchievments = async (appid, steamid) => {
  try {
    const response = await fetch(
      `${urlBase}getAchievements/${appid}/${steamid}`
    );

    if (!response.ok) {
      throw new Error("Fetch error was not okay");
    }

    const data = await response.json();
    console.log(`API CALL ${urlBase}getAchievements/${appid}: Data`, data);
    return data;
  } catch (error) {
    console.error("Get Achievments Error: ", error);
  }
};

export const getAchievmentsUnlocked = async (appid) => {
  try {
    const response = await fetch(`${urlBase}getAchievements/${appid}/unlocked`);

    if (!response.ok) {
      throw new Error("Fetch error was not okay");
    }
    const data = await response.json();
    console.log(`API CALL ${urlBase}getAchievements/${appid}: Data`, data);
    return data;
  } catch (error) {
    console.error("Get Achievments Error: ", error);
  }
};
