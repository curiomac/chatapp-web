"use client";

import { AUTH_REGISTER_PAGE, CHAT_LOBBY_PAGE } from "@/helpers/paths";
import { API } from "@/api/services";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await API.login(email, password);
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
        onSubmit={handleLogin}
        className="bg-[var(--background-beta)] text-[var(--font-color-alpha)] p-6 px-16 rounded-lg flex items-center flex-col gap-2"
      >
        <div className="text-2xl font-bold">Curio Messenger</div>
        <div className="text-lg font-bold">Login</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-[13px] mt-2 block outline-none border-b-[1px] bg-[var(--background-beta)] border-[var(--font-color-alpha)] w-[280px] p-3 py-4 placeholder:text-[var(--font-color-alpha)]"
          placeholder="Email or User Name"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-[13px] mt-2 block outline-none border-b-[1px] bg-[var(--background-beta)] border-[var(--font-color-alpha)] w-[280px] p-3 py-4 placeholder:text-[var(--font-color-alpha)]"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-[var(--background-gamma)] w-full p-[10px] mt-2 font-bold text-sm"
          disabled={!email || !password}
        >
          Login
        </button>

        {error && <div className="text-red-500 text-xs mt-2">{error}</div>}

        <div className="text-xs flex items-center gap-1 mt-3">
          <div>You don't have an account?</div>
          <Link
            className="text-[var(--background-gamma)]"
            href={AUTH_REGISTER_PAGE}
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
