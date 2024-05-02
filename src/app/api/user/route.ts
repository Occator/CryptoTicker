import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/UserModel";

connectDB();

export const GET = async (request: NextRequest) => {
  try {
    // retrieve userID from auth token
    const userId = await getDataFromToken(request);
    console.log("user ID form auth token", userId);

    // find user in DB based on id
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: User,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
