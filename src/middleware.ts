import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  console.log("middleware running...");

  // check for cookie
  const cookie = cookies().get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // validate cookie
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
  const jwt = cookie.value;

  try {
    await jose.jwtVerify(jwt, secret, {});
  } catch (error: any) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/dashboard/:path", "/addCoins/:path"],
};
