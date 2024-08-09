"use client";

import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

export default function Stats() {
  const [data1, setData1] = useState<any>(null);
  const [data2, setData2] = useState<any>(null);

  const user1 =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user1") || "{}")
      : null;
  const user2 =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user2") || "{}")
      : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res1 = await fetch(`/api?apiKey=${user1.apiKey}`);
        if (!res1.ok)
          throw new Error(
            `User 1 Fetch Error: ${res1.status} ${res1.statusText}`
          );
        const data1 = await res1.json();

        const res2 = await fetch(`/api?apiKey=${user2.apiKey}`);
        if (!res2.ok)
          throw new Error(
            `User 2 Fetch Error: ${res2.status} ${res2.statusText}`
          );
        const data2 = await res2.json();

        setData1(data1.data);
        setData2(data2.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!data1 || !data2)
    return (
      <div className="flex flex-col justify-center items-center text-center h-screen">
        <h1 className="text-xl font-extrabold">Loading....</h1>
        <br></br>
        <p className="text-sm">
          If this takes unusually long, I might&apos;ve gotten rate limited 😅
          <br></br>Give it a second and then try again
        </p>
        <p></p>
      </div>
    );

  const totalHours1 = data1.total / 60;
  const totalHours2 = data2.total / 60;

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <h1 className="text-4xl font-bold">Arcade Head-to-Head</h1>
      <div className="flex space-x-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl">{user1.nickname}</h2>
          <p className="text-xl">Total Hours: {totalHours1.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl">{user2.nickname}</h2>
          <p className="text-xl">Total Hours: {totalHours2.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <h3 className="text-3xl">
          {totalHours1 > totalHours2
            ? `${user1.nickname} is in the lead!`
            : `${user2.nickname} is in the lead!`}
        </h3>
      </div>
    </div>
  );
}
