"use client";

import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

const PageLoader = ({ children }: { children: React.ReactNode }) => {
  const [pageOn, setPageOn] = useState(false);

  return (
    <>
      <div onClick={() => setPageOn(true)}>{children}</div>
      {pageOn && (
        <div className="flex items-center h-screen justify-center bg-white z-[99999] fixed top-0 bottom-0 right-0 left-0">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default PageLoader;
