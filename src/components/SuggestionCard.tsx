"use client";
import { useContext, useRef } from "react";
import { coinContext } from "@/context/coinContext";
import Image from "next/image";
import Button from "./ui/Button";

type SuggestionCardProps = {
  coin: any;
  id: string;
};

const SuggestionCard = (props: SuggestionCardProps) => {
  const { coinId } = useContext(coinContext);
  const { coin, id } = props;
  return (
    <section className="p-4">
      <Image src={coin.image} alt={coin.name} width={60} height={60} />
      <div className="flex">
        <div className="text-white p-4">
          <p>{coin.name}</p>
          <p>{coin.symbol}</p>
        </div>
        <Button id={id} />
      </div>
    </section>
  );
};

export default SuggestionCard;
