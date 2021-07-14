import React from "react";
import CharCard from "./ChatCard";

export default function ChatList({ chatGroup, onRowClick,selected }) {
  return (
    <div className="chat-list">
      {chatGroup?.map(({ id, name, messages}) => (
        <CharCard
          active={selected===id}
          key={id}
          name={name}
          lastSeen={messages && messages.length>0 && messages[0].ts}
          onClick={() => {
            onRowClick(id);
          }}
        />
      ))}
    </div>
  );
}
