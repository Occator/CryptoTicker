import { cookies } from "next/headers";
import * as jose from "jose";
import { NextResponse, NextRequest } from "next/server";

export const getDataFromToken = async (request: NextRequest) => {
  const cookie = cookies().get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
  const jwt = cookie?.value;

  try {
    //retrieve token from cookie

    const { payload } = await jose.jwtVerify(jwt, secret, {});
    const decodedToken = payload;
    return decodedToken;
  } catch (error: any) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
};
