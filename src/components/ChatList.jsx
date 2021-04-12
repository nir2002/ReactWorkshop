import React from "react";
import CharCard from "./ChatCard";

export default function ChatList({ chatGroup, onRowClick,selected }) {
  return (
    <div className="chat-list">
      {chatGroup?.map(({ id, name, lastSeen}) => (
        <CharCard
          active={selected===id}
          key={id}
          name={name}
          lastSeen={lastSeen}
          onClick={() => {
            onRowClick(id);
          }}
        />
      ))}
    </div>
  );
}
