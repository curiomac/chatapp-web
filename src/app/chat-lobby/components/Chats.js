"use client";

import { API } from "@/api/services";
import useSocket from "@/hooks/useSocket";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

const Chats = ({ userData, handleChatRoomsUpdate, handleChatRoomData }) => {
  const [messages, setMessages] = useState([]);
  const [chatRoomData, setChatRoomData] = useState([]);
  const chatsRef = useRef(null);
  const socket = useSocket("http://localhost:1337");

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (res) => {
        setMessages(res?.populatedMessage?.messages);
        handleChatRoomsUpdate(res?.chatRoomsData);
        handleChatRoomData(res?.populatedMessage);
        setChatRoomData(res?.populatedMessage);
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (chatsRef.current) {
      chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="bg-[var(--font-color-alpha)] chats-scroll-bar"
      style={{
        height: "calc(100vh - 140px)",
        overflowY: "auto",
      }}
      ref={chatsRef}
    >
      {chatRoomData?.participants?.some(
        (participant) => participant?.id === userData?.id
      ) &&
        messages.map((data) => (
          <div
            className={`flex items-center gap-2 p-4 ${
              userData?.id === data?.user?.id ? "justify-end" : ""
            }`}
            key={data?.id}
          >
            {userData?.id !== data?.user?.id && (
              <img
                src={
                  data?.user?.avatar?.url
                    ? `http://localhost:1337${data?.user?.avatar?.url}`
                    : "https://curiomac-messenger.netlify.app/img/profile-blank.jpg"
                }
                className="object-cover h-10 w-10 rounded-full"
              />
            )}
            <div
              className={`flex flex-col gap justify-center ${
                userData?.id === data?.user?.id
                  ? "bg-[var(--background-alpha)] rounded-se-none"
                  : "bg-[var(--background-beta)] rounded-ss-none"
              } p-4 py-2 rounded-xl`}
              style={{ maxWidth: "50%" }}
            >
              <div className="text-xs">{data?.user?.username}</div>
              <div className="text-sm">{data?.text}</div>
              <div className="text-[9px] flex items-center justify-end">
                {moment(data?.createdAt).format("hh:mm A")}
              </div>
            </div>
            {userData?.id === data?.user?.id && (
              <img
                src={`http://localhost:1337${data?.user?.avatar?.url}`}
                className="object-cover h-10 w-10 rounded-full"
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default Chats;
