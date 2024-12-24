import { FallingLines } from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <div className="absolute z-50 h-screen w-full flex items-center justify-center bg-white">
      <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        //@ts-ignore
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};

export default LoaderComponent;
