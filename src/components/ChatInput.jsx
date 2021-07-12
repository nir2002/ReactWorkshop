import React, { useState } from "react";
import Input from "./Input";
import sendIcon from "../assets/send.svg";

export default function ChatInput({ onSendChat }) {
  const [message, setMessage] = useState("");
  return (
    <div className="chat-input">
      <Input
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
          if (message) {
            setMessage("");
            onSendChat(message);
          }
        }}
      />
    </div>
  );
}
