"use client";

import { useState } from "react";

const ConnectDB = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const connectHandler = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/connect");
      if (res) setConnected(true);
    } catch (error: any) {
      console.error("Connection failed", error.message);
    }
    return true;
  };

  return (
    <>
      {connected ? (
        <button
          className="text-1xl lg:text-4xl bg-slate-300 rounded-md text-slate-700 m-2 p-2"
          type="submit"
          onClick={connectHandler}
        >
          DB Connected
        </button>
      ) : (
        <button
          className="text-1xl lg:text-4xl bg-slate-300 rounded-md text-slate-700 m-2 p-2"
          type="submit"
          onClick={connectHandler}
        >
          Connect DB
        </button>
      )}
    </>
  );
};

export default ConnectDB;
