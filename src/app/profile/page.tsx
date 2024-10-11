"use client";
import { useState } from "react";
import { revalidatePath } from "next/cache";

const ProfilePage = () => {
  const [user, setUser] = useState("nobody");

  const getDetails = async () => {
    try {
      const res = await fetch("/api/user", { method: "GET" });
      const user = await res.json();
      console.log("getUserDetails", user);
      setUser(user);
      revalidatePath("/profile");
    } catch (error) {
      console.log("something went wrong ...", error);
    }
  };
  return (
    <div className=" text-white flex flex-col items-center justify-center gap-3 min-h-screen py-2">
      <h1 className="text-3xl">Profile</h1>
      <h2>{user === "nobody" ? "empty profile" : user?.data?.username}</h2>
      <p>
        {user === "nobody"
          ? "no coins selected"
          : user?.data?.selectedCoins.length}
      </p>
      <button onClick={getUserDetails}>user details</button>
    </div>
  );
};

export default ProfilePage;
