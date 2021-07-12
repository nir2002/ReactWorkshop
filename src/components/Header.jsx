import React, { Component } from "react";
import userPlaceHolder from "../assets/userPlaceHolder.png";
import addChat from "../assets/addChat.svg";


export default function Header({ image, onChatAddClick }) {
  let users = [{id:"aaa",username:"Mike h"},{id:"aa2",username:"Dan M"}]  
  return (
    <div className="header">
      <img src={image ?? userPlaceHolder} alt="user" />
      <img src={addChat} alt="add chat" onClick={onChatAddClick} />
    </div>
  );
}
