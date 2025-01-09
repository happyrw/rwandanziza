"use client";
import Loading from "@/app/Loading";
import { useSearchPostsByTitle } from "@/lib/react-query/queriesAndMutations";
import { cn } from "@/lib/utils";
import { Newspaper, UserRoundSearch } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const HomeP = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const elementRef = useRef(null);

  const { data: posts, isLoading: isFetching } = useSearchPostsByTitle();
  if (isFetching)
    return (
      <div className="h-screen pt-10">
        <Loading />
      </div>
    );
  const { experiences, activities, tips, economic } = posts as any;

  const dashboardHiddenToken = process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN;

  const slideRight = (element: any) => {
    element.scrollLeft += 500;
  };
  const slideLeft = (element: any) => {
    element.scrollLeft -= 500;
  };

  const places = [
    { image: "/home.png", name: "Rubavu" },
    { image: "/home.png", name: "Kigali" },
    { image: "/home.png", name: "Musanze" },
    { image: "/home.png", name: "Bugesera" },
  ];

  return (
    <>
      {/* Top banner */}
      <section className="relative flex items-center justify-center flex-col w-full h-80 lg:h-[400px] bg-scenic-view bg-cover bg-top p-10">
        {/* Text Section */}
        <div className="flex items-center justify-center flex-col py-10 z-10 mt-20 lg:ml-[500px]">
          <h1 className="flex flex-col items-center justify-center text-3xl lg:text-5xl text-gray-100 font-bold text-center">
            <span className="font-handwriting">Welcome to </span>
            <span className="block text-yellow-500 font-bold uppercase">
              country of 1000 hills
            </span>
          </h1>
        </div>

        {/* Button Grid Section */}
        <div className="grid grid-cols-2 gap-2 lg:gap-5 z-10 w-full">
          <Link
            href="/explore"
            className="flex items-center justify-center gap-2 bg-white hover:bg-white px-[5px] lg:px-4 py-2 rounded-[30px] w-full capitalize font-bold text-[10px] md:text-sm lg:text-lg border-2 text-sky-900 border-green-800 transition duration-300 shadow-md hover:shadow-lg"
          >
            <UserRoundSearch className="h-[20px] w-[20px] text-sky-900" />{" "}
            explore
          </Link>
          <Link
            href="/news"
            className="flex items-center justify-center gap-2 bg-white hover:bg-white px-[5px] lg:px-4 py-2 rounded-[30px] w-full capitalize font-bold text-[10px] md:text-sm lg:text-lg border-2 text-sky-900 border-green-800 transition duration-300 shadow-md hover:shadow-lg"
          >
            <Newspaper className="h-[20px] w-[20px] text-sky-900" /> news blog
          </Link>
        </div>

        {/* Overlay Section */}
        <div className="absolute w-full h-full bg-black/10" />
      </section>

      {/* Near you */}
      <section className="pt-2 px-2 lg:px-10 lg:w-[95%] mx-auto">
        <h2 className="flex items-center gap-2 text-xl md:text-2xl lg:text-3xl font-bold mb-2">
          Near places to go
        </h2>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => slideLeft(elementRef.current)}
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 absolute z-10 rotate-180 top-[35%]
            bg-gray-300 cursor-pointer p-1 rounded-full text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          <div
            className="flex gap-2 lg:gap-3 overflow-scroll overflow-x-auto scroll-smooth"
            ref={elementRef}
          >
            {economic.map((item: any, index: number) => (
              <div
                className="relative w-[100px] md:w-[200px] flex-shrink-0 rounded-lg overflow-hidden"
                key={index}
              >
                <div className="absolute w-full h-full bg-black/15" />
                <img
                  src={item.images[0]}
                  alt={`business ${index}`}
                  className="w-[100px] h-[180px] md:w-[280px] md:h-[180px] rounded-lg object-cover hover:scale-x-95"
                />

                <div className="absolute bottom-0 right-0 left-0 w-full flex items-center p-2 justify-between bg-white/70">
                  <p className="text-[13px] font-semibold line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-[13px] text-gray-600">2m</p>
                </div>
              </div>
            ))}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => slideRight(elementRef.current)}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 z-10 absolute right-0 top-[35%]
            bg-gray-300 cursor-pointer p-1 rounded-full text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </section>

      {/* Destination */}
      <section className="bg-gray-50 py-8 lg:py-16 px-5 md:px-10">
        <div>
          <div className="mb-4">
            <p className="text-center text-[12px] md:text-sm lg:text-lg text-sky-600">
              Rwandan's best tourist destinations
            </p>
            <h3 className="text-center text-md md:text-lg lg:text-2xl font-bold">
              MOST POPULAR ADVENTURE
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2 lg:w-[90%] mx-auto">
            {places.map((place, index) => (
              <div
                key={index}
                className={cn(
                  "relative h-[250px] lg:h-[350px] mx-auto flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-300",
                  index % 2 !== 0 && "mt-5 rotate-2"
                )}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full flex items-center p-2 justify-between bg-white/70">
                  <p className="text-[13px] font-semibold line-clamp-1">
                    {place.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-10 py-10 lg:py-20 hover:scale-x-105">
            <img
              src="/home.png"
              alt="home"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <p className="text-center text-[12px] md:text-sm lg:text-lg text-white/50">
                Adventure
              </p>
              <h3 className="text-center text-md md:text-lg lg:text-2xl font-bold text-white">
                ACTIVITIES
              </h3>
            </div>
          </div>
          {/*  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity: any, index: any) => (
              <div
                key={index}
                className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={activity.images[0]}
                  alt={activity.title}
                  className="h-60 w-full object-cover hover:opacity-70"
                  style={{ transition: "opacity 0.3s ease-in-out" }}
                />
                <div className="bg-black p-6 absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-75 transition-opacity duration-300">
                  <h3 className="text-2xl font-semibold text-white line-clamp-1">
                    {activity.title}
                  </h3>
                  <div
                    className="mt-3 text-sm prose prose-lg text-white line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: activity.description }}
                  />
                </div>
                <a
                  href={`/post?postId=${activity.$id}&category=${activity.category}&dash=${dashboardHiddenToken}`}
                  className="mt-4 inline-block text-white font-medium absolute bottom-4 left-4 bg-black/15 px-2"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adventure */}
      {/* <section className="bg-gray-50 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <p className="text-center text-[12px] md:text-sm lg:text-lg text-black/50">
              Adventure
            </p>
            <h3 className="text-center text-md md:text-lg lg:text-2xl font-bold text-black">
              ACTIVITIES
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center bg-white shadow-lg rounded-lg overflow-hidden gap-4">
            <div className="grid grid-cols-2 gap-2">
              {activities[currentIndex].images
                .slice(0, 4)
                .map((image: string, index: number) => (
                  <div
                    className="relative aspect-video rounded-md border border-gray-300"
                    key={index}
                  >
                    <img
                      src={image}
                      alt=""
                      className="absolute object-cover w-full h-full"
                    />
                  </div>
                ))}
            </div>
            <div className="relative bg-black/50 p-6 flex flex-col items-center justify-center h-full">
              <h3 className="text-2xl font-semibold text-white line-clamp-1">
                {activities[currentIndex].title}
              </h3>
              <div
                className="hidden lg:flex mt-3 text-xl prose prose-lg text-white line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: activities[currentIndex].description,
                }}
              />
              <a
                href={`/post?postId=${activities[currentIndex].$id}&category=${activities[currentIndex].category}&dash=${dashboardHiddenToken}`}
                className="mt-4 inline-block text-white font-medium absolute lg:bottom-4 bottom-2 left-4 bg-black/15 px-2"
              >
                Read More →
              </a>
            </div>
          </div>

          <div className="absolute top-1/2 flex items-center justify-between mt-8 gap-5">
            <button
              onClick={prevActivity}
              className="bg-gray-800 text-white p-2"
              disabled={currentIndex === 0} // Disable if it's the first item
            >
              &lt;
            </button>
            <button
              onClick={nextActivity}
              className="bg-gray-800 text-white p-2"
              disabled={currentIndex === activities.length - 1} // Disable if it's the last item
            >
              &gt;
            </button>
          </div>
        </div>
      </section> */}

      {/* Reviews */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sky-700 font-bold text-center">
            REVIEWS & TESTIMONIALS
          </p>
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            TOP REVIEWS FOR Rwandanziza
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {[
              {
                name: "Jane Doe",
                review:
                  "This was a life-changing experience! The attention to detail and level of care made my trip unforgettable.",
                avatar: "https://randomuser.me/api/portraits/women/1.jpg",
                rating: 5,
              },
              {
                name: "John Smith",
                review:
                  "The scenery was breathtaking, and the guided tours were extremely informative. Highly recommend!",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
                rating: 4,
              },
              {
                name: "Emily Johnson",
                review:
                  "I loved the cultural experiences and learning about local traditions. Will definitely visit again!",
                avatar: "https://randomuser.me/api/portraits/women/3.jpg",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-2 lg:p-6 flex flex-col items-center text-center"
              >
                <div className="flex items-center mt-2 mb-7">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-sky-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.562 4.789a1 1 0 00.95.69h5.065c.969 0 1.371 1.24.588 1.81l-4.1 3.032a1 1 0 00-.364 1.118l1.562 4.789c.3.921-.755 1.688-1.539 1.118l-4.1-3.032a1 1 0 00-1.176 0l-4.1 3.032c-.784.57-1.838-.197-1.539-1.118l1.562-4.789a1 1 0 00-.364-1.118l-4.1-3.032c-.783-.57-.381-1.81.588-1.81h5.065a1 1 0 00.95-.69l1.562-4.789z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-lg text-gray-600">
                  {testimonial.review}
                </p>
                <h3 className="text-3xl font-semibold text-gray-800 mt-5">
                  {testimonial.name}
                </h3>
                <p className="text-sky-600">Traveler</p>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mt-5 border-[5px] border-sky-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Stories and Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((post: any, index: any) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {post.title}
                  </h3>
                  <div
                    className="mt-3 prose prose-lg text-base text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  />
                  <a
                    href={`/post?postId=${post.$id}&category=${post.category}&dash=${dashboardHiddenToken}`}
                    className="mt-6 inline-block text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeP;
