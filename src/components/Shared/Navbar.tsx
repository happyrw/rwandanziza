import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import DashboardComponent from "../DashboardComponent";
import { NavigationSheet } from "./NavigationSheet";
import SearchField from "./SearchField";

const Navbar = async () => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0].emailAddress;
  const isAdmin = emailAddress === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-20 h-14 inset-x-0 top-0 w-full border-b border-blue-600 bg-white/75 backdrop-blur-lg transition-all px-3">
      <MaxWidthWrapper>
        <div className="flex h-full items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-[10px] md:text-sm lg:text-lg"
          >
            <Image
              src="/logo.png"
              alt="Rwandanziza logo"
              width={150}
              height={150}
              className="object-cover mt-2"
            />
          </Link>

          <SearchField className="hidden max-w-96 md:inline" />

          <div className="flex h-full lg:hidden items-center space-x-4">
            <NavigationSheet />
          </div>
          <div className="hidden h-full lg:flex items-center space-x-4">
            <Link href="/explore" className="hover:text-blue-700">
              Explore
            </Link>
            <SignedIn>
              <>
                <div className="h-8 w-px bg-blue-600 hidden md:block" />
                <SignOutButton />
                <DashboardComponent />
              </>
            </SignedIn>
            <SignedOut>
              <>
                <SignInButton />
                <div className="h-8 w-px bg-blue-600 block" />
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
