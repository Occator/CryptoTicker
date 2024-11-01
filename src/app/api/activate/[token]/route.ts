import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";

export const GET = async (request: NextRequest) => {
  const verifyToken = request.nextUrl.pathname.split("/").pop();
  console.log("verifyToken", verifyToken);
  connectDB();
  //find user by verifyToken and update the document
  const verifiedUser = await User.findOneAndUpdate(
    { verifyToken: verifyToken },
    { isVerified: true, verifyToken: null },
    { new: true }
  );
  if (verifiedUser) {
    console.log("Account has been successfully activated");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
    // return NextResponse.json(
    //   { message: "Account has been successfully activated" },
    //   { status: 201, headers: { "Content-Type": "application/json" } }
    // );
  } else {
    return NextResponse.json(
      {
        message:
          "Account activation failed. Invalid or expired activation token",
      },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
