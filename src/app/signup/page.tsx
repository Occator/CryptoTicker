"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("start submitting");
    try {
      const res = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      console.log("submitted");
      console.log(data);
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <form
        onSubmit={handleSignup}
        className=" flex flex-col gap-2 content-center items-center p-2 m-2"
      >
        <label htmlFor="username" className="text-white">
          username
        </label>
        <input
          id="username"
          type="text"
          value={user?.username}
          onChange={(event) =>
            setUser({ ...user, username: event.target.value })
          }
          placeholder="username"
        />
        <label htmlFor="email" className="text-white">
          email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
          placeholder="email"
        />
        <label htmlFor="password" className="text-white">
          password
        </label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
          placeholder="password"
        />
        <button
          type="submit"
          className="text-white bg-slate-700 p-2 rounded-md"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
