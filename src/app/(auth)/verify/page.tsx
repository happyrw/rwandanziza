"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { saveUserToDB } from "@/lib/appwrite/api";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const performCheck = async () => {
      const data = await saveUserToDB();
      if (data && data.success) {
        router.push("/");
      }
    };

    performCheck();
  }, [router]);

  return (
    <div className="w-full mt-24 flex justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
