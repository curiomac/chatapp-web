"use client";

import { AUTH_LOGIN_PAGE } from "@/helpers/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(AUTH_LOGIN_PAGE);
  }, []);
  return <></>;
}
