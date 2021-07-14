import React from "react";
import userPlaceHolder from "../assets/userPlaceHolder.png";

export default function ChatCard({ image, name, lastSeen, onClick, active }) {
  let classes = "user-card " + (active ? "active" : "");
  return (
    <div className={classes} onClick={onClick}>
      <img src={image ?? userPlaceHolder} alt="user" />
      <div>{name}</div>
      <div>{lastSeen ? new Date(lastSeen).toLocaleDateString("en-US") : "Never"}</div>
    </div>
  );
}
