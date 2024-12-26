import { useLikePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked, formatLikes } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

const PostStatus = ({
  post,
  userId,
}: {
  post: any;
  userId: string | undefined;
}) => {
  const { mutate: likePost } = useLikePost();
  const likesArray = post.likes;
  const [likes, setLikes] = useState(likesArray);

  const dashboardHiddenToken = process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN;

  const handleLikePost = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("You need to be logged in to like a post.");
      return;
    }

    let newLikes = [...likes];

    const isLikedByUser = newLikes.includes(userId);

    if (isLikedByUser) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({
      postId: post.$id,
      category: post.category,
      likesArray: newLikes,
    });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("You need to be logged in to save a post.");
      return;
    }
  };

  return (
    <div className="flex items-center justify-between px-[2px] lg:px-10 mt-2">
      <div className="flex gap-2">
        <img
          src={
            checkIsLiked(likes, userId!)
              ? "/icons/liked.svg"
              : "/icons/heart.svg"
          }
          alt="like-icon"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">
          {" "}
          {likes ? formatLikes(likes.length) : "0"}
        </p>
      </div>
      {/* <img
        src="/icons/save.svg"
        alt="like-icon"
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={handleSavePost}
      /> */}
      <Link
        href={`/post?postId=${post.$id}&category=${post.category}&dash=${dashboardHiddenToken}`}
      >
        <button className="px-2 lg:px-4 py-[4px] text-sm md:font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 text-nowrap">
          View Post
        </button>
      </Link>
    </div>
  );
};

export default PostStatus;
