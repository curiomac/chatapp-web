"use client";

import { API } from "@/api/services";
import Modal from "@/app/plugins/Modal";
import useSocket from "@/hooks/useSocket";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  BsCameraVideoFill,
  BsPersonFillAdd,
  BsThreeDots,
} from "react-icons/bs";

const InteractionsBar = ({ chatRoomId, chatRoomData, userData }) => {
  const [addUserModal, setAddUserModal] = useState(false);
  const [userDatas, setUserDatas] = useState([]);
  const socket = useSocket("http://localhost:1337");
  const handleParticipants = (action, userRoomData) => {
    const userDataIds = chatRoomData?.participants.map((data) => ({
      id: data?.id,
    }));
    const getRoomData = () => {
      if (action === "Remove") {
        return userDataIds.filter((data) => data.id !== userRoomData?.id);
      } else {
        return [...userDataIds, { id: userRoomData?.id }];
      }
    };
    const payload = {
      participants: getRoomData(),
    };
    API.updateChatRoom(chatRoomId, payload)
      .then((res) => {
        if (res) {
          const payload = {
            data: {
              isTriggerEvent: true,
              room: {
                id: chatRoomId,
              },
            },
          };
          socket.emit("sendMessage", payload);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  useEffect(() => {
    API.getUsers()
      .then((res) => {
        if (res) {
          setUserDatas(res);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <div className="bg-[var(--background-gamma)] h-[70px] flex items-center justify-between p-4">
      <div>{chatRoomData?.name}</div>
      <div className="flex items-center gap-6 h-[70px] text-xl">
        <BsCameraVideoFill className="cursor-pointer" />
        {/* {userData?.role?.name === "Administrator" && ( */}
        <BsPersonFillAdd
          className="cursor-pointer"
          onClick={() => setAddUserModal(true)}
        />
        {/* )} */}
        <BsThreeDots className="cursor-pointer" />
      </div>
      <Modal isOpen={addUserModal} onClose={() => setAddUserModal(false)}>
        <div className="font-bold uppercase">Add Participant</div>
        <div className="flex flex-col gap-4 mt-3">
          {userDatas?.map((data) => {
            return (
              <div
                className="flex items-center justify-between border-b-[1px] border-[#00000036] pb-2"
                key={data?.id}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      data?.avatar?.url
                        ? `http://localhost:1337${data?.avatar?.url}`
                        : "https://curiomac-messenger.netlify.app/img/profile-blank.jpg"
                    }
                    className="object-cover h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="text-sm font-bold">{data?.username}</div>
                    <div className="flex items-center gap-1">
                      <div className="font-bold text-[12px]">Joined On:</div>
                      <div className="text-[11px]">
                        {moment(data?.createdAt).format("DD MMM YYYY hh:mm A")}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-[var(--background-beta)] text-[var(--font-color-beta)] p-3 text-xs rounded-md"
                    onClick={() =>
                      handleParticipants(
                        chatRoomData?.participants?.some(
                          (participant) => participant.id === data?.id
                        )
                          ? "Remove"
                          : "Add",
                        data
                      )
                    }
                  >
                    {chatRoomData?.participants?.some(
                      (participant) => participant.id === data?.id
                    )
                      ? "Remove"
                      : "Add"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default InteractionsBar;
