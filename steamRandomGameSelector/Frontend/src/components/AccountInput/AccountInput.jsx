import "./AccountInput.css";
import parseSteamUrl from "../../utils/utils";
import { useEffect, useState } from "react";

export const AccountInput = ({ onSubmit }) => {
  const [steamid, setSteamid] = useState("");

  const handleChange = (event) => {
    setSteamid(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(steamid);
  };

  // Parse Steam Community Url
  useEffect(() => {
    setTimeout(() => {
      if (parseSteamUrl(steamid) != false) {
        setSteamid(parseSteamUrl(steamid));
      }
    }, 150);
  }, [steamid]);

  return (
    <div className="steamid-form">
      <form className="steamid-form" onSubmit={handleSubmit}>
        <div>
          <input
            className="steamid-input"
            id="steamid"
            required={true}
            placeholder="Enter your steamid or community-profile-url"
            type="text"
            name="steamid"
            onChange={handleChange}
            value={steamid}
          />
        </div>
        <button className="steamid-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
