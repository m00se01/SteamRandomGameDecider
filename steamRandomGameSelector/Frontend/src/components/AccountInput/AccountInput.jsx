import "./AccountInput.css";
import parseSteamUrl from "../../utils/utils";
import infoIcon from "../../assets/infoIcon.svg";
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

  const openNewWindow = (url) => {
    window.open(url, "_blank");
  };

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
        <button className="steamid-btn" id="steamid" type="submit">
          Submit
        </button>
      </form>

      <a
        href="#"
        onClick={() =>
          openNewWindow(
            "https://help.steampowered.com/en/faqs/view/2816-BE67-5B69-0FEC"
          )
        }
      >
        <div className="findSteamIdSpan">
          Where to find your steamid?
          <img className="infoIcon" src={infoIcon} alt="info-icon" />
        </div>
      </a>
    </div>
  );
};
