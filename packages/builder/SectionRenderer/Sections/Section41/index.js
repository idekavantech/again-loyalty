import React, { memo } from "react";
import dynamic from "next/dynamic";
const Banner1 = dynamic(() => import("./Banner1"));
const Banner2 = dynamic(() => import("./Banner2"));
const Banner3 = dynamic(() => import("./Banner3"));
const Banner4 = dynamic(() => import("./Banner4"));

const BannerComponent = {
  type_1: Banner1,
  type_2: Banner2,
  type_3: Banner3,
  type_4: Banner4,
};
function Section41({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = BannerComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(Section41);
