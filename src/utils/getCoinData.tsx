"use server";

export async function fetchCoinData(id: string | null): Promise<Response> {
  console.log("[backend] coinID", id);
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
