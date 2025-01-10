"use client";

import { notFound, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import ErrorComponent from "../Shared/ErrorComponent";
import OnboardingSteps from "./OnboardingSteps";
import TiptapComponent from "./Tiptap/TiptapComponent";

import { useToast } from "@/hooks/use-toast";
import { fetchPostByPostId } from "@/lib/appwrite/api";
import {
  useCreatePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoaderComponent from "../Shared/LoaderComponent";
import ImageUploaderComponent from "./ImageUploaderComponent";
import PreviewComponent from "./PreviewComponent";

export default function CreatePostComponent() {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <Content />
    </Suspense>
  );
}

const Content: React.FC = () => {
  const [preview, setPreview] = useState(false);
  const [done, setDone] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [formValues, setFormValues] = useState({
    province: "",
    district: "",
    subCategory: "",
    item: "",
    city: "Kigali",
  });
  const [formData, setFormData] = useState({
    date: new Date(),
    title: "",
    tiptap: "",
    images: [] as File[] | string[],
    latitude: "105475839",
    longitude: "105475839",
    youtubeUrl: "",
    subServices: [
      {
        images: [] as File[] | string[],
        description: "",
      },
    ],
  });

  // const [showOnboarding, setShowOnboarding] = useState(false);

  const searchParam = useSearchParams();
  const category = searchParam.get("category");
  const hiddenToken = searchParam.get("dash");
  const productId = searchParam.get("productId");
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  const router = useRouter();
  const { toast } = useToast();
  if (hiddenToken !== process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN)
    return notFound();

  // Save images from localStorage on mount
  // useEffect(() => {
  //   if (formData.images && formData.images.length > 0) {
  //     localStorage.setItem("postImages", JSON.stringify(formData.images));
  //   }
  // }, [formData.images]);

  // Fetch the existing post if `productId` exists
  useEffect(() => {
    const fetchPost = async () => {
      if (productId) {
        try {
          // setLoading(true);

          // Fetch post by productId
          const post = (await fetchPostByPostId(productId)) as any;

          // Map images to URLs if they exist
          const isValidDate = !isNaN(Date.parse(post.date));
          const formattedPost = {
            ...post,
            tiptap: post.description,
            date: isValidDate ? new Date(post.date) : new Date(),
            images: post.images || [], // Ensure it's an array of URLs
            subServices:
              post.subServices?.map((subService: any) => ({
                ...subService,
                images: subService.images || [], // Ensure it's an array of URLs
              })) || [],
          };

          // Update formData
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...formattedPost,
          }));

          // Update form values
          setFormValues({
            province: post.province || "",
            district: post.district || "",
            subCategory: post.subCategory || "",
            item: post.item || "",
            city: post.city || "",
          });
        } catch (error: any) {
          // Handle errors
          toast({
            title: "Error fetching post",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    };

    fetchPost();
  }, [productId, category, toast]);

  // Retrieve images from localStorage on mount
  // useEffect(() => {
  //   const storedImages = localStorage.getItem("postImages");
  //   if (storedImages) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       images: JSON.parse(storedImages),
  //     }));
  //   }
  // }, []);

  // useEffect(() => {
  //   const savedData = localStorage.getItem("onboardingData");
  //   if (savedData) {
  //     setFormValues(JSON.parse(savedData));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.clear();
  // }, []);

  // useEffect(() => {
  //   if (category && !formValues.title) {
  //     setShowOnboarding(true);
  //   } else {
  //     setShowOnboarding(false);
  //   }
  // }, [category, formValues]);

  // useEffect(() => {
  //   if (formValues.title) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       title: formValues.title,
  //     }));
  //   }
  // }, [formValues]);

  if (!category) return <ErrorComponent text="No category provided !" />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index: number, files: File[], urls: string[]) => {
    const updatedSubServices = [...formData.subServices];
    updatedSubServices[index].images = urls;
    setFormData({ ...formData, subServices: updatedSubServices });
  };

  const handleFileChange = (files: File[], urls: string[]) => {
    setFormData({ ...formData, images: urls });
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
      subServices: [...formData.subServices, { images: [], description: "" }],
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
    e.preventDefault();

    const payload = {
      ...formData,
      postId: productId,
      province: formValues.province,
      district: formValues.district,
      subCategory: formValues.subCategory,
      item: formValues.item,
      city: formValues.city,
      subServices: formData.subServices.map((subService: any) => ({
        ...subService,
        images: [...subService.images],
        id: subService.$id || null,
      })),
    };

    // setLoading(true);
    setDone(true);
    try {
      if (productId) {
        // Update logic
        await updatePost({ payload });
        setButtonText("Redirecting...");
        localStorage.removeItem("onboardingData");
        toast({
          title: "Post updated successfully! 🎉",
          description: "Your post has been updated successfully!",
        });
      } else {
        // Create logic
        await createPost({ payload, category });
        setButtonText("Redirecting...");
        toast({
          title: "Post created successfully! 🎉",
          description: "Your post has been created successfully!",
        });
      }

      router.push(
        "/dashboard?dash=74c4f6ad5bd3b882a83180e277a316074902179a1b0f7a8ed1684476ddbd23b2"
      );
    } catch (error) {
      setDone(false);
      toast({
        title: `Error ${productId ? "updating" : "creating"} post. ❌`,
        description: "There was an error, please try again later.",
        variant: "destructive",
      });
      console.error(
        `Error ${productId ? "updating" : "creating"} post:`,
        error
      );
    }
  };

  return (
    <div className="mb-10">
      {productId && !formData.images.length ? (
        <LoaderComponent />
      ) : (
        <>
          {!preview && (
            <div className="w-full md:min-w-[42rem] max-w-[42rem] mt-2 lg:mt-10 p-2 md:p-[30px] bg-white shadow-sm rounded-md mx-auto">
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {done && (
                  <div className="absolute z-10 h-full bg-white/50 w-full top-0 bottom-0 right-0 left-0"></div>
                )}
                {/* POST REQUIREMENTS */}
                <OnboardingSteps
                  formValues={formValues}
                  formData={formData}
                  setFormData={setFormData}
                  setFormValues={setFormValues}
                  category={category}
                />
                {/* POST */}
                <p className="font-bold text-2xl capitalize">actual post</p>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Images:
                  </label>
                  <ImageUploaderComponent
                    fieldChange={handleFileChange}
                    mediaUrl={formData.images}
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

                {category === "event" && (
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
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 text-center bg-emerald-300 py-2 mb-2">
                    Sub Posts
                  </label>
                  {formData.subServices.map((subService, index) => (
                    <div key={index} className="space-y-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Upload Images for Sub Service:
                        </label>
                        <ImageUploaderComponent
                          fieldChange={(files: File[], urls: string[]) =>
                            handleImageChange(index, files, urls)
                          }
                          mediaUrl={subService.images}
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
                  disabled={isLoadingCreate || isLoadingUpdate}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoadingCreate || isLoadingUpdate ? (
                    <Loader2 className="mx-auto animate-spin h-10 w-10" />
                  ) : (
                    buttonText
                  )}
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
        </>
      )}
    </div>
  );
};
