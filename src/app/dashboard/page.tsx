//"use client";

// import { useContext } from "react";
import CoinCard from "@/components/CoinCard";
// import { coinContext } from "@/context/coinContext";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest } from "next/server";

export default async function Home(request: NextRequest) {
  //const { coinsArray } = useContext(coinContext);

  const coinsArray = undefined;
  const tokenData = await getDataFromToken(request);

  return (
    <>
      <div className="flex flex-col gap-4 bg-gray-900 min-h-screen">
        {coinsArray?.length > 0 ? (
          coinsArray?.map((coin) => <CoinCard key={coin?.id} coin={coin} />)
        ) : (
          <div>
            <p className="text-white text-2xl">{`${tokenData?.username}, `}</p>
            <p className="text-white text-xl">Welcome Back!</p>
          </div>
        )}
      </div>
    </>
  );
}
