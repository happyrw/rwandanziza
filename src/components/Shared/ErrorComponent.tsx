import { TriangleAlert } from "lucide-react";
import React from "react";

const ErrorComponent = ({ text }: { text: string }) => {
  if (!text) {
    return null;
  }
  return (
    <div className="flex items-center justify-center flex-col h-[300px] gap-2">
      <TriangleAlert className="h-10 w-10 text-red-700" />
      <p className="text-center font-bold">{text}</p>
    </div>
  );
};

export default ErrorComponent;
