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
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, LogOut } from "lucide-react";
import { useState } from "react";
import SearchField from "./SearchField";
import Link from "next/link";

export async function NavigationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <img src="/icons/menu.svg" alt="menu" width={30} height={30} />
        </Button>
      </SheetTrigger>
      <SheetContent>
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
          <SignedIn>
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard?dash=74c4f6ad5bd3b882a83180e277a316074902179a1b0f7a8ed1684476ddbd23b2"
                className={buttonVariants({
                  size: "sm",
                  className: "flex items-center gap-1 font-bold py-2",
                })}
              >
                Dashboard ✨
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
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
