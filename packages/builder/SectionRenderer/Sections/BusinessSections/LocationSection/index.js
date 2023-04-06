import React, { memo } from "react";
import dynamic from "next/dynamic";
const Location1 = dynamic(() => import("./Location1"));

const LocationComponent = {
  type_1: Location1,
};
function LocationSection({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = LocationComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(LocationSection);
