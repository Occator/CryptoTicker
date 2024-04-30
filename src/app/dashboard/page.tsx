"use client";

import { useContext } from "react";
import CoinCard from "@/components/CoinCard";
import { coinContext } from "@/context/coinContext";

export default function Home() {
  const { coinsArray } = useContext(coinContext);

  return (
    <>
      <div className="text-white"></div>
      <div className="flex flex-col gap-4 bg-gray-900 min-h-screen">
        {coinsArray?.length > 0 ? (
          coinsArray?.map((coin) => <CoinCard key={coin.id} coin={coin} />)
        ) : (
          <div>
            <h2 className="text-white">Dashboard - No coins to track ... </h2>
          </div>
        )}
      </div>
    </>
  );
}
