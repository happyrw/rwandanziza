import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const DialogComponent = () => {
  const dashboardHiddenToken = process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN;
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="mt-5 px-20 bg-black rounded-md text-white py-2 flex gap-5">
            Add now <Plus />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What are you creating ?</DialogTitle>
            <div>
              <Link
                className="mt-5 px-2 w-full flex justify-between bg-black rounded-md text-white py-2"
                href={`/create?category=event&dash=${dashboardHiddenToken}`}
              >
                Province <Plus />
              </Link>
              <Link
                className="mt-5 px-2 w-full flex justify-between bg-black rounded-md text-white py-2"
                href={`/create?category=district&dash=${dashboardHiddenToken}`}
              >
                District <Plus />
              </Link>
              <Link
                className="mt-5 px-2 w-full flex justify-between bg-black rounded-md text-white py-2"
                href={`/create?category=economic&dash=${dashboardHiddenToken}`}
              >
                Economic activity <Plus />
              </Link>
              <Link
                className="mt-5 px-2 w-full flex justify-between bg-black rounded-md text-white py-2"
                href={`/create?category=event&dash=${dashboardHiddenToken}`}
              >
                Event <Plus />
              </Link>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogComponent;
