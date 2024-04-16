"use client";

import { useState, useEffect, createContext } from "react";
import { fetchCoinData } from "@/utils/getCoinData";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

interface CoinContext {
  coinData: Coin | null;
  coinId: string | null;
  coinsArray: Coin[];
  setCoinId: (id: string) => void;
  setCoinData: (term: string) => void;
  setCoinsArray: (coin: Coin[]) => void;
}

export const coinContext = createContext<CoinContext>({
  coinData: null,
  coinId: "",
  coinsArray: [],
  setCoinId: () => {},
  setCoinData: () => {},
  setCoinsArray: () => {},
});

const CoinContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [coinId, setCoinId] = useState<string | null>(null);
  const [coinData, setCoinData] = useState<Coin>();
  const [coinsArray, setCoinsArray] = useState<Coin[]>([]);

  useEffect(() => {
    try {
      if (!coinId) {
        console.log("CoinContext - No coin to track ...");
      } else {
        const getCoinData = async (id: string | null) => {
          const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`
          );
          const data = await res.json();
          setCoinData(data);
        };
        getCoinData(coinId);
      }
    } catch (error) {
      console.log("Failed to fetch data: ", error);
    }
  }, [coinId]);

  useEffect(() => {
    if (coinData) {
      setCoinsArray([...coinsArray, coinData]);
    }
  }, [coinData]);

  console.log("### Coin data: ", coinData);
  console.log("### Coin data array: ", coinsArray);

  return (
    <coinContext.Provider value={{ coinId, setCoinId, coinsArray }}>
      {children}
    </coinContext.Provider>
  );
};

export default CoinContextProvider;
