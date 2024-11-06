"use client";

import { API } from "@/api/services";
import { AUTH_LOGIN_PAGE, CHAT_LOBBY_PAGE } from "@/helpers/paths";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await API.register(username, email, password, avatar);
      localStorage.setItem("jwt_token", data.jwt);
      router.push(CHAT_LOBBY_PAGE);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    API.getProfile()
      .then((res) => {
        if (res) {
          router.push(CHAT_LOBBY_PAGE);
          setLoading(false);
        }
      })
      .catch((err) => {
        router.push(AUTH_LOGIN_PAGE);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <form
        className="bg-[var(--background-beta)] text-[var(--font-color-alpha)] p-6 px-16 rounded-lg flex items-center flex-col gap-2"
        onSubmit={handleRegister}
      >
        <div className="text-2xl font-bold">Curio Messenger</div>
        <div className="text-lg font-bold">Register</div>
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          type="text"
          className="text-[13px] mt-2 block outline-none border-b-[1px] bg-[var(--background-beta)] border-[var(--font-color-alpha)] w-[280px] p-3 py-4 placeholder:text-[var(--font-color-alpha)]"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="text-[13px] mt-2 block outline-none border-b-[1px] bg-[var(--background-beta)] border-[var(--font-color-alpha)] w-[280px] p-3 py-4 placeholder:text-[var(--font-color-alpha)]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="text-[13px] mt-2 block outline-none border-b-[1px] bg-[var(--background-beta)] border-[var(--font-color-alpha)] w-[280px] p-3 py-4 placeholder:text-[var(--font-color-alpha)]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          id="avatarId"
          type="file"
          className="hidden"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <div className="text-[13px] mt-2 block outline-none border-b-[1px] bg-[var(--background-beta)] border-[var(--font-color-alpha)] w-[280px] p-3 py-4 placeholder:text-[var(--font-color-alpha)]">
          <label htmlFor="avatarId" className="flex item-center gap-3">
            <img
              height={50}
              width={50}
              src={`https://curiomac-messenger.netlify.app/img/profile-blank.jpg`}
              alt="User Avatar"
            />
            <div>{avatar?.name}</div>
          </label>
        </div>

        <button
          className="bg-[var(--background-gamma)] w-full p-[10px] mt-2 font-bold text-sm"
          type="submit"
          disabled={!username || !email || !password}
        >
          {"Register"}
        </button>
        <div className="text-xs flex items-center gap-1 mt-3">
          <div>You do have an account?</div>
          <Link
            className="text-[var(--background-gamma)]"
            href={AUTH_LOGIN_PAGE}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
