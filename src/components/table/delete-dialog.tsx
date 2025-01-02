"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useDeletePost } from "@/lib/react-query/queriesAndMutations";
import Loading from "@/app/Loading";

const DeleteDialog = ({
  postId,
  category,
}: {
  postId: string;
  category: string;
}) => {
  const [open, setOpen] = useState(false);

  const { mutate: deletePost, isPending: loading } = useDeletePost();

  const handleDelete = (id: string) => {
    const confirmDelete = confirm(
      `This can be your last chance to keep the post.`
    );

    if (!confirmDelete) {
      setOpen(false);
      return;
    }

    deletePost(
      { postId: id },
      {
        onSuccess: () => {
          setOpen(false);
          window.location.reload();
        },
        onError: (error) => {
          console.error("Error deleting post:", error);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="destructive"
          className="text-sm flex items-center gap-2"
        >
          <Trash className="h-4 w-4 text-white" /> Delete Post
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            This action cannot be undone. This will permanently delete your post
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="button"
            variant="ghost"
            className="text-sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="text-sm"
            onClick={() => handleDelete(postId)}
            disabled={loading}
          >
            {loading ? <Loading /> : "Yes, Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
