import MaxWidthWrapper from "@/components/Shared/MaxWidthWrapper";

export default async function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10">
          <p className="text-center mt-20 bg-blue-500 py-10">
            welcome to Rwandanziza website
          </p>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
