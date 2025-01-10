"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getUserFromDB, saveUserToDB } from "@/lib/appwrite/api";
import ProfileUpload from "./profileUpload";
import { useUserContext } from "@/context/AuthContext";

export type IUserData = {
  name: string;
  username: string;
  profile: string;
};

const Page = () => {
  const router = useRouter();
  const [showOnBoarding, setShowOnBoarding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    name: "",
    username: "",
    profile: "",
  });

  const { user: contextUser, setUser } = useUserContext();

  useEffect(() => {
    const performCheck = async () => {
      try {
        const response = await getUserFromDB();

        const user = response?.documents?.[0];
        if (!user || !(user as any).onboarded) {
          setShowOnBoarding(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to check user data. Please try again.");
      }
    };
    performCheck();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.name || !userData.username || !userData.profile) {
      alert("All fields are required, including the profile image.");
      return;
    }

    setIsSubmitting(true);

    try {
      const userResult = await saveUserToDB(userData);
      if (userResult) {
        setUser({
          id: userResult.$id,
          name: userResult.name,
          username: userResult.username,
          email: userResult.email,
          profile: userResult.imageProfile,
        });
        setShowOnBoarding(false);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        alert("Failed to save user. Please try again.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 w-full h-screen pt-3 lg:pt-20">
      {!showOnBoarding && (
        <div className="w-full flex justify-center h-screen">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            <h3 className="font-semibold text-xl">Logging you in...</h3>
            <p>You will be redirected automatically.</p>
          </div>
        </div>
      )}
      {showOnBoarding && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 w-full max-w-md mx-auto bg-gray-100 rounded shadow"
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="profile"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Upload Profile Image
            </label>
            <ProfileUpload
              fieldChange={(url: string) =>
                setUserData((prev) => ({ ...prev, profile: url }))
              }
              mediaUrl={userData.profile} // Pass the current profile URL if available
            />
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Email (Optional/Disabled for now) */}
          {/* <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              disabled
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Page;
