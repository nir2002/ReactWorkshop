export default function ChatMessages({ messages, currentUser }) {
  console.log("MESSS", JSON.stringify(messages, null, 2));
  return (
    <div className="chat-messages">
      {messages?.map((message, i) => (
        <ChatMessage
          {...message}
          highlight={message.user === currentUser}
          key={i}
        />
      ))}
    </div>
  );
}

let ChatMessage = ({ text, ts, username, highlight }) => (
  <div className={`message ${highlight ? "my" : ""}`}>
    <div>{username}</div>
    <div>{text}</div>
    <div>
      {new Date(ts).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  </div>
);
