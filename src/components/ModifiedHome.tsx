import React from "react";
import ModiFiedHomePage from "./ModifiedfieldHomePage";
import ModifiedSearch from "./ModifiedSearch";
import Link from "next/link";
import ModifiedPost from "./ModifiedPost";
import ModifiedCategory from "./ModifiedCategory";

const ModifiedHome = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-scenic-view bg-cover bg-center w-full h-48 lg:h-[470px]">
        <h3 className="text-2xl leading-5 lg:leading-10 lg:text-5xl text-white font-bold text-center font-sans lg:tracking-wider text-shadow-md">
          Take a trip around u <br />{" "}
          <span className="tracking-normal">Rwanda together</span>
        </h3>
        <p className="text-md lg:text-2xl font-handwriting mt-3 text-gray-300 font-bold tracking-wider text-shadow-lg">
          find awesome hotels, restaurant, parks, gyms
        </p>
        <div className="w-full flex mt-2 lg:mt-5 gap-10">
          <Link
            href="/explore"
            className="text-center bg-gray-100 text-sky-700  w-full py-[5px] lg:py-2 rounded-[0px_10px_10px_0px] font-bold text-[12px] lg:text-lg"
          >
            Explore
          </Link>
          <Link
            href="/news"
            className="text-center bg-gray-100 text-sky-700  w-full py-[5px] lg:py-2 rounded-[10px_0px_0px_10px] font-bold text-[12px] lg:text-lg"
          >
            News blog
          </Link>
        </div>
      </div>
      {/* Search */}
      <div className="w-[90%] lg:w-[70%] bg-white shadow shadow-black/15 p-2 relative -top-5 lg:-top-10 mx-auto">
        <ModifiedSearch />
      </div>
      <ModifiedCategory />
      {/* Testimonial */}
      <div className="w-full md:w-[70%] px-2 md:px-0 bg-white  mx-auto mt-20">
        <h4 className="text-xl font-bold text-gray-700 mb-4 text-center">
          What Visitors Are Saying
        </h4>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {[
            {
              testimony:
                "Rwanda is a paradise! The parks and hotels exceeded my expectations.",
              name: "- Jane Smith",
              profile:
                "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg",
              rating: 3,
            },
            {
              testimony:
                "The food, the culture, the people – everything was perfect.",
              name: "- John Doe",
              profile:
                "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg",
              rating: 5,
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start gap-4 border p-4"
            >
              <div className="flex items-center mt-2 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-sky-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.562 4.789a1 1 0 00.95.69h5.065c.969 0 1.371 1.24.588 1.81l-4.1 3.032a1 1 0 00-.364 1.118l1.562 4.789c.3.921-.755 1.688-1.539 1.118l-4.1-3.032a1 1 0 00-1.176 0l-4.1 3.032c-.784.57-1.838-.197-1.539-1.118l1.562-4.789a1 1 0 00-.364-1.118l-4.1-3.032c-.783-.57-.381-1.81.588-1.81h5.065a1 1 0 00.95-.69l1.562-4.789z" />
                  </svg>
                ))}
              </div>
              <blockquote className="border-l-4 border-blue-600 pl-4">
                <p className="text-gray-700 italic">
                  &quot;{t.testimony}&quot;
                </p>
                <footer className="text-sm text-gray-500 mt-2">{t.name}</footer>
              </blockquote>
              <img
                src={t.profile}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Subscribe */}
      <div className="p-[20px_8px] lg:p-10 bg-connected bg-cover bg-bottom h-fit lg:h-[400px] mt-10 shadow-md rounded-lg">
        <div className="w-full md:w-[400px] bg-white/75 p-5 rounded-lg">
          <h4 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Stay Connected
          </h4>
          <p className="text-gray-500 text-sm text-center">
            Sign up for our newsletter and receive exclusive deals, tips, and
            updates.
          </p>
          <form className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="Your Email"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
            />
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* Must see */}
      <div className="w-full md:w-[80%] mt-10 mb-14 mx-auto">
        <h4 className="text-xl font-bold text-gray-700 mb-4 text-center">
          Must See in Rwanda
        </h4>
        <ModiFiedHomePage />
      </div>
    </div>
  );
};

export default ModifiedHome;
