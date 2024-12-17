import DialogComponent from "@/components/CreatePost/dialog";
import Image from "next/image";

const Dashboard = () => {
  return (
    <main className="h-[calc(100vh-120px)]">
      <div className="flex items-center justify-center flex-col h-full">
        <Image
          src="/empty.png"
          alt="empty"
          width={1000}
          height={1000}
          className="w-[10rem] h-[10rem] object-cover"
        />
        <p className="font-sans font-bold text-sm text-black/50">
          You have an empty working space
        </p>
        <DialogComponent />
      </div>
    </main>
  );
};

export default Dashboard;
