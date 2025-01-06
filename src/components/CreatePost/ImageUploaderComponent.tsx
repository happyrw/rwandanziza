import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { Loader2, X } from "lucide-react";
import { createFile, deleteFile } from "@/lib/appwrite/api"; // Adjust the import path as necessary

type FileUploadProps = {
  fieldChange: (files: File[], urls: string[]) => void; // Updated to pass URLs
  mediaUrl: any; // Expecting an array of image URLs
};

const ImageUploaderComponent = ({ fieldChange, mediaUrl }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [fileUrls, setFileUrls] =
    useState<{ id: string; url: string }[]>(mediaUrl); // Changed to store objects with id and url

  useEffect(() => {
    if (mediaUrl && Array.isArray(mediaUrl)) {
      const formattedUrls = mediaUrl.map((url: string) => {
        if (typeof url === "string") {
          const parts = url.split("/");
          const fileIndex = parts.indexOf("files") + 1;
          const id = parts[fileIndex]; // Extract the ID correctly
          return { url, id };
        }
        return { url: null, id: null };
      });
      setFileUrls(formattedUrls as any);
    }
  }, [mediaUrl]);

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      setUploading(true);
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);

      // Upload files to Appwrite
      const newFileInfo = await createFile(acceptedFiles);
      if (!newFileInfo) return;

      // Combine old and new file URLs
      const allFileUrls = [...fileUrls, ...newFileInfo];
      setFileUrls(allFileUrls);

      // Pass the URLs (not the local file objects) to `fieldChange`
      fieldChange(
        newFiles,
        allFileUrls.map((file) => file.url)
      ); // Pass only the URLs
      setUploading(false);
    },
    [files, fileUrls, fieldChange, mediaUrl]
  );

  const handleRemoveFile = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploading(true); // Start uploading status

    const fileIdToDelete = fileUrls[index]?.id;
    if (fileIdToDelete) {
      const deleteSuccess = await deleteFile(fileIdToDelete);

      if (deleteSuccess) {
        const updatedFiles = files.filter((_, i) => i !== index);
        const updatedFileUrls = fileUrls.filter((_, i) => i !== index);

        setFiles(updatedFiles);
        setFileUrls(updatedFileUrls);

        // Trigger fieldChange with updated URLs
        fieldChange(
          updatedFiles,
          updatedFileUrls.map((file) => file.url)
        );
      } else {
        console.log("Failed to delete the file from storage.");
      }
    }
    setUploading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    multiple: true, // Allow multiple files
  });

  return (
    <div
      {...getRootProps()}
      className="relative mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 sm:text-sm"
    >
      <input {...getInputProps()} />
      {fileUrls.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-center gap-2 p-7 h-80 lg:h-[300px] overflow-y-auto remove-scrollbar">
            {fileUrls.map((file, index) => (
              <div key={index} className="relative w-20 h-20 rounded-[24px]">
                <img
                  src={file.url} // Access URL from the object
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover object-top rounded-[24px] border-[5px] border-blue-500"
                />
                <button
                  type="button"
                  onClick={(e) => handleRemoveFile(index, e)}
                  className="absolute -top-1 -right-1 bg-red-700 p-1 rounded-full"
                >
                  <X className="h-[12px] w-[12px] text-white" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-light-4 text-center small-regular w-full p-4 border-t border-t-dark-4 cursor-pointer">
            Click or drag photos to add
          </p>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col p-7 h-80 lg:h-[300px]">
          <img
            src="/icons/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />
          <h3 className="text-[16px] font-medium leading-[140%] text-light-2 mb-2 mt-6">
            Drag photos here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button
            type="button"
            className="h-12 bg-dark-3 px-5 text-light-1 flex gap-2 hover:text-white"
          >
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

export default ImageUploaderComponent;
