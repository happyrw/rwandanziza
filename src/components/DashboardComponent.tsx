"use client";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

const DashboardComponent = () => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  return (
    <div>
      {/* Show "Dashboard" button if not on the dashboard URL */}
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

      {/* Show "Back" button if on the dashboard URL */}
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
  );
};

export default DashboardComponent;
