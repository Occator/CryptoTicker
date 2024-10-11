import Search from "@/components/Search";
import SearchContextProvider from "@/context/searchContext";

export default function page() {
  return (
    <>
      <SearchContextProvider>
        <Search />
      </SearchContextProvider>
    </>
  );
}
