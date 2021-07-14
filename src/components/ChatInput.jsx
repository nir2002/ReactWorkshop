import React, { useState } from "react";
import Input from "./Input";
import sendIcon from "../assets/send.svg";

export default function ChatInput({ onSendChat }) {
  const [message, setMessage] = useState("");
  let sendMessage = (msg) => {
    if (sendMessage) {
      setMessage("");
      onSendChat(msg);
    }
  };
  return (
    <div className="chat-input">
      <Input
        onKeyPress={(e) => {
          if (e.key === "Enter") sendMessage(message);
        }}
        placeholder="Type a message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      <img
        src={sendIcon}
        alt="send"
        onClick={() => {
          sendMessage(message);
        }}
      />
    </div>
  );
}
