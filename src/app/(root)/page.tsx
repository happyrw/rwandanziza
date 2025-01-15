import GoogleMapView from "@/components/Map/GoogleMap";
import ModifiedHome from "@/components/ModifiedHome";
export default async function Home() {
  return (
    <div className="grainy-light">
      <div className="pb-2 mx-auto max-w-screen-xl">
        {/* <HomeP /> */}
        <ModifiedHome />
        {/* <OpenLayersMap /> */}
        {/* <GoogleMapView /> */}
      </div>
    </div>
  );
}
