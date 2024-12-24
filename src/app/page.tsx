import HomeComponent from "@/components/HomeComponent";
import MaxWidthWrapper from "@/components/Shared/MaxWidthWrapper";

export default async function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10">
          <HomeComponent />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
