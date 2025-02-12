"use client";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { formatTimeAgo } from "@/lib/utils";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ImageDialog from "./Shared/ImageDialog";
import LoaderComponent from "./Shared/LoaderComponent";
import { CommentSheet } from "./Shared/commentSheet";
import Loading from "@/app/Loading";

import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaConciergeBell,
  FaDumbbell,
  FaUtensils,
  FaSpa,
  FaCoffee,
} from "react-icons/fa";

export default function PostDetailsComponent() {
  return (
    <Suspense
      fallback={
        <div className="h-screen pt-10">
          <Loading />
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}

const Content: React.FC = () => {
  const searchParam = useSearchParams();

  const category = searchParam.get("category");
  const postId = searchParam.get("postId");

  const { data: post, isPending: loading } = useGetPostById(postId!);

  if (loading)
    return (
      <div className="h-screen pt-20">
        <Loader2 className="mx-auto animate-spin h-10 w-10" />
      </div>
    );
  if (!post) return <LoaderComponent />;

  return (
    <div className="container my-4 mx-auto p-2 md:p-4 lg:p-20 bg-white rounded-lg border">
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
          {post.images.length > 3 && (
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
          )}

          {/* 1 image */}
          {post.images.length === 1 && (
            <div className="grid grid-cols-1">
              <Zoom key={post.images[0]}>
                <img
                  src={post.images[0]}
                  alt="post image"
                  className="w-full md:w-2/3 h-60 md:h-80 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
                />
              </Zoom>
            </div>
          )}

          {/* 2 images */}
          {post.images.length === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {post.images.slice(0, 2).map((image: string, index: number) => (
                <Zoom key={index}>
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-60 md:h-80 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
                  />
                </Zoom>
              ))}
            </div>
          )}

          {/* 3 images */}
          {post.images.length === 3 && (
            <div className="grid grid-cols-3 gap-2">
              {post.images.slice(0, 3).map((image: string, index: number) => (
                <Zoom key={index}>
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-60 md:h-80 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
                  />
                </Zoom>
              ))}
            </div>
          )}
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
              {subService.images.length > 3 && (
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
              )}

              {/* 1 image */}
              {subService.images.length === 1 && (
                <div className="grid grid-cols-1">
                  <Zoom key={subService.images[0]}>
                    <img
                      src={subService.images[0]}
                      alt="post image"
                      className="w-full md:w-2/3 h-60 md:h-72 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
                    />
                  </Zoom>
                </div>
              )}

              {/* 2 images */}
              {subService.images.length === 2 && (
                <div className="grid grid-cols-2 gap-3">
                  {subService.images
                    .slice(0, 2)
                    .map((image: string, index: number) => (
                      <Zoom key={index}>
                        <img
                          src={image}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-56 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
                        />
                      </Zoom>
                    ))}
                </div>
              )}

              {/* 3 images */}
              {subService.images.length === 3 && (
                <div className="grid grid-cols-3 gap-2">
                  {subService.images
                    .slice(0, 3)
                    .map((image: string, index: number) => (
                      <Zoom key={index}>
                        <img
                          src={image}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
                        />
                      </Zoom>
                    ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Most popular facilities */}
      {post.subCategory === "Hotels" && (
        <div>
          <h3 className="text-lg font-bold mb-4">Most Popular Facilities</h3>
          <ul className="grid grid-cols-2 gap-4">
            <li className="flex items-center">
              <FaWifi className="text-blue-500 mr-2" /> Free Wi-Fi
            </li>
            <li className="flex items-center">
              <FaSwimmingPool className="text-teal-500 mr-2" /> Swimming Pool
            </li>
            <li className="flex items-center">
              <FaParking className="text-gray-500 mr-2" /> Free Parking
            </li>
            <li className="flex items-center">
              <FaConciergeBell className="text-orange-500 mr-2" /> 24/7
              Concierge
            </li>
            <li className="flex items-center">
              <FaDumbbell className="text-red-500 mr-2" /> Fitness Center
            </li>
            <li className="flex items-center">
              <FaUtensils className="text-green-500 mr-2" /> On-Site Restaurant
            </li>
            <li className="flex items-center">
              <FaSpa className="text-purple-500 mr-2" /> Spa & Wellness Center
            </li>
            <li className="flex items-center">
              <FaCoffee className="text-brown-500 mr-2" /> Free Breakfast
            </li>
          </ul>
        </div>
      )}

      {/* YouTube Section */}
      <section className="mb-8">
        {post.youtubeUrl && (
          <a
            href={post.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg hover:text-blue-800"
          >
            ▶ Watch on YouTube
          </a>
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
