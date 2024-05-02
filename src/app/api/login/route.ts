import { connectDB } from "../../../dbConfig/dbConfig";
import User from "../../../models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";

// establish connection to MongoDB
connectDB();

export const POST = async (request: NextRequest) => {
  // read data from request body
  const body = await request.json();
  const { email, password } = body;

  // validate data
  if (!validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json(
      {
        error: "Invalid email or password",
      },
      {
        status: 400,
      }
    );
  }

  // look up the current user
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  // check password
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  // create jwt token

  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
  const alg = "HS256";
  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .setSubject(user.id.toString())
    .sign(secret);

  console.log("JWT token", jwt);

  return NextResponse.json({ token: jwt });
  try {
    return NextResponse.json({});
  } catch (error: any) {}
  // try {
  //   const reqBody = await request.json();
  //   const { email, password } = reqBody;

  //   //check if user exists
  //   const user = await User.findOne({ email });

  //   if (!user)
  //     return NextResponse.json({ error: "User not found" }, { status: 400 });

  //   //create token data
  //   // A tokenData object is created to store essential user
  //   // information. In this case, it includes the user's id (MongoDB _id),
  //   // username, and email.
  //   const jwtData = {
  //     id: user._id,
  //     username: user.username,
  //     email: user.email,
  //   };
  //   //token creation with one day expiration
  //   const token = await jwt.sign(jwtData, process.env.TOKEN_SECRET!, {
  //     expiresIn: "1d",
  //   });

  //   const response = NextResponse.json({
  //     message: "Login successfull",
  //     succes: true,
  //   });

  //   response.cookies.set("token", token, { httpOnly: true });
  //   console.log("tokenData", token);
  //   console.log("### response cookies", response.cookies);
  //   return response;
  // } catch (error: any) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
};
