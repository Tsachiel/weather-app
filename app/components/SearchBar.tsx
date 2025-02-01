"use client";
import { Search } from "lucide-react";
import { useState } from "react";

type Props = {
  onSearch: (city: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col md:flex-row gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a city name"
        className="w-full md:w-96 px-4 py-2 rounded border"
      />
      <button
        type="submit"
        className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center gap-1"
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </button>
    </form>
  );
}
