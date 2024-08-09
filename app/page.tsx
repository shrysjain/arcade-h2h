"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [user1, setUser1] = useState({ apiKey: "", nickname: "" });
  const [user2, setUser2] = useState({ apiKey: "", nickname: "" });
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.setItem("user1", JSON.stringify(user1));
    localStorage.setItem("user2", JSON.stringify(user2));
    router.push("/stats");
    router.push("/stats");
  };

  const alreadyU1 =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user1") || "{}")
      : null;
  const alreadyU2 =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user2") || "{}")
      : null;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Arcade Head-to-Head</h1>
      <form className="w-full max-w-md space-y-6">
        <div className="flex gap-4">
          <label>Name</label>
          <Input
            type="text"
            value={user1.nickname}
            onChange={(e) => setUser1({ ...user1, nickname: e.target.value })}
            className="input h-6 border-none outline-none bg-slate-500 "
          />
        </div>
        <div className="flex gap-4">
          <label>API Key</label>
          <Input
            type="text"
            value={user1.apiKey}
            onChange={(e) => setUser1({ ...user1, apiKey: e.target.value })}
            className="input h-12 border-none outline-none bg-slate-500 "
          />
        </div>
        <center>
          <p className="font-bold">vs</p>
        </center>
        <div className="flex gap-4">
          <label>Name</label>
          <Input
            type="text"
            value={user2.nickname}
            onChange={(e) => setUser2({ ...user2, nickname: e.target.value })}
            className="input h-6 border-none outline-none bg-slate-500 "
          />
        </div>
        <div className="flex gap-4">
          <label>API Key</label>
          <Input
            type="text"
            value={user2.apiKey}
            onChange={(e) => setUser2({ ...user2, apiKey: e.target.value })}
            className="input h-12 border-none outline-none bg-slate-500 "
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="btn btn-primary w-full bg-slate-600 hover:bg-slate-800 font-bold"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
