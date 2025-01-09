import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2, X } from "lucide-react";
import { createFile, deleteFile } from "@/lib/appwrite/api";
import { Button } from "@/components/ui/button";

const ProfileUpload = ({
  fieldChange,
  mediaUrl,
}: {
  fieldChange: (url: string) => void;
  mediaUrl?: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(mediaUrl || null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setUploading(true);
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);

        // Upload the file
        const fileInfo = await createFile([selectedFile]); // Assume this returns an object with `url` and `id`
        if (fileInfo && fileInfo[0]?.url) {
          setFileUrl(fileInfo[0].url);
          fieldChange(fileInfo[0].url);
        }

        setUploading(false);
      }
    },
    [fieldChange]
  );

  const handleRemoveFile = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileUrl) {
      setUploading(true);
      const parts = fileUrl.split("/");
      const fileId = parts[parts.indexOf("files") + 1]; // Extract the file ID
      const deleteSuccess = await deleteFile(fileId);

      if (deleteSuccess) {
        setFile(null);
        setFileUrl(null);
        fieldChange(""); // Clear the field value
      }
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    multiple: false, // Only allow one file
  });

  return (
    <div
      {...getRootProps()}
      className="relative mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 sm:text-sm"
    >
      <input {...getInputProps()} />
      {fileUrl ? (
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={fileUrl}
            alt="Uploaded Profile"
            className="w-full h-full object-cover rounded-full border-2 border-blue-500"
          />
          <button
            type="button"
            onClick={handleRemoveFile}
            className="absolute -top-1 -right-1 bg-red-700 p-1 rounded-full"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-7 h-32">
          <img
            src="/icons/file-upload.svg"
            alt="Upload Icon"
            width={64}
            height={64}
          />
          <p className="text-sm text-gray-500 mt-2">
            Drag or click to upload an image
          </p>
          <Button type="button" className="mt-2">
            Select from computer
          </Button>
        </div>
      )}
      {uploading && (
        <div className="absolute h-full bg-white/85 w-full top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
