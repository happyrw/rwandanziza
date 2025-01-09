import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchField from "./SearchField";
import DashboardComponent from "../DashboardComponent";

export async function NavigationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <img src="/icons/menu.svg" alt="menu" width={30} height={30} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[70%] p-4">
        <span tabIndex={0} />
        <SheetHeader>
          <SheetTitle>
            <SignedIn>User Menu</SignedIn>
            <SignedOut>Welcome</SignedOut>
          </SheetTitle>
          <SheetDescription>
            <SignedIn>Access your account options here.</SignedIn>
            <SignedOut>Sign in or create an account to get started.</SignedOut>
          </SheetDescription>
        </SheetHeader>
        <SearchField className="w-full mt-4 mb-6" />
        <div className="grid gap-4 py-6 border-t border-b my-4 px-4 border-gray-200 rounded-lg">
          <Link
            href="/explore"
            className="w-full text-center bg-gray-100 hover:bg-gray-200 rounded-md py-2"
          >
            Explore
          </Link>
          <SignedIn>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <div className="flex flex-col gap-3">
                  <DashboardComponent />
                </div>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="default" className="w-full">
                  Profile
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <div className="bg-red-700 text-white font-bold py-2 flex items-center justify-center gap-5 rounded-md">
                  <LogOut /> <SignOutButton />
                </div>
              </SheetClose>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Button asChild variant="default" className="w-full">
                  <SignInButton />
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full">
                  <SignUpButton />
                </Button>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full border">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
