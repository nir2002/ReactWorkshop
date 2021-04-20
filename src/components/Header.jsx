import React, { Component } from "react";
import userPlaceHolder from "../assets/userPlaceHolder.png";
import addChat from "../assets/addChat.svg";

export default function Header({ image }) {
  return (
    <div className="header">
      <img src={image ?? userPlaceHolder} alt="user" />
      <img src={addChat} alt="user" />
    </div>
  );
}
