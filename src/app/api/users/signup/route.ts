import { connectDB } from "../../../../dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// establish connection to MongoDB
connectDB();

// define async POST request handler function
export const POST = async (request: NextRequest) => {
  try {
    // parses reqBody to extract username, email, password
    const reqBody = await request.json();
    console.log("requestBody", reqBody);
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // save new user in MongoDB
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User successfully created",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
