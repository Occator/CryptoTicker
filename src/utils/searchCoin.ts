"use server";

export async function searchCoin(url: string): Promise<Response> {
  console.log("[backend] searchTerm", url);
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error("Search failed ... ");
  return data;
}
