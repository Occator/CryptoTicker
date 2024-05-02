"use client";
import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("start submitting ...");
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log("submitted successful");
      console.log(data);
      if (res) setIsLoading(false);
      router.push("/");
    } catch (error: any) {
      console.error("Login failed, please try again.", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form
        onSubmit={handleLogin}
        className=" flex flex-col gap-2 content-center items-center p-2 m-2"
      >
        <h1>{isLoading ? "Processing" : "Login"}</h1>
        <hr />
        <label htmlFor="email" className="text-white">
          email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
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
        />
        <button
          type="submit"
          className="text-white bg-slate-700 p-2 rounded-md"
        >
          Login
        </button>
        <Link href="/signup" className="text-white">
          visit signup page
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
