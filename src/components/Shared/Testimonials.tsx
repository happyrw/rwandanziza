"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Testimonials() {
  const testimonials = [
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers for navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Testimonials & Reviews
        </h2>

        <div className="flex justify-center items-center">
          {/* Left Button */}
          <button
            onClick={handlePrev}
            className="flex items-center justify-center bg-gray-300 p-3 h-8 w-8 rounded-full hover:bg-gray-400"
          >
            <ArrowLeft className="h-4" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 mx-4 flex flex-col items-center text-center w-80">
            <img
              src={currentTestimonial.avatar}
              alt={currentTestimonial.name}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {currentTestimonial.name}
            </h3>
            <div className="flex items-center mt-2">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
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
              {currentTestimonial.review}
            </p>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            className="flex items-center justify-center bg-gray-300 p-3 h-8 w-8 rounded-full hover:bg-gray-400"
          >
            <ArrowRight className="h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
