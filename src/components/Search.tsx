"use client";
import { ChangeEvent, useContext } from "react";
import { searchContext } from "@/context/searchContext";
import SuggestionCard from "./SuggestionCard";

const Search = () => {
  const { searchTerm, setSearchTerm, filteredCoins } =
    useContext(searchContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchInput = event.target.value;
    setSearchTerm(searchInput.toLowerCase());
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search coin ..."
        defaultValue={searchTerm}
        onChange={handleChange}
      />
      {filteredCoins.length ? (
        <div className="text-white">
          {filteredCoins.map((coin) => (
            <SuggestionCard coin={coin} id={coin.id} />
          ))}
        </div>
      ) : (
        <p className="text-white">No coin searched ...</p>
      )}
    </div>
  );
};

export default Search;
