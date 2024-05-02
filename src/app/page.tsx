"use client";

import { useContext } from "react";
import CoinCard from "@/components/CoinCard";
import { coinContext } from "@/context/coinContext";

export default function LandingPage() {
  return (
    <>
      <section className="grid h-screen place-items-center">
        <div className="text-white bg-indigo-900 p-44">
          <h1 className="text-3xl">Landing Page </h1>
          <h3>nothing to see here</h3>
        </div>
      </section>
    </>
  );
}
