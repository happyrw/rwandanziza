import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { MessageCirclePlus } from "lucide-react";

export function CommentSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-3 right-3 bg-white rounded-full p-2 shadow-md shadow-black cursor-pointer">
          <MessageCirclePlus />
        </div>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col h-full w-full"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>Share your thoughts below!</SheetDescription>
        </SheetHeader>
        {/* Comments Section */}
        <div className="flex-grow overflow-y-auto p-2 border rounded-md remove-scrollbar">
          {/* Replace the following with actual comments */}
          <div className="mb-2">
            <div className="flex items-center gap-3">
              <img
                src="/rwanda.png"
                alt="user-pic"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <p className="text-sm mt-[2px] font-bold">@happy</p>
                <p className="text-[10px]">1 min ago</p>
              </div>
            </div>
            <p className="my-2 text-sm font-sans">
              It seems like the input section at the bottom might not be
              positioned correctly or is being pushed out of view.
            </p>
            <hr className="mt-2 h-[1px] bg-black/50 mx-auto w-[100px]" />
            <div className="flex items-center justify-center gap-20 mt-2">
              <img
                src="/icons/heart.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
              <img
                src="/icons/copy.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
              <img
                src="/icons/share.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center gap-3">
              <img
                src="/create.jpg"
                alt="user-pic"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <p className="text-sm mt-[2px] font-bold">@happy</p>
                <p className="text-[10px]">1 min ago</p>
              </div>
            </div>
            <p className="my-2 text-sm font-sans">
              It seems like the input section at the bottom might not be
              positioned correctly or is being pushed out of view.
            </p>
            <hr className="mt-2 h-[1px] bg-black/50 mx-auto w-[100px]" />
            <div className="flex items-center justify-center gap-20 mt-2">
              <img
                src="/icons/heart.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
              <img
                src="/icons/copy.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
              <img
                src="/icons/share.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center gap-3">
              <img
                src="/rwanda.png"
                alt="user-pic"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <p className="text-sm mt-[2px] font-bold">@happy</p>
                <p className="text-[10px]">1 min ago</p>
              </div>
            </div>
            <p className="my-2 text-sm font-sans">
              It seems like the input section at the bottom might not be
              positioned correctly or is being pushed out of view.
            </p>
            <hr className="mt-2 h-[1px] bg-black/50 mx-auto w-[100px]" />
            <div className="flex items-center justify-center gap-20 mt-2">
              <img
                src="/icons/heart.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
              <img
                src="/icons/copy.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
              <img
                src="/icons/share.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center gap-3">
              <img
                src="/create.jpg"
                alt="user-pic"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <p className="text-sm mt-[2px] font-bold">@happy</p>
                <p className="text-[10px]">1 min ago</p>
              </div>
            </div>
            <p className="my-2 text-sm font-sans">
              It seems like the input section at the bottom might not be
              positioned correctly or is being pushed out of view.
            </p>
            <hr className="mt-2 h-[1px] bg-black/50 mx-auto w-[100px]" />
            <div className="flex items-center justify-center gap-20 mt-2">
              <img
                src="/icons/heart.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
              <img
                src="/icons/copy.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
              <img
                src="/icons/share.svg"
                alt="like-icon"
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* Input Section */}
        <div className="p-4 border-t flex items-center gap-2">
          <Input
            placeholder="Write your comment here..."
            className="flex-grow"
          />
          <Button type="button">Post</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
