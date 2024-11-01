import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/UserModel";

export const GET = async (request: NextRequest) => {
  connectDB();
  try {
    // retrieve userID from auth token
    const userId = await getDataFromToken(request);

    // find user in DB based on id
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
