import Link from "next/link";
import { cookies } from "next/headers";
import LogoutForm from "./logoutForm";
import { getSession } from "@/actions";

export default async function Navbar() {
  const isLoggedIn = await getSession();
  console.log("navbar", isLoggedIn);
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-purple-900 text-white flex justify-center items-center space-x-6">
      {isLoggedIn?.value ? (
        <>
          <Link
            className="text-1xl lg:text-4xl rounded-md text-slate-300 p-1"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-1xl lg:text-4xl rounded-md text-slate-300 p-1"
            href="/addCoins"
          >
            Add Coin
          </Link>
          <LogoutForm />
        </>
      ) : (
        <>
          <Link
            className="text-1xl lg:text-4xl rounded-md text-slate-300 p-1"
            href="/signup"
          >
            Sign up
          </Link>
          <Link
            className="text-1xl lg:text-4xl rounded-md text-slate-300 p-1"
            href="/login"
          >
            Login
          </Link>
        </>
      )}
    </nav>
  );
}
