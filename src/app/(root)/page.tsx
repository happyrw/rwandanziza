import HomeP from "@/components/Home";
import MaxWidthWrapper from "@/components/Shared/MaxWidthWrapper";

export default async function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <MaxWidthWrapper className="pb-2">
        <HomeP />
      </MaxWidthWrapper>
    </div>
  );
}
