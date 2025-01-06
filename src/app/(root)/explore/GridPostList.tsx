import React, { useState } from "react";
import PostStatus from "@/components/Shared/PostStatus";
import { useAuth } from "@clerk/nextjs";
import { formatLikes } from "@/lib/utils";
import { FaStar, FaStarHalfAlt, FaRegStar, FaEye } from "react-icons/fa";
import Link from "next/link";

const GridPostList = ({ posts }: { posts: any[] }) => {
  const { userId } = useAuth();

  return (
    <div className="grid grid-cols-1 gap-2 mb-2">
      {posts.map((post) => (
        <PostCard key={post.$id} post={post} userId={userId!} />
      ))}
    </div>
  );
};

const PostCard = ({ post, userId }: { post: any; userId: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    const starMapping = {
      "5-star": 5,
      "4-star": 4,
      "3-star": 3,
      "2-star": 2,
    };

    if ((starMapping as any)[name]) {
      const starCount = (starMapping as any)[name];
      return (
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }, (_, index) => {
            if (index < starCount) {
              return <FaStar key={index} className="text-yellow-500" />;
            } else {
              return <FaRegStar key={index} className="text-gray-300" />;
            }
          })}
        </div>
      );
    }

    // Fallback for other names
    return <p className="text-sm text-gray-500 mt-2 capitalize">{name}</p>;
  };

  const dashboardHiddenToken = process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN;

  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow duration-300 flex h-48 md:min-h-56">
      <div className="relative aspect-video w-[200px] md:w-[250px] h-full bg-black">
        {/* Dynamically Display the Current Image */}
        <img
          src={post.images[currentImageIndex]}
          alt={`post-image-${currentImageIndex}`}
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <PostStatus post={post} userId={userId} />
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

      {/* POST INFOS */}
      <div className="p-4 flex flex-col justify-between w-full">
        <h2 className="text-lg font-bold text-nowrap">{post.title}</h2>
        {post.subCategory === "Hotels" && renderStars(post.item)}
        {post.subCategory && (
          <p className="text-sm text-gray-500">{post.subCategory}</p>
        )}
        {(post.category === "event" ||
          post.category === "economic" ||
          post.category === "news") && (
          <p className="text-sm text-gray-500 -mt-[7px]">
            {post.city}, {post.district}, {post.province}
          </p>
        )}

        {post.category === "province" && (
          <div>
            <p className="text-sm text-gray-500 capitalize">
              <span className="text-[10px] font-semibold">
                {post.category}:
              </span>{" "}
              <br /> {post.title}
            </p>

            {/* <p className="text-[10px] text-gray-500">
              District: {post.district}
            </p> */}
          </div>
        )}

        <div
          className="prose prose-lg text-[12px] text-gray-600 mb-3 text-start line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
        {post.category === "event" && (
          <p className="text-[10px] text-gray-500">
            Event Date: {new Date(post.date).toLocaleDateString()}
          </p>
        )}
        {/* {post.category} */}
        <Link
          href={`/post?postId=${post.$id}&category=${post.category}&dash=${dashboardHiddenToken}`}
          className="flex items-center"
        >
          <FaEye className="mr-2" />{" "}
          <span className="text-[12px]">View Post</span>
        </Link>
      </div>
    </div>
  );
};

export default GridPostList;
