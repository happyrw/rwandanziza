"use client";

import LoaderComponent from "@/components/Shared/LoaderComponent";
import SearchResults from "@/components/Shared/SearchResults";
import Sidebar from "@/components/Shared/Sidebar";
import { SidebarSheet } from "@/components/SidebarSheet";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { cn, subCategory } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import GridPostList from "./GridPostList";

export default function ExploreComponent() {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <Content />
    </Suspense>
  );
}

const Content: React.FC = () => {
  const [category, setCategory] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
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
    <div className="p-2 flex gap-3 mx-auto w-full max-w-screen-xl">
      <div className="sticky top-16 h-screen hidden md:flex border rounded-lg p-4 overflow-y-auto remove-scrollbar">
        <Sidebar selectedCategory={category} />
      </div>

      <div className="w-full lg:w-[700px]">
        <div className="sticky top-14 z-10 bg-white pt-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => {
                setCategory(""), router.push("/explore");
              }}
              className={cn(
                `border px-4 py-[3px] capitalize text-[13px] sm:text-[15px] rounded-[30px] hover:border-yellow-500 flex items-center gap-2`,
                category === "" && "text-white bg-sky-900 hover:border-white"
              )}
            >
              All <span>🏠</span>
            </button>
            {Object.keys(subCategory).map((subCat) => (
              <button
                key={subCat}
                onClick={() => {
                  setCategory(subCat);
                  router.push("/explore");
                }}
                className={cn(
                  `border border-blue-200 px-4 py-[3px] capitalize text-[13px] sm:text-[15px] rounded-[30px] hover:border-yellow-500`,
                  category === subCat &&
                    "text-white bg-sky-900 hover:border-white"
                )}
              >
                {subCat}
              </button>
            ))}
          </div>
          <div className="flex-between w-full">
            <div className="flex items-center gap-2">
              <SidebarSheet category={category} />
              <h3 className="body-bold md:h3-bold font-bold capitalize text-blue-700">
                {category ? category : "All🏠"}
              </h3>
            </div>
            <div className="flex-center gap-3 rounded-xl px-4 py-2 cursor-pointer">
              <p className="small-medium md:base-medium text-light-2 text-blue-700">
                All
              </p>
              <img
                src="/icons/filter.svg"
                alt="filter icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          {shouldShowSearchResults ? (
            <SearchResults
              searchedPosts={searchedPosts!}
              isSearchFetching={isSearchFetching}
            />
          ) : shouldShowPosts ? (
            <div className="h-screen flex flex-col items-center justify-start">
              <img
                src="/animation.gif"
                alt="End of posts animation"
                className="mb-4 w-24"
              />
              <p className="text-center mt-2 font-bold">None of posts</p>
            </div>
          ) : (
            posts.pages.map((item, index) => (
              <GridPostList key={index} posts={item.documents} />
            ))
          )}
        </div>
        {hasNextPage && !searchTerm && (
          <div ref={ref} className="mt-10 h-screen">
            <Loader2 className="mx-auto animate-spin h-10 w-10" />
          </div>
        )}
      </div>
    </div>
  );
};
