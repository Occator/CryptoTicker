"use client";

import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import signupAction from "@/actions/signupAction";

const SignupPage = () => {
  const [error, formAction] = useFormState(signupAction, undefined);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-white">Sign up</h1>
      <form
        action={formAction}
        className=" flex flex-col gap-2 content-center items-center p-2 m-2"
      >
        <label htmlFor="username" className="text-white">
          username
        </label>
        <input type="text" name="username" placeholder="username" />
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
          Sign up
        </button>
      </form>
      {error && <p className="text-white">{error}</p>}
    </div>
  );
};

export default SignupPage;
