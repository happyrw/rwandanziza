import GridPostList from "@/app/(root)/explore/GridPostList";
import Loading from "@/app/Loading";
import { Models } from "node-appwrite";
import React from "react";

type SearchResultProp = {
  searchedPosts: Models.Document[];
  isSearchFetching: boolean;
};
const SearchResults = ({
  searchedPosts,
  isSearchFetching,
}: SearchResultProp) => {
  if (isSearchFetching) {
    return (
      <div className="h-screen pt-10">
        <Loading />
      </div>
    );
  }
  if (searchedPosts.length > 0) {
    return <GridPostList posts={searchedPosts} />;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start  mt-10">
      <img
        src="/animation.gif"
        alt="End of posts animation"
        className="w-24 mb-4"
      />
      <p className="text-light-4 font-semibold">
        No results found matches your search criteria
      </p>
    </div>
  );
};

export default SearchResults;
