import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("running");
  return NextResponse.next();
  // const path = request.nextUrl.pathname;
  // console.log("middleware pathname", path);
  // // public path
  // const isPublicPath =
  //   path === "/login" || path === "/signup" || path === "/verifyemail";
  // // get token from cookies
  // const token = request.cookies.get("token")?.value || "";
  // console.log("middleware token", token);
  // // acccess logic based on path and token
  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
}

// export const config = {
//   matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
// };
