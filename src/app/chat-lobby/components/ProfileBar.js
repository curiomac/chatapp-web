"use client";
import { AUTH_LOGIN_PAGE } from "@/helpers/paths";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileBar = ({ userData }) => {
  const router = useRouter();
  return (
    <div className="bg-[var(--background-beta)] h-[70px] w-full">
      <div className="flex items-center justify-between w-full px-4 h-full">
        <div>Logo</div>
        <div className="flex items-center justify-end gap-3 w-full">
          <img
            src={
              userData?.avatar?.url
                ? `http://localhost:1337${userData?.avatar?.url}`
                : "https://curiomac-messenger.netlify.app/img/profile-blank.jpg"
            }
            className="object-cover h-12 w-12 rounded-full"
          />
          <div>{userData?.username}</div>
          <button
            className="bg-[var(--background-alpha)] text-xs p-2"
            onClick={() => {
              localStorage.removeItem("jwt_token");
              router.push(AUTH_LOGIN_PAGE);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
