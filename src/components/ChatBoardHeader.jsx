import UserProfileImg from "./UserProfileImg";
import userPlaceHolder from "../assets/userPlaceHolder.png";

export default function ChatHeader({ title, subtitle }) {
  return (
    <div className="chat-messages-header">
      <UserProfileImg src={userPlaceHolder} />
      <div className="chat-messages-header-title">
        <div>{title}</div>
        <div>{subtitle}</div>
      </div>
    </div>
  );
}
