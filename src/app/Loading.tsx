import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div>
      <div className="flex justify-center items-center gap-2">
        <img
          src="/rwanda.jpg"
          alt="rwandan flag"
          className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px] object-cover rounded-full"
        />
        <p className="text-4xl mt-4 lg:mt-10">
          RWANDA<span className="text-green-600">nziza</span>
        </p>
      </div>
      <Loader2 className="mx-auto animate-spin h-10 w-10" />
    </div>
  );
}
