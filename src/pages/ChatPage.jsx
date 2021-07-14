import React, { useState } from "react";
import ChatList from "../components/ChatList";
import { Search } from "../components/Input";
import ChatHeader from "../components/Header";
import ChatMessages from "../components/ChatMessages";
import ChatBoardHeader from "../components/ChatBoardHeader";
import ChatInput from "../components/ChatInput";
import { AddChatModal } from "../components/Modal";
import { useUsersList, useGroupsList } from "../lib/hooks";
import { useFirebaseContext } from "../lib/Firebase/context";

const CHAT_GROUP_LIST = [
  { id: "11", name: "Michael Hasin", lastSeen: 1618224765444 },
  { id: "12", name: "Nir Parisian", lastSeen: 1612130400000 },
  { id: "13", name: "Cohen Family", lastSeen: 1620778800000 },
  { id: "23", name: "Amzaleg Family", lastSeen: new Date().getTime() },
];
let TDEM =
  "@JMC Creative actually background transparent would not work in my case since I have a frame PNG with 3px borders with rounded corners. The content then is showing inside the PNGs transparent area. However, a new issue I'm running into is that now my a links inside the div are not clickable because the absolute positioned span i placed inside #mainWrapperDivWithBGImage is now on top of everything else, so <a> links don't work. I changed the a link z-index to show on top but then the images inside the a links show on top of";
function filterResults(groups, searchText) {
  console.log("GRR", groups);
  let filteredChats = [];
  if (!searchText) filteredChats = groups;
  else
    filteredChats = groups.filter(({ name }) =>
      name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  return filteredChats;
}

export default function ChatPage() {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const firebase = useFirebaseContext();
  let users = useUsersList();
  let groups = useGroupsList();
  let selectedGroup = groups.find(({ id }) => id === selectedRowId);

  return (
    <div className="main-content-pane">
      <section className="chat-list-section">
        <ChatHeader
          onChatAddClick={() => {
            setIsAddGroupModalOpen(true);
          }}
          onLogOut={()=>firebase.doSignOut()}
        />
        <Search onChange={(e) => setSearchText(e.target.value)} />
        <ChatList
          chatGroup={filterResults(groups, searchText)}
          onRowClick={setSelectedRowId}
          selected={selectedRowId}
        />
      </section>

      <section className="chat-board-section">
        <ChatBoardHeader
          title={selectedGroup?.name || "Select a group "}
          subtitle={selectedGroup?.users?.map(id=>users[id].username).join(", ") ?? ""}
        />
        <ChatMessages messages={[...(selectedGroup?.messages ?? [])].reverse()} currentUser={firebase.currentUserId()}/>
        <ChatInput
          onSendChat={(msg) => {
            if (selectedRowId) firebase.sendMessage(msg, selectedRowId);
          }}
        />
      </section>
      <AddChatModal
        isOpen={isAddGroupModalOpen}
        users={users}
        onClose={() => setIsAddGroupModalOpen(false)}
        onAdd={(name, users) => {
          console.log("s:", name, users);
          firebase.createGroup(name, [...users]);
          setIsAddGroupModalOpen(false);
        }}
      />
    </div>
  );
}
