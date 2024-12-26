import {
  Beer,
  BellPlus,
  Church,
  Dumbbell,
  Flame,
  Hotel,
  LampCeiling,
  Star,
  Utensils,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const categories = [
  { name: "Top Rated Hotels", filterKey: "top_rated_hotels", icon: <Star /> },
  { name: "Expensive Hotels", filterKey: "expensive_hotels", icon: <Hotel /> },
  { name: "New Hotels", filterKey: "new_hotels", icon: <BellPlus /> },
  { name: "Gyms", filterKey: "gyms", icon: <Dumbbell /> },
  { name: "Saunas", filterKey: "saunas", icon: <Flame /> },
  { name: "Bars", filterKey: "bars", icon: <Beer /> },
  { name: "Restaurants", filterKey: "restaurants", icon: <Utensils /> },
  { name: "Churches", filterKey: "churches", icon: <Church /> },
  {
    name: "Memorial Sites",
    filterKey: "memorial_sites",
    icon: <LampCeiling />,
  },
];

const Sidebar = () => {
  const router = useRouter();

  const onCategorySelect = (filterKey: string) => {
    router.push(`/explore?searchTerm=${filterKey}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-center">Explore Categories</h2>
      <ul className="space-y-[2px] grid grid-cols-1 lg:grid-cols-2 gap-3">
        {categories.map((category) => (
          <li
            key={category.filterKey}
            onClick={() => onCategorySelect(category.filterKey)}
            className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition border"
          >
            <span className="w-4 h-4 -mt-3 text-sky-800">{category.icon}</span>
            <span className="text-sky-800 text-sm">{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
