"use client";

import { API } from "@/api/services";
import useSocket from "@/hooks/useSocket";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ChatList = ({ getChatRoomId, chatRoomsUpdate, userData }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const socket = useSocket("http://localhost:1337");
  const triggerMessage = async (chatRoomId) => {
    const payload = {
      data: {
        isTriggerEvent: true,
        room: {
          id: chatRoomId,
        },
      },
    };

    if (socket && socket.connected) {
      socket.emit("sendMessage", payload);
    }
  };
  useEffect(() => {
    API.getChatList()
      .then(async (res) => {
        if (res?.data?.results?.length > 0) {
          const chatRoomsWithLastMessage = res?.data?.results?.map((room) => {
            const lastMessage = room.messages[room.messages.length - 1];
            return {
              ...room,
              lastMessage: lastMessage ? lastMessage : null,
              messages: [],
            };
          });
          setChatRooms(chatRoomsWithLastMessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (
      chatRoomsUpdate &&
      chatRoomsUpdate !== undefined &&
      Object.keys(chatRoomsUpdate).length > 0
    ) {
      setChatRooms(chatRoomsUpdate);
    }
  }, [chatRoomsUpdate]);
  return (
    <div
      className="bg-[var(--background-gamma)]"
      style={{
        height: "calc(100vh - 70px)",
        overflow: "auto",
      }}
    >
      {chatRooms?.map((data) => {
        return (
          <div
            className="cursor-pointer hover:bg-[#00000021] transform ease-in-out duration-300"
            key={data?.id}
            onClick={() => {
              getChatRoomId(data?.id);
              triggerMessage(data?.id);
            }}
          >
            <div className="flex items-center gap-2 p-4 py-3">
              <img
                src={`${
                  data?.chatRoomImage?.url
                    ? `http://localhost:1337${data?.chatRoomImage?.url}`
                    : "https://curiomac-messenger.netlify.app/img/profile-blank.jpg"
                }`}
                className="object-cover h-14 w-14 rounded-full"
              />
              <div
                className="flex flex-col gap-1 justify-center"
                style={{
                  width: "calc(100% - 4.5rem)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-md">{data?.name}</div>
                  <div className="text-xs">
                    {moment(data?.updatedAt).format("DD MMM YYYY, hh:mm A")}
                  </div>
                </div>
                <div className="opacity-60 text-xs text-nowrap overflow-hidden text-ellipsis">
                  {data?.participants?.some(
                    (participant) => participant?.id === userData?.id
                  )
                    ? data?.lastMessage?.text || "No messages yet!"
                    : "Not a Partcicipant!"}
                </div>
                <div className="border-b border-[#0000001f] relative top-[14.5px]"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
