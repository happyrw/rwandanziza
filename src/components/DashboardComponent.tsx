"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/AuthContext";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const DashboardComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  const { user } = useUserContext();

  return (
    <div className="">
      <div className="flex lg:hidden">
        {!isDashboard && (
          <Link
            href="/dashboard?dash=74c4f6ad5bd3b882a83180e277a316074902179a1b0f7a8ed1684476ddbd23b2"
            className={buttonVariants({
              size: "sm",
              className: "flex items-center gap-1 w-full lg:w-fit",
            })}
          >
            Dashboard ✨
            <ArrowRight className="ml-1.5 h-5 w-5" />
          </Link>
        )}
        {isDashboard && (
          <Link
            href="/"
            className={buttonVariants({
              size: "sm",
              className: "flex items-center gap-1 w-full lg:w-fit",
            })}
          >
            <ArrowLeft className="mr-1.5 h-5 w-5" />
            Back
          </Link>
        )}
      </div>
      <div className="relative hidden lg:flex">
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="cursor-pointer"
        >
          {user?.profile ? (
            <img
              src={user?.profile}
              alt="profile"
              className="w-[30px] h-[30px] rounded-full"
            />
          ) : (
            <img
              src="/icons/profile-placeholder.svg"
              alt="profile"
              className="w-[30px] h-[30px] rounded-full"
            />
          )}
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-12 w-48 bg-white border border-gray-200 shadow-md rounded-lg p-2 transition-all duration-300 ease-in-out">
            <p className="text-gray-800 text-[13px] font-semibold px-4 py-2 text-nowrap">
              {user?.name || "User"}
            </p>
            <hr className="my-2" />
            <Link href="/dashboard?dash=74c4f6ad5bd3b882a83180e277a316074902179a1b0f7a8ed1684476ddbd23b2">
              <div className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                Dashboard
              </div>
            </Link>
            <Link href="/profile">
              <div className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                Profile
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardComponent;
