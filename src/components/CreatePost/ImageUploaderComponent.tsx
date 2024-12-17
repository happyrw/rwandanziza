import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type FileUploadProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string[]; // Expecting an array of image URLs
};

const ImageUploaderComponent = ({ fieldChange, mediaUrl }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]); // Change state to hold multiple files
  const [fileUrls, setFileUrls] = useState<string[]>(mediaUrl); // Change state to hold multiple file URLs

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      fieldChange(newFiles);

      const newFileUrls = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setFileUrls((prevUrls) => [...prevUrls, ...newFileUrls]);
    },
    [files, fieldChange]
  );

  // Remove file handler
  const handleRemoveFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Remove the file and its corresponding URL
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedFileUrls = fileUrls.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setFileUrls(updatedFileUrls);
    fieldChange(updatedFiles); // Inform the parent component of the change
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
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 sm:text-sm"
    >
      <input {...getInputProps()} />
      {fileUrls.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-center gap-4 p-7 h-80 lg:h-[300px] overflow-y-auto remove-scrollbar">
            {fileUrls.map((url, index) => (
              <div
                key={index}
                className="relative w-20 h-20 bg-dark-4 rounded-[24px]"
              >
                <img
                  src={url}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover object-top rounded-[24px] border border-blue-500"
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
    </div>
  );
};

export default ImageUploaderComponent;
