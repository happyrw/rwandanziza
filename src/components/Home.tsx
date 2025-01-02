"use client";
import { searchPostsByTitle } from "@/lib/appwrite/api";
import { useGetPosts } from "@/lib/react-query/queriesAndMutations";
import { MapPinHouse, Newspaper, UserRoundSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HomeP = () => {
  const [fetchedPosts, setFetchedPosts] = useState<any>({});
  const [isFetching, setIsFetching] = useState(true);

  const { data: economicPost } = useGetPosts("economic");
  const elementRef = useRef(null);

  const economicDocuments =
    economicPost?.pages?.flatMap((page) => page.documents) || [];

  //   USE EFFECT
  useEffect(() => {
    const posts = async () => {
      const response = await searchPostsByTitle();

      setFetchedPosts(response);
      setIsFetching(false);
    };
    posts();
  }, []);

  if (isFetching) return <p>Loading...</p>;

  const dashboardHiddenToken = process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN;

  const slideRight = (element: any) => {
    element.scrollLeft += 500;
  };
  const slideLeft = (element: any) => {
    element.scrollLeft -= 500;
  };
  return (
    <>
      <section className="relative flex items-center justify-center flex-col w-full h-80 lg:h-[500px] bg-scenic-view bg-cover bg-top p-10">
        {/* Text Section */}
        <div className="flex items-center justify-center flex-col py-10 z-10 mt-20 lg:ml-[500px]">
          <h1 className="flex flex-col items-center justify-center font-handwriting text-3xl lg:text-5xl text-gray-100 font-bold text-center">
            Welcome to{" "}
            <span className="capitalize block text-yellow-500 font-bold">
              country of 1000 hills
            </span>
          </h1>
        </div>

        {/* Button Grid Section */}
        <div className="grid grid-cols-2 gap-2 lg:gap-5 z-10">
          <Link
            href="/explore"
            className="flex items-center justify-center gap-2 bg-white/75 hover:bg-white px-[5px] lg:px-4 py-2 rounded-lg w-full lg:w-[200px] capitalize font-bold text-[10px] md:text-sm lg:text-lg border-2 border-sky-500 text-sky-900 transition duration-300 shadow-md hover:shadow-lg"
          >
            <UserRoundSearch className="h-[20px] w-[20px] text-sky-900" />{" "}
            explore
          </Link>
          <Link
            href="/news"
            className="flex items-center justify-center gap-2 bg-white/75 hover:bg-white px-[5px] lg:px-4 py-2 rounded-lg w-full lg:w-[200px] capitalize font-bold text-[10px] md:text-sm lg:text-lg border-2 border-sky-500 text-sky-900 transition duration-300 shadow-md hover:shadow-lg"
          >
            <Newspaper className="h-[20px] w-[20px] text-sky-900" /> news blog
          </Link>
        </div>

        {/* Overlay Section */}
        <div className="absolute w-full h-full bg-black/10" />
      </section>

      <section className="pt-5">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-700 mb-3">
          <MapPinHouse className="h-[30px] w-[30px] text-gray-700" /> Place Near
          You
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
            {economicDocuments.map((item, index) => (
              <div className="w-[180px] flex-shrink-0 rounded-lg" key={index}>
                <img
                  src={item.images[0]}
                  alt={`business ${index}`}
                  className="w-[180px] h-[100px] rounded-lg object-cover hover:scale-x-95"
                />
                <div className="flex items-center m-2 justify-between">
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

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img
              src="/rwanda.jpg"
              alt="Scenic View"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-800 leading-snug">
              About Us
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Welcome to{" "}
              <span className="text-blue-600 font-bold">Rwandanziza</span>, your
              gateway to discovering the beauty and cultural heritage of Rwanda.
              We are a community-driven platform where locals and travelers
              share their stories, experiences, and insights about the "Land of
              a Thousand Hills."
            </p>
            <p className="mt-4 text-gray-600 text-lg">
              Our mission is to connect people with authentic experiences, from
              the breathtaking landscapes of the Volcanoes National Park to the
              vibrant streets of Kigali. Whether you’re seeking adventure,
              tranquility, or cultural immersion, we’ve got you covered.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Featured Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {economicDocuments.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden border"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <div
                    className="mt-3 text-sm prose prose-lg text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <a
                    href={`/post?postId=${item.$id}&category=${item.category}&dash=${dashboardHiddenToken}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Cultural Experiences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {fetchedPosts.experiences
              .slice(0, 3)
              .map((item: any, index: any) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden border"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <div
                      className="mt-3 text-sm prose prose-lg text-gray-600 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <a
                      href={`/post?postId=${item.$id}&category=${item.category}&dash=${dashboardHiddenToken}`}
                      className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
            Adventure Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fetchedPosts.activities
              .slice(0, 3)
              .map((activity: any, index: any) => (
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
                    className="mt-4 inline-block text-white hover:text-blue-800 font-medium absolute bottom-4 left-4 bg-black/15 px-2"
                  >
                    Read More →
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Testimonials & Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
                className="bg-white border rounded-lg p-6 flex flex-col items-center text-center"
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <div className="flex items-center mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.562 4.789a1 1 0 00.95.69h5.065c.969 0 1.371 1.24.588 1.81l-4.1 3.032a1 1 0 00-.364 1.118l1.562 4.789c.3.921-.755 1.688-1.539 1.118l-4.1-3.032a1 1 0 00-1.176 0l-4.1 3.032c-.784.57-1.838-.197-1.539-1.118l1.562-4.789a1 1 0 00-.364-1.118l-4.1-3.032c-.783-.57-.381-1.81.588-1.81h5.065a1 1 0 00.95-.69l1.562-4.789z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  {testimonial.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Stories and Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fetchedPosts.tips.slice(0, 3).map((post: any, index: any) => (
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

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
              "https://images.unsplash.com/photo-1556761175-4b46a572b786",
              "https://images.pexels.com/photos/1441021/pexels-photo-1441021.jpeg",
              "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
              "/rwanda1.jpg",
              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
            ].map((url, index) => (
              <div key={index} className="relative">
                <a href={url} className="block" data-lightbox="gallery">
                  <img
                    src={url}
                    alt={`Gallery Image ${index + 1}`}
                    className="h-64 w-full object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Your Next Adventure Awaits!
          </h2>
          <p className="text-lg mb-8">
            Ready to explore new destinations and create unforgettable memories?
            Let's start planning your journey today!
          </p>
          <a
            href="/explore"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            Explore Amazing places!
          </a>
        </div>
      </section>

      <section className="bg-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Get in Touch
          </h2>
          <div className="bg-scenic-view bg-cover py-5 px-2 space-y-3">
            <form className="bg-white/75 p-4 shadow-lg rounded-lg w-full lg:w-[400px] lg:ml-auto">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  rows={4}
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
            <div></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeP;
