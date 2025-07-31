import React from "react";
import "./UserInfoCard.css";
import "../../index.css";
import Card from "../Cards/Card";
const UserInfoCard = ({ username, gameCount, avatarImg, onClick }) => {
  return (
    <Card>
      <h3>{username}</h3>
      <div className="profile-info">
        <img src={avatarImg} alt="profile-pic" />
        {/* <span>{username}</span> */}
      </div>

      <p>Games in library: {gameCount}</p>
      <button className="btn menu-btn" onClick={onClick}>
        Switch Accounts
      </button>
    </Card>
  );
};

export default UserInfoCard;
