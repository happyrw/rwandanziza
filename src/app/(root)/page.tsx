import HomeP from "@/components/Home";
import ModifiedHome from "@/components/ModifiedHome";
import MaxWidthWrapper from "@/components/Shared/MaxWidthWrapper";

export default async function Home() {
  return (
    <div className="grainy-light">
      <div className="pb-2 mx-auto max-w-screen-xl">
        {/* <HomeP /> */}
        <ModifiedHome />
      </div>
    </div>
  );
}
