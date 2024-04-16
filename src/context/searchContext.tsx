"use client";
import { useState, useEffect, createContext } from "react";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

interface CoinContext {
  coins: Coin[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCoins: Coin[];
}

export const searchContext = createContext<CoinContext>({
  coins: [],
  searchTerm: "",
  setSearchTerm: () => {},
  filteredCoins: [],
});

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [coins, setCoins] = useState<Coin[]>([]);


  
  const filteredCoins = coins?
    .filter((coin: Coin) => coin.id.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 10);

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage='24h%2C30d%2C%20200d%2C%201y'%20&locale=en";

      const getCoinData = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        setCoins(data);
      };
      getCoinData(url);

  }, []);

  return (
    <searchContext.Provider
      value={{ searchTerm, setSearchTerm, coins, filteredCoins }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;
