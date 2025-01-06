import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Shared/Sidebar";

export function SidebarSheet({ category }: { category: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the state (open/close)
  const toggleSheet = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="flex md:hidden bg-black rounded-sm cursor-pointer">
          <ChevronDown className="-rotate-90 text-white h-5 w-5" />
        </div>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col h-full w-[80%]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Sidebar</SheetTitle>
        </SheetHeader>
        <div className="sticky top-16 h-screen border rounded-lg p-4 overflow-y-auto remove-scrollbar">
          <div onClick={toggleSheet}>
            <Sidebar selectedCategory={category} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
