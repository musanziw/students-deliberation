"use client"

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  if (!token) router.push("/");

  return (
    <h1>Dashboard</h1>
  );
}