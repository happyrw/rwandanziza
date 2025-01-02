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
      <div className="mt-10">
        <Loading />
      </div>
    );
  }
  if (searchedPosts.length > 0) {
    return <GridPostList posts={searchedPosts} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">
      No results found or change category
    </p>
  );
};

export default SearchResults;
