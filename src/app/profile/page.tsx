"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      const res = await fetch("/api/users/logout", { method: "GET" });
      const data = await res.json();

      console.log("logout data", data);
      router.push("/login");
    } catch (error: any) {}
  };

  const getUserDetails = async () => {
    try {
      const res = await fetch("/api/users/user", { method: "GET" });
      const data = await res.json();
      console.log("getUserDetails", data);
      setData(data.data._id);
      router.push("/");
    } catch (error) {}
    console.log("###profile data", data);
  };
  return (
    <div className=" text-white flex flex-col items-center justify-center gap-3 min-h-screen py-2">
      <h1 className="text-3xl">Profile</h1>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`profile/${data}`} className="text-white">
            {data}
          </Link>
        )}
      </h2>
      <button onClick={logout}>logout</button>
      <button onClick={getUserDetails}>user details</button>
    </div>
  );
};

export default ProfilePage;
