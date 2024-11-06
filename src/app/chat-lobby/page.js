"use client";

import React, { useEffect, useState } from "react";
import ProfileBar from "./components/ProfileBar";
import ChatList from "./components/ChatList";
import InteractionsBar from "./components/InteractionsBar";
import Chats from "./components/Chats";
import ChatInputBox from "./components/ChatInputBox";
import { API } from "@/api/services";
import { useRouter } from "next/navigation";
import { AUTH_LOGIN_PAGE } from "@/helpers/paths";

const ChatLobby = () => {
  const router = useRouter();
  const [chatRoomId, setChatRoomId] = useState(0);
  const [chatRoomData, setChatRoomData] = useState({});
  const [userData, setUserData] = useState({});
  const [chatRoomsUpdate, setChatRoomsUpdate] = useState({});
  const getChatRoomId = (id) => {
    
    setChatRoomId(id);
  };
  const handleChatRoomsUpdate = (data) => {
    setChatRoomsUpdate(data);
  };
  const handleChatRoomData = (data) => {
    setChatRoomData(data);
  };
  useEffect(() => {
    API.getProfile()
      .then((res) => {
        if (res) {
          setUserData(res);
        } else {
          router.push(AUTH_LOGIN_PAGE);
        }
      })
      .catch((err) => {
        router.push(AUTH_LOGIN_PAGE);
      });
  }, []);
  return (
    <div className="flex h-screen text-[var(--font-color-beta)]">
      <div className="h-screen w-[550px]">
        <ProfileBar userData={userData} />
        <ChatList
          getChatRoomId={getChatRoomId}
          chatRoomsUpdate={chatRoomsUpdate}
          userData={userData}
          chatRoomData={chatRoomData}
        />
      </div>
      <div className="h-screen w-full">
        <InteractionsBar
          chatRoomId={chatRoomId}
          chatRoomData={chatRoomData}
          userData={userData}
        />
        <Chats
          handleChatRoomData={handleChatRoomData}
          userData={userData}
          handleChatRoomsUpdate={handleChatRoomsUpdate}
        />
        <ChatInputBox
          chatRoomId={chatRoomId}
          userData={userData}
          chatRoomData={chatRoomData}
        />
      </div>
    </div>
  );
};

export default ChatLobby;
