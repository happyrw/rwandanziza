"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { formatDateTime, formatLikes, formatTimeAgo } from "@/lib/utils";
import Image from "next/image";
import DeleteDialog from "./delete-dialog";
import { useRouter } from "next/navigation";

const dashboardHiddenToken = process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN;

export const columns: ColumnDef<any>[] = [
  {
    header: "ID",
    cell: ({ row }) => (
      <p className="text-[14px] leading-[18px] font-medium">{row.index + 1}</p>
    ),
  },
  {
    accessorKey: "title",
    header: "Project",
    cell: ({ row }) => {
      const image = row.original.images[0];
      return (
        <div className="flex items-center gap-3 flex-nowrap min-w-[240px] max-w-[240px] overflow-hidden">
          <Image
            src={image}
            alt="post-image"
            width={100}
            height={100}
            className="size-10 rounded-full"
          />
          <div className="flex flex-col justify-center max-w-[140px]">
            {/* Added truncate styles */}
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {row.original.title}
            </p>
            <p className="text-[10px]">
              {formatTimeAgo(row.original.$createdAt)}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "$createdAt", // Replace with the actual key for the creation date in your data
    header: "Created On", // Column header
    cell: ({ row }) => (
      <p className="text-[14px] leading-[18px] font-normal min-w-[100px] text-nowrap">
        {formatDateTime(row.original.$createdAt).dateTime}
      </p>
    ),
    meta: {
      className: "hidden sm:table-cell", // Add this class to hide the column on small screens
    },
  },
  {
    accessorKey: "likes",
    header: "Likes",
    cell: ({ row }) => (
      <p className="text-[14px] leading-[18px] font-medium text-gray-800 text-nowrap">
        {formatLikes(row.original.likes.length)}
      </p>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <p className="text-[14px] leading-[18px] text-gray-600 text-nowrap font-bold capitalize">
        {row.original.category}
      </p>
    ),
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-10 w-10 p-0 flex justify-center items-center"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="flex flex-col gap-2 px-4 py-2 bg-white shadow-lg rounded-lg border border-gray-200"
          >
            <Button
              type="button"
              variant="ghost"
              className="text-sm flex items-center gap-2 hover:bg-gray-100 rounded-md p-2"
              onClick={() =>
                router.push(
                  `/post?postId=${row.original.$id}&category=${row.original.category}&dash=${dashboardHiddenToken}`
                )
              }
            >
              <Eye className="h-4 w-4 text-gray-600" />
              View Post
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              className="text-sm flex items-center gap-2 hover:bg-gray-100 rounded-md p-2"
              onClick={() =>
                router.push(
                  `/create?category=${row.original.category}&dash=${dashboardHiddenToken}&productId=${row.original.$id}`
                )
              }
            >
              <Pencil className="h-4 w-4 text-gray-600" />
              Edit Post
            </Button>

            <DeleteDialog
              postId={row.original.$id}
              category={row.original.category}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
