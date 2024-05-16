import React from "react";
import Image from "next/image";

type CoinCardProps = { coin: any };

export default function CoinCard({ coin }: CoinCardProps) {
  return (
    <section className="text-white text-1xs mx-3">
      <Image
        src={coin?.image?.small}
        width={30}
        height={30}
        alt={coin?.name}
        className="bg-white"
      />
      <p>{coin?.name}</p>
      <p>${coin?.tickers[0].last} US</p>
    </section>
  );
}
