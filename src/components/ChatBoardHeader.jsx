import UserProfileImg from "./UserProfileImg";
import userPlaceHolder from "../assets/userPlaceHolder.png";

export default function ChatHeader({ title, subtitle }) {
  return (
    <div className="chat-messages-header">
      <UserProfileImg src={userPlaceHolder} />
      <div className="chat-messages-header-title">
        <div>{title}</div>
        <div style={{ fontSize: 12 }}>{subtitle}</div>
      </div>
    </div>
  );
}
