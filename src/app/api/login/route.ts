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
  console.log("account verified? ", user.isVerified);
  if (!user || !user.isVerified) {
    if (!user.isVerified) {
      return NextResponse.json(
        {
          error:
            "Please activate your account by clicking the activation link in the email.",
        },
        { status: 400 }
      );
    }
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
  const jwt = await new jose.SignJWT({
    _id: user.id,
    username: user.username,
  })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  //console.log("JWT token", jwt);

  return NextResponse.json({ token: jwt });
};
