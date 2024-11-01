import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "./getDataFromToken";
import User from "@/models/UserModel";

export const getUserDetails = async (request: NextRequest) => {
  connectDB();

  try {
    const currentUserId = await getDataFromToken(request);
    const currentUser = await User.findOne({ _id: currentUserId }).select(
      "-password"
    );

    console.log("User found: ", currentUser);
    return currentUser;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
