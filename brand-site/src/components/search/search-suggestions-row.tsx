"use client";

import { useState } from "react";

import { CategorySearchBox } from "@/components/search/category-search-box";
import { SearchSuggestionPill } from "@/components/search/search-suggestion-pill";
import { searchSuggestions } from "@/data/mock/services";

export function SearchSuggestionsRow() {
  const [query, setQuery] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);

  const handleSuggestionClick = (label: string) => {
    setActiveSuggestion(label);
    setQuery(label);
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <CategorySearchBox value={query} onChange={setQuery} />

      <div
        className="w-full max-w-2xl"
        role="group"
        aria-label="Popular category suggestions"
      >
        <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
          {searchSuggestions.map((label) => (
            <SearchSuggestionPill
              key={label}
              label={label}
              isActive={activeSuggestion === label}
              onClick={() => handleSuggestionClick(label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
