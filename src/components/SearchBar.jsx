/** @format */

import React from "react";

export function SearchBar({ value, onChange, onSearch }) {
  return (
    <form
      className="flex w-full max-w-2xl mx-auto bg-card rounded-xl shadow-card px-4 py-3 gap-2 border border-border"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSearch) onSearch(value);
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What would you like to cook today?"
        className="flex-1 bg-transparent outline-none text-lg text-foreground placeholder-muted-foreground px-2"
      />
      <button
        type="submit"
        className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-lg shadow-card hover:bg-primary/80 transition-colors text-base"
      >
        Search Recipes
      </button>
    </form>
  );
}
