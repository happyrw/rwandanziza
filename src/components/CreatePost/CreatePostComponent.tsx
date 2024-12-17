"use client";

import { notFound, useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import ErrorComponent from "../Shared/ErrorComponent";
import OnboardingSteps from "./OnboardingSteps";
import TiptapComponent from "./Tiptap/TiptapComponent";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "@/hooks/use-toast";
import ImageUploaderComponent from "./ImageUploaderComponent";
import { Eye, EyeClosed } from "lucide-react";
import PreviewComponent from "./PreviewComponent";
import { createFiles } from "@/lib/appwrite/api";

export default function CreatePostComponent() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Content />
    </Suspense>
  );
}

const Content: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    province: "",
    district: "",
  });
  const [formData, setFormData] = useState({
    date: new Date(),
    title: "",
    tiptap: "<p>Hey there 👋</p>",
    latitude: "",
    images: [] as string[],
    longitude: "",
    youtubeUrl: "",
    subServices: [
      { name: "", images: [] as string[], description: "<p>Hey there 👋</p>" },
    ],
  });

  const [showOnboarding, setShowOnboarding] = useState(false);

  const searchParam = useSearchParams();
  const category = searchParam.get("category");
  const hiddenToken = searchParam.get("dash");
  const { toast } = useToast();
  if (hiddenToken !== process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN)
    return notFound();

  useEffect(() => {
    const savedData = localStorage.getItem("onboardingData");
    if (savedData) {
      setFormValues(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if ((category === "event" || category === "economic") && !formValues) {
      setShowOnboarding(true);
    }
  }, [category, formValues]);

  useEffect(() => {
    if (formValues.title) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: formValues.title, // Update title in formData
      }));
    }
  }, [formValues]);

  if (!category) return <ErrorComponent text="No category provided !" />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index: number, files: File[]) => {
    const updatedSubServices = [...formData.subServices];
    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    updatedSubServices[index].images = newImageUrls;

    setFormData({ ...formData, subServices: updatedSubServices });
  };

  const handleFileChange = (files: File[]) => {
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: fileUrls });
  };

  const handleTiptapChange = useCallback(
    (index: number, value: string) => {
      const updatedSubServices = [...formData.subServices];
      updatedSubServices[index].description = value;
      setFormData({ ...formData, subServices: updatedSubServices });
    },
    [formData]
  );

  const handleAddSubService = useCallback(() => {
    setFormData({
      ...formData,
      subServices: [
        ...formData.subServices,
        { name: "", images: [], description: "" },
      ],
    });
  }, [formData]);

  const handleRemoveSubService = (index: number) => {
    const updatedSubServices = formData.subServices.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, subServices: updatedSubServices });
  };

  const handleDateChange = (value: any) => {
    setFormData({ ...formData, date: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (
      !formData.date ||
      !formData.title ||
      !formData.tiptap ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.youtubeUrl
    ) {
      toast({
        title: "Missing required fields",
        description: "Please fill out the required fields",
        variant: "destructive",
      });
    }

    e.preventDefault();
    const data = await createFiles(formData);
    toast({
      title: "Well done.",
      description: "You did it, nice job.",
    });
  };

  return (
    <div className="mb-10">
      {showOnboarding && !formValues && (
        <OnboardingSteps
          category={category}
          setShowOnboarding={setShowOnboarding}
        />
      )}
      {!preview && (
        <div className="w-full md:min-w-[42rem] max-w-[42rem] mt-10 p-2 md:p-[70px] bg-white shadow-lg rounded-md mx-auto border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                // @ts-ignore
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Images:
              </label>
              <ImageUploaderComponent
                fieldChange={handleFileChange}
                mediaUrl={formData.images}
              />
            </div>

            <div>
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
                value={formData.latitude}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
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
                value={formData.longitude}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description:
              </label>
              <TiptapComponent
                value={formData.tiptap}
                onChange={(value) =>
                  setFormData({ ...formData, tiptap: value })
                }
              />
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
                value={formData.youtubeUrl}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date:
              </label>
              <div className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <DatePicker
                  selected={formData.date}
                  onChange={(date) => handleDateChange(date)}
                  dateFormat="MM/dd/yyyy"
                  showTimeSelect={false}
                  timeInputLabel="Time:"
                  className="border-0 outline-0 py-px"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-center bg-emerald-300 py-2 mb-2">
                Sub Posts
              </label>
              {formData.subServices.map((subService, index) => (
                <div key={index} className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sub Service Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={subService.name}
                      onChange={(e) => {
                        const updatedSubServices = [...formData.subServices];
                        updatedSubServices[index].name = e.target.value;
                        setFormData({
                          ...formData,
                          subServices: updatedSubServices,
                        });
                      }}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Images for Sub Service:
                    </label>
                    <ImageUploaderComponent
                      fieldChange={(files: File[]) =>
                        handleImageChange(index, files)
                      } // Update images for this sub-service
                      mediaUrl={subService.images} // Pass current images of this sub-service
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sub Service Description:
                    </label>
                    <TiptapComponent
                      value={subService.description}
                      onChange={(value) => handleTiptapChange(index, value)}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSubService(index)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    - Remove Sub Service
                  </button>
                </div>
              ))}
              <div className="flex items-center justify-between w-full">
                <button
                  type="button"
                  onClick={handleAddSubService}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  + Add Sub Service
                </button>
                <button
                  type="button"
                  onClick={() => setPreview(true)}
                  className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-3"
                >
                  Preview <Eye />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {preview && (
        <div className="w-full md:min-w-[42rem] max-w-[42rem] mt-5 mx-auto">
          <PreviewComponent data={formData} />
          <button
            type="button"
            onClick={() => setPreview(false)}
            className="mt-4 text-blue-600 bg-blue-600/20 hover:text-blue-800 flex items-center gap-3 w-full p-2 justify-center"
          >
            Close Preview <EyeClosed />
          </button>
        </div>
      )}
    </div>
  );
};
