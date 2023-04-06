import React, { memo } from "react";
import dynamic from "next/dynamic";
const AboutUs1 = dynamic(() => import("./AboutUs1"));

const AboutUsComponent = {
  type_1: AboutUs1,
};
function AboutUs({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = AboutUsComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(AboutUs);
