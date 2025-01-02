"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const OnboardingSteps = () => {
  const [hideItem, setHideItem] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-bold text-xl capitalize">Create a Post</p>
        <ChevronDown
          className={`cursor-pointer transition-all duration-75 ease-out ${
            hideItem ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setHideItem((prev) => !prev)}
        />
      </div>

      <div
        className={`border rounded-md space-y-4 overflow-hidden transition-all duration-75 ease-out bg-black/10 ${
          hideItem ? "h-0 p-0" : "h-fit p-4"
        }`}
      >
        <div className="grid grid-cols-2 gap-2">
          {/* Province */}
          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Province:
            </label>
            <input
              type="text"
              name="province"
              id="province"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* District */}
          <div>
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              District:
            </label>
            <input
              type="text"
              name="district"
              id="district"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 space-y-4 items-start">
          {/* Explore Categories */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Explore Categories:
            </p>
            {["Beaches", "Mountains", "Forests", "Historical Sites"].map(
              (category) => (
                <label key={category} className="block text-gray-600 mb-1">
                  <input
                    type="checkbox"
                    name="exploreCategories"
                    value={category}
                    className="mr-2 accent-sky-600"
                  />
                  {category}
                </label>
              )
            )}
          </div>

          {/* Amenities */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
            {["Parking", "Wi-Fi", "Swimming Pool", "Restaurant"].map(
              (amenity) => (
                <label key={amenity} className="block text-gray-600 mb-1">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    className="mr-2 accent-sky-600"
                  />
                  {amenity}
                </label>
              )
            )}
          </div>

          {/* Property Class */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Property Class:
            </p>
            {["5 Star", "4 Star", "3 Star", "Budget"].map((propertyClass) => (
              <label key={propertyClass} className="block text-gray-600 mb-1">
                <input
                  type="checkbox"
                  name="propertyClass"
                  value={propertyClass}
                  className="mr-2 accent-sky-600"
                />
                {propertyClass}
              </label>
            ))}
          </div>

          {/* Cities */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Cities:</p>
            {["Kigali", "Gisenyi", "Musanze", "Huye"].map((city) => (
              <label key={city} className="block text-gray-600 mb-1">
                <input
                  type="checkbox"
                  name="cities"
                  value={city}
                  className="mr-2 accent-sky-600"
                />
                {city}
              </label>
            ))}
          </div>

          {/* Popular Locations */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Popular Locations:
            </p>
            {[
              "Lake Kivu",
              "Nyungwe Forest",
              "Volcanoes National Park",
              "Kimironko Market",
            ].map((location) => (
              <label key={location} className="block text-gray-600 mb-1">
                <input
                  type="checkbox"
                  name="popularLocations"
                  value={location}
                  className="mr-2 accent-sky-600"
                />
                {location}
              </label>
            ))}
          </div>

          {/* Traveller Experience */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Traveller Experience:
            </p>
            {["Adventure", "Relaxation", "Cultural", "Luxury"].map(
              (experience) => (
                <label key={experience} className="block text-gray-600 mb-1">
                  <input
                    type="checkbox"
                    name="travelerExperience"
                    value={experience}
                    className="mr-2 accent-sky-600"
                  />
                  {experience}
                </label>
              )
            )}
          </div>
        </div>

        <div className="flex items-center gap-[2px]">
          <div className="flex-grow">
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude:
            </label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              // value={formData.latitude}
              // onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex-grow">
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude:
            </label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              // value={formData.longitude}
              // onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="youtubeUrl"
            className="block text-sm font-medium text-gray-700"
          >
            YouTube Video URL:
          </label>
          <input
            type="url"
            name="youtubeUrl"
            id="youtubeUrl"
            // value={formData.youtubeUrl}
            // onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingSteps;
