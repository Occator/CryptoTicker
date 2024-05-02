import { connectDB } from "@/dbConfig/dbConfig";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const res = NextResponse.json(
      { message: "connected to MongoDB" },
      { status: 200 }
    );
    console.log("http response", res.status);
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
