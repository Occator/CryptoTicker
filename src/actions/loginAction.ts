"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const loginAction = async (
  currentState: any,
  formData: FormData
): Promise<string> => {
  // get data from the form
  const email = formData.get("email");
  const password = formData.get("password");

  // send to login api route
  const res = await fetch(process.env.BASE_URL + "/api/login", {
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

export default loginAction;
