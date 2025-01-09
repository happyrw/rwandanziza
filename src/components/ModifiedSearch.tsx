"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ModifiedSearch = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }

    router.push(`/explore?searchTerm=${query.trim()}`);
  }
  return (
    <form onSubmit={handleSubmit} method="GET" action="/shop" className="grow">
      <div className="flex justify-center items-center bg-white lg:h-12">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for hotels, restaurants, parks..."
          className="text-[12px] lg:text-lg w-full lg:h-full px-4 py-[5px] lg:py-2 border-b border-sky-500 rounded-[0_0_0_10px] shadow-sm focus:outline-none"
        />
        <button
          type="submit"
          className="text-[12px] lg:text-lg px-4 py-[5px] lg:py-2 lg:h-full bg-blue-600 text-white rounded-[0_0_10px_0] shadow-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default ModifiedSearch;
