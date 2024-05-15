"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// LOGIN SERVER ACTION
export const loginAction = async (
  currentState: any,
  formData: FormData
): Promise<string> => {
  // get data from the form
  const email = formData.get("email");
  const password = formData.get("password");

  // send to login api route
  const res = await fetch(process.env.DEV_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  console.log("Login data", data);

  cookies().set("Authorization", data.token, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 1,
    path: "/",
    sameSite: "strict",
  });

  // redirect to dashboard if success
  if (res.ok) {
    redirect("/dashboard");
  } else {
    return data.error;
  }
};

// SIGNUP SERVER ACTION
export const signupAction = async (
  currentState: any,
  formData: FormData
): Promise<string> => {
  // get data from the form
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  // send it to the backend - /api/signup
  const res = await fetch(process.env.DEV_URL + "/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  console.log("###Signup data", data);
  if (res.ok) {
    redirect("/login");
  } else {
    return data.error;
  }
};
// LOGOUT SERVER ACTION
export const logoutAction = async () => {
  const cookie = cookies().get("Authorization");
  if (cookie) {
    const emptyCookie = cookies().delete("Authorization");
    console.log("emptyCookie", emptyCookie);
    redirect("/");
  }
};

// GET SESSION

export const getSession = async () => {
  const session = cookies().get("Authorization");
  return session;
};
