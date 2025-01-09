"use client";
import React, { useRef } from "react";

const ModiFiedHomePage = () => {
  const elementRef = useRef(null);

  const slideRight = (element: any) => {
    element.scrollLeft += 500;
  };
  const slideLeft = (element: any) => {
    element.scrollLeft -= 500;
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        onClick={() => slideLeft(elementRef.current)}
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 absolute z-10 rotate-180 top-1/2 -translate-y-1/2 left-0 md:-left-5
            bg-blue-600 cursor-pointer p-2 rounded-full text-white hover:bg-blue-700 shadow-lg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>

      {/* Carousel */}
      <div
        className="flex items-center gap-5 w-full overflow-x-auto px-2 md:px-0 scroll-smooth"
        ref={elementRef}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i, j) => (
          <div
            key={j}
            className="w-[200px] flex flex-col flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src="https://images.pexels.com/photos/19827348/pexels-photo-19827348/free-photo-of-marara-castle-in-rwanda.jpeg"
              alt="Culture in Rwanda"
              className="w-full h-[150px] object-cover rounded-t-lg"
            />
            <p className="font-bold text-sm mt-3 text-center text-blue-600">
              Culture
            </p>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => slideRight(elementRef.current)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 z-10 absolute top-1/2 -translate-y-1/2 -right-0 md:-right-5
            bg-blue-600 cursor-pointer p-2 rounded-full text-white hover:bg-blue-700 shadow-lg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};

export default ModiFiedHomePage;
