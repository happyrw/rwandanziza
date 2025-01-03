import { Button, buttonVariants } from "@/components/ui/button";
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
import { ArrowRight, LogOut } from "lucide-react";
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
      <SheetContent>
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
        <div className="grid gap-4 py-6">
          <SearchField className="w-full" />
          <SheetClose asChild>
            <Link
              href="/explore"
              className="w-full text-center bg-black/15 rounded-md py-2"
            >
              Explore
            </Link>
          </SheetClose>
          <SignedIn>
            <div className="flex flex-col gap-3">
              <DashboardComponent />
              <Button disabled variant="default" className="w-full">
                Profile
              </Button>
              <div className="bg-red-700 text-white font-bold py-2 flex items-center justify-center gap-5 rounded-md">
                <LogOut /> <SignOutButton />
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <Button asChild variant="default" className="w-full">
                <SignInButton />
              </Button>
              <Button asChild variant="outline" className="w-full">
                <SignUpButton />
              </Button>
            </div>
          </SignedOut>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
