"use client";
import { fetchPostByPostId } from "@/lib/appwrite/api";
import { formatTimeAgo } from "@/lib/utils";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ImageDialog from "./Shared/ImageDialog";
import LoaderComponent from "./Shared/LoaderComponent";
import { CommentSheet } from "./Shared/commentSheet";

export default function PostDetailsComponent() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Content />
    </Suspense>
  );
}

const Content: React.FC = () => {
  const [post, setPost] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const searchParam = useSearchParams();

  const category = searchParam.get("category");
  const postId = searchParam.get("postId");

  useEffect(() => {
    const fetchPost = async () => {
      if (postId && category) {
        try {
          const data = await fetchPostByPostId(postId, category);
          setPost(data);
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [postId, category]);
  if (loading) return <p>Loading...</p>;
  if (!post) return <LoaderComponent />;

  return (
    <div className="container my-4 mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 border-b-2 pb-2">
        {post.title}
      </h1>

      <section className="mb-8">
        <div className="relative w-full">
          <img
            src={post.images[0]}
            alt="Primary Post Image"
            className="w-full sm:w-2/3 h-64 sm:h-80 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
        </div>
      </section>

      {/* Timestamps Section */}
      <section className="my-6 text-sm">
        <p className="flex flex-col sm:flex-row">
          🕒 Created at:{" "}
          <span className="text-gray-500 ml-2">
            {format(new Date(post.$createdAt), "PPPpp")}
          </span>
        </p>
        <p className="mt-2 text-[14px] leading-[18px] font-normal min-w-[100px] text-nowrap flex flex-col sm:flex-row">
          🕒 Time of creation:{" "}
          <span className="text-gray-500 ml-2">
            {formatTimeAgo(post.$createdAt)}
          </span>
        </p>
      </section>

      {/* Images Section */}
      {post.images.length > 0 && (
        <section className="relative mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 remove-scrollbar">
            {post.images.slice(0, 4).map((image: string, index: number) => (
              <Zoom key={index}>
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
                />
              </Zoom>
            ))}
          </div>
          {post.images.length > 4 && <ImageDialog Images={post.images} />}
        </section>
      )}

      {/* Description Section */}
      <section className="mb-2">
        <div
          className="prose prose-lg text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </section>

      {/* Sub-Services Section */}
      {post.subServices.length > 0 && (
        <section className="mb-8">
          {post.subServices.map((subService: any, index: number) => (
            <div key={index} className="py-4">
              <div
                className="prose prose-lg text-gray-600"
                dangerouslySetInnerHTML={{ __html: subService.description }}
              />
              <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {subService.images
                  .slice(0, 4)
                  .map((image: any, idx: number) => (
                    <Zoom key={idx}>
                      <img
                        src={image}
                        alt={`Sub-service image ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
                      />
                    </Zoom>
                  ))}
                {subService.images.length > 4 && (
                  <ImageDialog Images={subService.images} />
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* YouTube Section */}
      <section className="mb-8">
        {post.youtubeUrl ? (
          <a
            href={post.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg hover:text-blue-800"
          >
            ▶ Watch on YouTube
          </a>
        ) : (
          <p className="text-gray-500">No YouTube URL provided</p>
        )}
      </section>

      {/* Timestamps Section */}
      <section className="mt-6 text-gray-500 text-sm">
        <p>🕒 Updated at: {format(new Date(post.$updatedAt), "PPPpp")}</p>
      </section>
      <CommentSheet />
    </div>
  );
};
