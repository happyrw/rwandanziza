"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

interface SearchFieldProps {
  className?: string;
}

export default function SearchField({ className }: SearchFieldProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  // Initialize query with the current searchTerm if present
  useEffect(() => {
    const currentSearchTerm = searchParams?.get("searchTerm") || "";
    setQuery(currentSearchTerm);
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      router.push(`/explore`); // Clear search term from URL
    } else {
      router.push(`/explore?searchTerm=${trimmedQuery}`);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    // Clear URL if input is empty
    if (!value.trim()) {
      router.push(`/explore`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="GET"
      action="/shop"
      className={cn("grow", className)}
    >
      <div className="relative">
        <Input
          name="q"
          value={query}
          onChange={handleChange}
          placeholder="Search"
          className="pe-10"
        />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
}
