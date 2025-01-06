import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import SearchField from "./SearchField";
import { NavigationSheet } from "./NavigationSheet";
import DashboardComponent from "../DashboardComponent";

const Navbar = async () => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0].emailAddress;
  const isAdmin = emailAddress === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-20 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all px-3">
      <MaxWidthWrapper>
        <div className="flex h-full items-center justify-between border-b border-zinc-200 remove-scrollbar">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-[10px] md:text-sm lg:text-lg"
          >
            <Image
              src="/rwanda.png"
              alt={`Rwandanziza logo ${" "}`}
              width={30}
              height={30}
            />
            <span className="text-lg font-bold">
              Rwanda<span className="text-green-600">nziza</span>
            </span>
          </Link>

          <SearchField className="hidden max-w-96 md:inline" />

          <div className="flex h-full lg:hidden items-center space-x-4">
            <NavigationSheet />
          </div>
          <div className="hidden h-full lg:flex items-center space-x-4">
            <Link href="/explore">Explore</Link>
            <SignedIn>
              <>
                <div className="h-8 w-px bg-zinc-200 hidden md:block" />
                <SignOutButton />
                <DashboardComponent />
              </>
            </SignedIn>
            <SignedOut>
              <>
                <SignInButton />
                <div className="h-8 w-px bg-zinc-200 block" />
                <div className="flex">
                  <SignUpButton />
                </div>
              </>
            </SignedOut>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
