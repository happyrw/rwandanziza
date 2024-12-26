"use client";

import LoaderComponent from "@/components/Shared/LoaderComponent";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import GridPostList from "./GridPostList";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Sidebar from "@/components/Shared/Sidebar";
import SearchResults from "@/components/Shared/SearchResults";
import Loading from "../Loading";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export default function ExploreComponent() {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <Content />
    </Suspense>
  );
}

const Content: React.FC = () => {
  const [category, setCategory] = useState<
    "event" | "economic" | "district" | "province"
  >("event");
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts(category);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(
    searchTerm!
  );

  useEffect(() => {
    if (inView && !searchTerm) fetchNextPage();
  }, [inView, searchTerm]);

  if (!posts) return <LoaderComponent />;

  const shouldShowSearchResults = searchTerm !== null;
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="relative mx-auto p-2 flex gap-3 w-full max-w-screen-xl">
      <div className="hidden md:flex min-w-[34%] h-[calc(100vh-7rem)] border rounded-lg sticky top-16 left-6 p-4 overflow-y-auto remove-scrollbar">
        <Sidebar />
      </div>

      <div className="md:ml-[30px]">
        <div className="sticky top-14 z-10 bg-white pt-10">
          <div className="flex items-center md:justify-between md:min-w-[500px] -mt-10">
            <button
              onClick={() => setCategory("event")}
              className={cn(
                `border px-4 py-2 w-fit sm:w-full capitalize text-[13px] sm:text-[15px]`,
                category === "event" && "bg-sky-700 border-sky-900 text-white"
              )}
            >
              event
            </button>
            <button
              onClick={() => setCategory("economic")}
              className={cn(
                `border px-4 py-2 w-fit sm:w-full capitalize text-[13px] sm:text-[15px]`,
                category === "economic" &&
                  "bg-sky-700 border-sky-900 text-white"
              )}
            >
              economic
            </button>
            <button
              onClick={() => setCategory("province")}
              className={cn(
                `border px-4 py-2 w-fit sm:w-full capitalize text-[13px] sm:text-[15px]`,
                category === "province" &&
                  "bg-sky-700 border-sky-900 text-white"
              )}
            >
              province
            </button>
            <button
              onClick={() => setCategory("district")}
              className={cn(
                `border px-4 py-2 w-fit sm:w-full capitalize text-[13px] sm:text-[15px]`,
                category === "district" &&
                  "bg-sky-700 border-sky-900 text-white"
              )}
            >
              district
            </button>
          </div>
          <div className="flex-between md:min-w-[500px]">
            <h3 className="body-bold md:h3-bold font-bold capitalize">
              {category}
            </h3>
            <div className="flex-center gap-3 rounded-xl px-4 py-2 cursor-pointer">
              <p className="small-medium md:base-medium text-light-2">All</p>
              <img
                src="/icons/filter.svg"
                alt="filter icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <div>
          {shouldShowSearchResults ? (
            <SearchResults
              searchedPosts={searchedPosts!}
              isSearchFetching={isSearchFetching}
            />
          ) : shouldShowPosts ? (
            <p>End of posts</p>
          ) : (
            posts.pages.map((item, index) => (
              <GridPostList key={index} posts={item.documents} />
            ))
          )}
        </div>
        {hasNextPage && !searchTerm && (
          <div ref={ref} className="mt-10">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};
