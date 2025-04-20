import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <div className="bg-brand-surface p-4 flex gap-4">
      <input
        type="text"
        className="flex-1 p-2 rounded text-black"
        placeholder="Search for songs or artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        className="bg-brand-primary hover:bg-brand-accent text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
