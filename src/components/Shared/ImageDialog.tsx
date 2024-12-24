import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ImageDialog = ({ Images }: { Images: string[] }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {/* Open Dialog Button */}
      <button
        onClick={() => setShow(true)}
        className="flex items-center justify-center absolute w-[50px] h-[50px] bg-white border border-sky-600 text-sky-600 rounded-full top-1/2 right-2"
      >
        <ChevronRight className="w-10 h-10 font-bold" />
      </button>

      {/* Dialog Content */}
      {show && (
        <div className="fixed z-50 bg-black/50 p-2 md:p-20 right-0 left-0 bottom-0 top-0 w-full">
          <div className="max-w-screen-md bg-white p-4 w-full md:w-2/3 mx-auto h-full overflow-y-auto rounded-md remove-scrollbar shadow-lg shadow-white relative">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Images</h2>
              <button
                onClick={() => setShow(false)}
                className="text-gray-700 text-2xl font-bold focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 md:gap-3 remove-scrollbar">
              {Images.map((image: string, index: number) => (
                <Zoom key={index}>
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-x-95 transition-transform duration-200"
                  />
                </Zoom>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDialog;
