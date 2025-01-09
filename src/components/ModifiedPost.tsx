"use client";
import React, { useState } from "react";
import PostStatus from "./Shared/PostStatus";
import { useUserContext } from "@/context/AuthContext";

const ModifiedPost = ({ post }: { post: any }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const { user } = useUserContext();

  const handleLeftClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (name: string) => {
    const starMapping: Record<string, number> = {
      "5-star": 5,
      "4.5-star": 4.5,
      "4-star": 4,
      "3.5-star": 3.5,
      "3-star": 3,
      "2.5-star": 2.5,
      "2-star": 2,
    };

    const starRating = starMapping[name];

    if (starRating !== undefined) {
      return (
        <span>
          {starRating}
          {starRating !== 5 ? ".5" : ".0"} ★
        </span>
      );
    }

    return null; // Handle cases where `name` doesn't match
  };

  return (
    <>
      {/* Image Section */}
      <div className="w-full sm:w-1/2 relative h-48 lg:h-auto">
        <img
          src={post.images[currentImageIndex]}
          alt="Hotel Room"
          className="w-full h-full object-cover rounded-lg"
        />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {renderStars(post.item)}
        </span>
        <div className="absolute bottom-2 right-2">
          <PostStatus post={post} userId={user?.id} />
        </div>
        <div>
          {/* Left Button */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
            onClick={handleLeftClick}
          >
            &#8249;
          </button>
          {/* Right Button */}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
            onClick={handleRightClick}
          >
            &#8250;
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full sm:w-1/2 p-2 lg:p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-[12px] lg:text-lg font-semibold text-gray-800 line-clamp-1">
            {post?.title}
          </h2>
          <p className="text-[10px] lg:text-sm text-gray-500">
            {post?.subCategory}
          </p>
        </div>

        {/* Location */}
        <div className="mt-2">
          <p className="text-[10px] lg:text-sm text-gray-500 line-clamp-1">
            {post?.district}, {post?.province}, {post?.city}
          </p>
        </div>

        {/* Description */}
        <div className="mt-2">
          <p
            className="text-[10px] lg:text-sm text-gray-700 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post?.description }}
          />
        </div>

        {/* Price and Stars */}
        <div className="flex flex-col items-start mt-2">
          <div>
            <p className="text-[10px] lg:text-lg font-bold text-blue-600">
              $120/night
            </p>
          </div>
          <div>
            <p className="text-yellow-500 text-[12px] lg:text-lg font-semibold">
              {post?.item} ★
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-2 lg:mt-4 flex items-center justify-between">
          <button className="bg-blue-600 text-white text-[10px] lg:text-sm px-4 py-2 rounded-md hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </>
  );
};

export default ModifiedPost;
