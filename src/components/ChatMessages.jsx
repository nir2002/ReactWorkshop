export default function ChatMessages({ messages }) {
  return (
    <div className="chat-messages">
      {messages?.map((message, i) => (
        <ChatMessage {...message} />
      ))}
    </div>
  );
}

let ChatMessage = ({ text, ts, username }) => (
  <div className="message">
    <div>{username}</div>
    <div>{text}</div>
    <div>{ts}</div>
  </div>
);
