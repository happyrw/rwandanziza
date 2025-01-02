//@ts-nocheck
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const [filters, setFilters] = useState({
    categories: [],
    amenities: [],
    propertyClass: [],
    cities: [],
    popularLocations: [],
    travelerExperience: [],
  });
  const router = useRouter();

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return { ...prevFilters, [category]: newValues };
    });
  };

  const onCategorySelect = (filterKey) => {
    router.push(`/explore?searchTerm=${filterKey}`);
  };

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filter by</h2>

      {/* Explore Categories */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Explore Categories
        </p>
        {["Beaches", "Mountains", "Forests", "Historical Sites"].map(
          (category) => (
            <label key={category} className="block text-gray-600 mb-1">
              <input
                type="checkbox"
                value={category}
                onChange={() => handleCheckboxChange("categories", category)}
                checked={filters.categories.includes(category)}
                className="mr-2 accent-sky-600"
              />
              {category}
            </label>
          )
        )}
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2">Amenities</p>
        {["Parking", "Wi-Fi", "Swimming Pool", "Restaurant"].map((amenity) => (
          <label key={amenity} className="block text-gray-600 mb-1">
            <input
              type="checkbox"
              value={amenity}
              onChange={() => handleCheckboxChange("amenities", amenity)}
              checked={filters.amenities.includes(amenity)}
              className="mr-2 accent-sky-600"
            />
            {amenity}
          </label>
        ))}
      </div>

      {/* Property Class */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Property Class
        </p>
        {["5 Star", "4 Star", "3 Star", "Budget"].map((propertyClass) => (
          <label key={propertyClass} className="block text-gray-600 mb-1">
            <input
              type="checkbox"
              value={propertyClass}
              onChange={() =>
                handleCheckboxChange("propertyClass", propertyClass)
              }
              checked={filters.propertyClass.includes(propertyClass)}
              className="mr-2 accent-sky-600"
            />
            {propertyClass}
          </label>
        ))}
      </div>

      {/* Cities */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2">Cities</p>
        {["Kigali", "Gisenyi", "Musanze", "Huye"].map((city) => (
          <label key={city} className="block text-gray-600 mb-1">
            <input
              type="checkbox"
              value={city}
              onChange={() => handleCheckboxChange("cities", city)}
              checked={filters.cities.includes(city)}
              className="mr-2 accent-sky-600"
            />
            {city}
          </label>
        ))}
      </div>

      {/* Popular Locations */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Popular Locations
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
              value={location}
              onChange={() =>
                handleCheckboxChange("popularLocations", location)
              }
              checked={filters.popularLocations.includes(location)}
              className="mr-2 accent-sky-600"
            />
            {location}
          </label>
        ))}
      </div>

      {/* Traveller Experience */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Traveller Experience
        </p>
        {["Adventure", "Relaxation", "Cultural", "Luxury"].map((experience) => (
          <label key={experience} className="block text-gray-600 mb-1">
            <input
              type="checkbox"
              value={experience}
              onChange={() =>
                handleCheckboxChange("travelerExperience", experience)
              }
              checked={filters.travelerExperience.includes(experience)}
              className="mr-2 accent-sky-600"
            />
            {experience}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
