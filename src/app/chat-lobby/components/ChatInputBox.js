"use client";

import { API } from "@/api/services";
import useSocket from "@/hooks/useSocket";
import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
const ChatInputBox = ({ chatRoomId, userData, chatRoomData }) => {
  const [messageInput, setMessageInput] = useState("");
  const socket = useSocket("http://localhost:1337");
  const sendMessage = async (e) => {
    e.preventDefault();
    const payload = {
      data: {
        text: messageInput,
        user: userData?.id,
        room: {
          id: chatRoomId,
        },
      },
    };
    if (messageInput) {
      socket.emit("sendMessage", payload);
      setMessageInput("");
    }
  };
  console.log("hagah: ", chatRoomData, userData);

  return (
    <div className="bg-[var(--font-color-beta)] h-[70px]">
      {chatRoomData?.participants?.some(
        (participant) => participant.id === userData?.id
      ) ? (
        <form className="flex items-center pe-4" onSubmit={sendMessage}>
          <input
            value={messageInput}
            className="bg-[var(--font-color-beta)] text-[var(--background-beta)] h-[70px] w-full me-3 outline-none p-4 text-lg"
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your text..."
          />
          <button
            className={`p-3 text-[var(--background-alpha)] rounded-md border-[1px] border-[var(--background-alpha)] ${
              !messageInput && "opacity-45 cursor-not-allowed"
            }`}
            type="submit"
          >
            <IoSendSharp size={30} />
          </button>
        </form>
      ) : (
        <div className="text-[var(--background-beta)] flex items-center justify-center h-[70px] opacity-70">
          You're not a Participant of this Room
        </div>
      )}
    </div>
  );
};

export default ChatInputBox;
