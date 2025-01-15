"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { X } from "lucide-react";

const GoogleMapView = ({ isHotel }: { isHotel: boolean }) => {
  const [userLocation, setUserLocation] = useState<any | undefined>();
  const [target, setTarget] = useState<any | undefined>();
  const [showMap, setShowMap] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  // Fetch user's location
  useEffect(() => {
    const fetchUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error fetching user location:", error);
            alert(
              "Unable to retrieve your location. Please enable location services."
            );
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocation();
  }, []);

  const mapCenter = target || userLocation;

  return (
    <div>
      {isHotel ? (
        <span
          onClick={() => setShowMap(true)}
          className="block  text-blue-600 underline text-[12px] font-bold cursor-pointer -mt-3 md:mt-0"
        >
          Show on map
        </span>
      ) : (
        <span
          onClick={() => setShowMap(true)}
          className="block  text-blue-600 underline text-[12px] font-bold cursor-pointer"
        >
          Show on map
        </span>
      )}
      {showMap && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black/50 flex items-center justify-center pt-2 pb-2 md:pt-20 px-2">
          <div className="relative w-full lg:w-[900px] bg-white h-full md:h-[35rem] mx-auto">
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-2 right-2 cursor-pointer bg-white shadow-blue-400 z-10 shadow-lg p-2 rounded-full"
            >
              <X />
            </button>
            <div className="flex flex-col">
              <div className="ml-auto w-full h-full">
                <LoadScript
                  googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
                  mapIds={["e7cb091d37acc104"]}
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={10}
                  >
                    {userLocation && <MarkerF position={userLocation} />}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapView;
