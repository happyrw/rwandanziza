"use client";

import { X } from "lucide-react";
import React, { useState } from "react";

const BannerComponent = () => {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="hidden md:flex w-full md:min-w-[42rem] max-w-[42rem]  flex-col md:flex-row bg-emerald-700/15 text-emerald-700 mx-auto md:py-2 justify-center items-center gap-2 md:gap-10 rounded-[0_0_50px_50px]">
      <p className="text-center font-bold font-sans capitalize text-sm">
        Create what can make visitor eyes fail to resist, when looking at.
      </p>
      <X
        className="h-4 w-4 cursor-pointer font-bold"
        onClick={() => setHidden(true)}
      />
    </div>
  );
};

export default BannerComponent;
