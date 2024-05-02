"use server";

import { redirect } from "next/navigation";

const signupAction = async (
  currentState: any,
  formData: FormData
): Promise<string> => {
  // get data from the form
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  // send it to the backend - /api/signup
  const res = await fetch(process.env.BASE_URL + "/api/signup", {
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

export default signupAction;
