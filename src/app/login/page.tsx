"use client";

import { useFormState } from "react-dom";
import loginAction from "@/actions/loginAction";
import Link from "next/link";

const LoginPage = () => {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-white">Login</h1>
      <form
        action={formAction}
        className=" flex flex-col gap-2 content-center items-center p-2 m-2"
      >
        <label htmlFor="email" className="text-white">
          email
        </label>
        <input type="email" name="email" placeholder="email" />
        <label htmlFor="password" className="text-white">
          password
        </label>
        <input type="password" name="password" placeholder="password" />
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
      {error && <p className="text-white">{error}</p>}
    </div>
  );
};

export default LoginPage;
