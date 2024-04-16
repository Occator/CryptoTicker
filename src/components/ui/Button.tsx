"use client";

import { useContext } from "react";
import { coinContext } from "@/context/coinContext";

type ButtonProps = {
  id: string;
};

export default function Button(props: ButtonProps) {
  const { id } = props;
  const { setCoinId, coinId } = useContext(coinContext);

  const handleClick = () => {
    console.log("onClick fired");
    setCoinId(id);
  };

  console.log("coinId after button-clicked", coinId);
  return (
    <div className="text-white bg-slate-500 p-1">
      <button onClick={handleClick} value={id}>
        Add coin
      </button>
    </div>
  );
}
