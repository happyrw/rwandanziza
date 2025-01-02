import DialogComponent from "@/components/CreatePost/dialog";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { fetchPostByUserId } from "@/lib/appwrite/api";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const Dashboard = async () => {
  const user = await currentUser();
  const data = await fetchPostByUserId(user?.id ?? "");

  const username = user?.username;

  return (
    <main>
      {data.total === 0 ? (
        <div className="h-[calc(100vh-120px)]">
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
        </div>
      ) : (
        <div className="p-2 md:px-5">
          <div className="flex items-center justify-between overflow-x-hidden">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                {username ? username : "Fumbwe"}&apos;s Posts
              </h1>
              <p className="mt-2 text-sm">
                View, edit, or delete your posts here.
              </p>
            </div>
            <DialogComponent />
          </div>
          <div className="w-[100vw] overflow-y-auto">
            <DataTable columns={columns} data={data.documents as any} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
