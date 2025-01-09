"use client";

import {
  useGetPosts,
  useSearchPostByCategory,
} from "@/lib/react-query/queriesAndMutations";
import React, { useState } from "react";
import ModifiedPost from "./ModifiedPost";
import { Loader } from "lucide-react";

const ModifiedCategory = () => {
  const [modifiedCategory, setModifiedCategory] = useState("Hotels");
  const { data: posts } = useSearchPostByCategory(modifiedCategory);

  return (
    <>
      <div className="w-full lg:w-[70%] bg-white p-2 lg:p-4 relative  mx-auto shadow-md">
        <h4 className="text-lg lg:text-xl font-bold text-gray-700 mb-2 lg:mb-4 text-center">
          Top Picks for You
        </h4>
        <div className="grid grid-cols-3 gap-[5px] lg:gap-4">
          <div
            className="lg:p-4 bg-gray-100 shadow-md rounded-md cursor-pointer"
            onClick={() => setModifiedCategory("Hotels")}
          >
            <h5 className="font-bold text-sky-600 text-[12px] lg:text-lg">
              Luxury Hotels
            </h5>
            <p className="hidden md:flex text-sm text-center mt-2 text-gray-600">
              Experience world-class comfort and service.
            </p>
          </div>
          <div
            className="lg:p-4 bg-gray-100 shadow-md rounded-md cursor-pointer"
            onClick={() => setModifiedCategory("Parks")}
          >
            <h5 className="font-bold text-gray-800 text-[12px] lg:text-lg">
              Must-Visit Parks
            </h5>
            <p className="hidden md:flex text-sm text-center mt-2 text-gray-600">
              Explore Rwanda's breathtaking natural beauty.
            </p>
          </div>
          <div
            className="lg:p-4 bg-gray-100 shadow-md rounded-md cursor-pointer"
            onClick={() => setModifiedCategory("Restaurants")}
          >
            <h5 className="font-bold text-gray-800 text-[12px] lg:text-lg">
              Top Restaurants
            </h5>
            <p className="hidden md:flex text-sm text-center mt-2 text-gray-600">
              Enjoy a wide variety of local and international cuisines.
            </p>
          </div>
        </div>
      </div>
      {/* Post */}
      {!posts?.length ? (
        <div className="flex items-center justify-center mt-10">
          <Loader className="w-4 h-4 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 p-2 lg:p-6 w-full lg:w-[70%] mx-auto">
          {/* Left Column */}
          <div className="grid grid-cols-1 gap-6">
            {posts.slice(0, 2).map((post, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <ModifiedPost post={post} />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-1 gap-6">
            {posts.slice(2, 4).map((post, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <ModifiedPost post={post} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ModifiedCategory;
