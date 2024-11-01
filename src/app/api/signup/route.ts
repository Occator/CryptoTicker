import { connectDB } from "../../../dbConfig/dbConfig";
import { sendEmail } from "@/utils/sendEmail";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import cryptoRandomString from "crypto-random-string";
import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";

// define async POST request handler function
export const POST = async (request: NextRequest) => {
  // establish connection to MongoDB
  connectDB();
  try {
    // read data from request body
    const requestBody = await request.json();
    const { username, email, password } = requestBody;

    // validate data from sign up form
    if (!validateEmail(email) || !validatePassword(password)) {
      return NextResponse.json(
        {
          error: "Invalid email or password",
        },
        { status: 400 }
      );
    }
    // hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // generate random token
    const verifyToken = cryptoRandomString({ length: 24, type: "url-safe" });

    // create user in database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyToken,
    });
    const savedUser = await newUser.save();

    await sendEmail(email, verifyToken);

    return NextResponse.json(
      {
        message: "User created successfully.",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
