import { connectDB } from "../../../dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";

// establish connection to MongoDB
connectDB();

// define async POST request handler function
export const POST = async (request: NextRequest) => {
  try {
    // read data from request body
    const body = await request.json();
    const { username, email, password } = body;

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

    // create user in database
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // return something

    return NextResponse.json(
      {
        message: "Successfully created User",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // try {
  //   // parses reqBody to extract username, email, password
  //   const reqBody = await request.json();
  //   console.log("requestBody", reqBody);
  //   const { username, email, password } = reqBody;

  //   const user = await User.findOne({ email });

  //   if (user) {
  //     return NextResponse.json(
  //       { error: "User with this email already exists" },
  //       { status: 400 }
  //     );
  //   }

  //   const salt = await bcryptjs.genSalt(10);
  //   const hashedPassword = await bcryptjs.hash(password, salt);
  //   const newUser = new User({
  //     username: username,
  //     email: email,
  //     password: hashedPassword,
  //   });

  //   // save new user in MongoDB
  //   const savedUser = await newUser.save();

  //   return NextResponse.json({
  //     message: "User successfully created",
  //     success: true,
  //     savedUser,
  //   });
  // } catch (error: any) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
};
