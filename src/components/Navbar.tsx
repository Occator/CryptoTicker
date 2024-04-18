import Link from "next/link";
import React from "react";
import ConnectDB from "./ConnectDB";

export default function Navbar() {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-purple-900 text-white flex justify-center space-x-6">
      <Link
        className="text-1xl lg:text-4xl bg-slate-300 rounded-md text-slate-700 m-2 p-2"
        href="/"
      >
        Dashboard
      </Link>
      <Link
        className="text-1xl lg:text-4xl bg-slate-300 rounded-md text-slate-700 m-2 p-2"
        href="/addCoins"
      >
        Add Coin
      </Link>
      <Link
        className="text-1xl lg:text-4xl bg-slate-300 rounded-md text-slate-700 m-2 p-2"
        href="/signup"
      >
        Sign up
      </Link>
      <ConnectDB />
    </nav>
  );
}
