import React from "react";
import userPlaceHolder from "../assets/userPlaceHolder.png";
import addChat from "../assets/addChat.svg";
import logOut from "../assets/logout.svg";

export default function Header({ image, onChatAddClick , onLogOut }) {
  return (
    <div className="header">
      <img src={image ?? userPlaceHolder} alt="user" />
      <div>
        <img src={addChat} alt="add chat" onClick={onChatAddClick} />
        <img src={logOut} alt="add chat" onClick={onLogOut} />
      </div>
    </div>
  );
}
