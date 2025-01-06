import { subCategory } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Sidebar = ({ selectedCategory }: { selectedCategory: string }) => {
  const [filters, setFilters] = useState({
    categories: "",
    amenities: "",
    propertyClass: "",
    cities: "",
    popularLocations: "",
    travelerExperience: "",
  });

  const router = useRouter();

  const handleTextClick = (category: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
    onCategorySelect(value);
  };

  const onCategorySelect = (filterKey: string) => {
    router.push(`/explore?searchTerm=${filterKey}`);
  };

  return (
    <div className="w-full min-w-fit max-w-xs bg-white rounded-lg shadow-md p-4 remove-scrollbar">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Filter by</h2>
      <div className="h-screen overflow-y-auto pb-48 md:pb-32">
        {/* Dynamically Render Categories */}
        {selectedCategory
          ? Object.entries(subCategory)
              .filter(([category]) => category === selectedCategory)
              .map(([category, { items }]) => (
                <div key={category} className="mb-2 pr-5">
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    {category}
                  </p>
                  {items.map((item) => (
                    <div
                      key={item.name}
                      className={`cursor-pointer p-2 rounded ${
                        filters.categories === item.name
                          ? "text-sky-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => handleTextClick("categories", item.name)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              ))
          : Object.entries(subCategory).map(([category, { items }]) => (
              <div key={category} className="mb-2 pr-5">
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  {category}
                </p>
                {items.map((item) => (
                  <div
                    key={item.name}
                    className={`cursor-pointer p-2 rounded ${
                      filters.categories === item.name
                        ? "text-sky-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => handleTextClick("categories", item.name)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Sidebar;
