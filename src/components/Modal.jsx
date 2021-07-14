import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import userPlaceHolder from "../assets/userPlaceHolder.png";

/**
 * A correct way to do a modal, with separate dome element
 *
 */
function M({ children, isOpen }) {
  const [elem, setElem] = useState(null);

  useEffect(() => {
    const MODAL_ID = "modal";
    let parent = document.querySelector(`#${MODAL_ID}`);
    if (!parent) {
      parent = document.createElement("div");
      parent.setAttribute("id", MODAL_ID);
      document.body.insertBefore(
        parent,
        document.body.lastElementChild.nextElementSibling
      );
    }
    setElem(parent);
  }, []);
  return elem && isOpen ? createPortal(children, elem) : null;
}

/*
 * Easy way to do modal (need to see what we want to pass on)
 */
function Modal({ children, isOpen }) {
  return isOpen ? <div className="modal">{children}</div> : null;
}

function UserLine({ image, username, onChange }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      onClick={() => {
        setChecked((prev) => {
          onChange(!prev);
          return !prev;
        });
      }}
    >
      <input type="checkbox" checked={checked} onChange={() => {}} />
      <img src={image ?? userPlaceHolder} alt="user" />
      <div>{username}</div>
    </div>
  );
}

function AddChatModal({ users, isOpen, onAdd, onClose }) {
  const selected = useRef(new Set());
  const [groupName, setGroupName] = useState("");
  return (
    <Modal isOpen={isOpen}>
      <div>
        <span
          onClick={() => {
            selected.current = new Set();
            onClose();
          }}
        >
          X
        </span>
        <span>Select group members</span>
      </div>
      <div>
        {Object.values(users).map((u) => (
          <UserLine
            key={u.id}
            username={u.username}
            onChange={(checked) => {
              if (checked) selected.current.add(u.id);
              else selected.current.delete(u.id);
            }}
          />
        ))}
      </div>
      <input
        placeholder="enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button
        disabled={!groupName}
        onClick={() => {
          onAdd(groupName, selected.current);
          selected.current = new Set();
          setGroupName("");
        }}
      >
        Create Group
      </button>
    </Modal>
  );
}

export default Modal;
export { AddChatModal };
