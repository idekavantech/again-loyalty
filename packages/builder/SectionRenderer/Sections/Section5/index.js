import React, { memo } from "react";
import dynamic from "next/dynamic";
const FeatureCard1 = dynamic(() => import("./FeatureCard1"));

const FeatureCardComponent = {
  type_1: FeatureCard1,
};
function Section5({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = FeatureCardComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(Section5);
