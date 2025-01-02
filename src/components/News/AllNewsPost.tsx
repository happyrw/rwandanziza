"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const AllNewsPost = ({ posts }: { posts: any[] }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for filtering posts
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-full hover:bg-sky-800 hover:text-white"
          variant="outline"
        >
          Load More Posts
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full lg:min-w-[600px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>All News Posts</SheetTitle>
          <SheetDescription>
            Browse the latest posts from our community.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {/* Search Input */}
          <Input
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={handleSearch}
            className="mb-4"
          />
          {/* Posts List */}
          <div className="grid gap-2 h-[400px] lg:h-[600px] overflow-y-auto pb-20 remove-scrollbar items-start">
            {filteredPosts.length ? (
              filteredPosts.map((post, index) => (
                <div
                  key={index}
                  className="mb-2 grid grid-cols-2 gap-3 items-center bg-white p-2 rounded-md shadow hover:shadow-lg transition-shadow"
                >
                  <img
                    src={post.images[0]}
                    alt="post"
                    className="w-full lg:h-40 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h4 className="text-xl text-start line-clamp-1 font-semibold text-gray-700 my-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    <div
                      className="prose prose-lg text-sm text-gray-600 mb-3 text-start line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 underline font-medium transition-colors"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No posts found.</p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AllNewsPost;
