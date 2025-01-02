import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import Link from "next/link";

const DialogComponent = () => {
  const dashboardHiddenToken = process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN;
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="text-nowrap bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 rounded-md flex gap-2 text-sm">
            Add now <Plus className="h-5 w-5" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What are you creating ?</DialogTitle>
            <div>
              <Link
                className="mt-5 px-2 w-full flex justify-between bg-black rounded-md text-white py-2"
                href={`/create?category=province&dash=${dashboardHiddenToken}`}
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
              <Link
                className="mt-5 px-2 w-full flex justify-between bg-black rounded-md text-white py-2"
                href={`/create?category=news&dash=${dashboardHiddenToken}`}
              >
                News <Plus />
              </Link>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogComponent;
