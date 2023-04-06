import React from "react";
import dynamic from "next/dynamic";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });

function LocationSection({ themeColor, business }) {
  const { latitude, longitude } = business;
  const position = { latitude, longitude, singleMarker: true };
  const {minWidth768} = useResponsive()

  const mapOptions = {
    center: position,
    markers: [position],
    themeColor,
    zoom: 13,
    dragging: minWidth768,
  };
  if (minWidth768)
    return (
      <Map
        className="faded-map"
        options={{ ...mapOptions, width: "100%", height: "100%" }}
      />
    );
  return (
    <Map
      className="faded-map"
      options={{ ...mapOptions, width: "100%", height: "150%" }}
    />
  );
}

export default LocationSection;
