import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
function MapModal({
  position,
  updateLocation,
  openEditAddressModal,
  onzoomend,
  zoom,
}) {
  const mapOptions = {
    height: "400px",
    width: "100%",
    center: position,
    markers: [{ ...position, singleMarker: true }],
    ondrag: updateLocation,
    onzoomend,
    editMode: true,
    zoom,
  };

  return (
    <div>
      <div>
        <Map options={mapOptions} />
      </div>
      <div className="px-3 sticky-bottom mt-5">
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          onClick={openEditAddressModal}
        >
          Confirm and continue
        </Button>
      </div>
    </div>
  );
}
export default memo(MapModal);
