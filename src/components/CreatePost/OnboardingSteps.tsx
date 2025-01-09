"use client";

import { subCategory } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface OnboardingStepsProps {
  formValues: Record<string, any>;
  formData: Record<string, any>;
  setFormData: any;
  setFormValues: any;
  category: string;
}

const provinces = [
  "Kigali",
  "Northern Province",
  "Southern Province",
  "Eastern Province",
  "Western Province",
];

const districts: Record<string, string[]> = {
  Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
  "Northern Province": ["Musanze", "Gicumbi", "Rulindo", "Burera", "Gakenke"],
  "Southern Province": [
    "Huye",
    "Muhanga",
    "Nyanza",
    "Gisagara",
    "Ruhango",
    "Kamonyi",
    "Nyaruguru",
    "Nyamagabe",
  ],
  "Eastern Province": [
    "Bugesera",
    "Gatsibo",
    "Kayonza",
    "Kirehe",
    "Ngoma",
    "Nyagatare",
    "Rwamagana",
  ],
  "Western Province": [
    "Karongi",
    "Ngororero",
    "Nyabihu",
    "Nyamasheke",
    "Rubavu",
    "Rusizi",
    "Rutsiro",
  ],
};

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({
  formValues,
  formData,
  setFormData,
  setFormValues,
  category,
}) => {
  const [hideItem, setHideItem] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [items, setItems] = useState<{ name: string; description: string }[]>(
    []
  );

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const province = event.target.value;
    setSelectedProvince(province);
    setSelectedDistrict("");
    setFormValues({ ...formValues, province, district: "" });
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setFormValues({ ...formValues, district });
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedSubCategory(selected);
    setItems((subCategory as any)[selected]?.items || []);
    setFormValues({ ...formValues, subCategory: selected, item: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleInputChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const doNotShow =
    category === "news" || category === "event" || category === "economic";

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
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
        {/* Province & District */}
        {doNotShow && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="province"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Province:
                </label>
                <select
                  name="province"
                  id="province"
                  value={formValues.province || selectedProvince}
                  onChange={handleProvinceChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    -- Select a province --
                  </option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  District:
                </label>
                <select
                  name="district"
                  id="district"
                  value={formValues.district || selectedDistrict}
                  onChange={handleDistrictChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    -- Select a district --
                  </option>
                  {(
                    districts[formValues.province || selectedProvince] || []
                  ).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subcategory & Items */}
            {category !== "event" && (
              <div>
                {category === "news" ? (
                  <div>
                    <label
                      htmlFor="subcategory"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Select Subcategory
                    </label>
                    <select
                      id="subcategory"
                      name="subCategory"
                      value={formValues.subCategory || selectedSubCategory}
                      onChange={handleSubCategoryChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    >
                      <option value="">-- Select News Subcategory --</option>
                      {[
                        "localNews",
                        "travelTips",
                        "culturalHighlights",
                        "guestBlogs",
                      ].map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label
                        htmlFor="subcategory"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Select Subcategory
                      </label>
                      <select
                        id="subcategory"
                        name="subCategory"
                        value={formValues.subCategory || selectedSubCategory}
                        onChange={handleSubCategoryChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      >
                        <option value="">-- Select a Subcategory --</option>
                        {Object.keys(subCategory).map((key) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="items"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Select Item
                      </label>
                      <select
                        id="items"
                        name="item"
                        value={formValues.item || ""}
                        onChange={handleInputChange}
                        disabled={!items.length}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      >
                        <option value="">-- Select an Item --</option>
                        {items.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Latitude & Longitude */}
        {category !== "news" && (
          <div className="flex items-center gap-2">
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
                // value={formData.latitude || ""}
                value="105475839"
                disabled
                onChange={handleInputChanges}
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
                // value={formData.longitude || ""}
                value="105475839"
                disabled
                onChange={handleInputChanges}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        )}

        {/* Additional Fields */}
        <div
          className={`grid ${doNotShow ? "grid-cols-2 gap-2" : "grid-cols-1"}`}
        >
          {doNotShow && (
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City:
              </label>
              <input
                type="text"
                name="city"
                id="city"
                // value={formValues.city || ""}
                value="Kigali"
                disabled
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          )}
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
              // value={formData.youtubeUrl || ""}
              value="https://www.youtube.com/watch?v=KQVNZeb5-mo"
              disabled
              onChange={handleInputChanges}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSteps;
