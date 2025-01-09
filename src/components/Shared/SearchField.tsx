"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import path from "path";

interface SearchFieldProps {
  className?: string;
}

export default function SearchField({ className }: SearchFieldProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  // Initialize query with the current searchTerm if present
  useEffect(() => {
    const currentSearchTerm = searchParams?.get("searchTerm") || "";
    setQuery(currentSearchTerm);
  }, [searchParams]);

  if (pathname === "/") {
    return null;
  }

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
          className="pe-10 border border-blue-600 focus:border-blue-600 focus:ring-blue-600"
        />
        <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-blue-600" />
      </div>
    </form>
  );
}
