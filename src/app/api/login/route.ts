import { connectDB } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// establish connection to MongoDB
connectDB();

export const POST = async (request: NextRequest) => {
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
