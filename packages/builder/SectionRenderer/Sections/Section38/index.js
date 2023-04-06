import React, { memo } from "react";
import dynamic from "next/dynamic";
const SpecialBanner1 = dynamic(() => import("./SpecialBanner1"));

const SpecialBannerSectionLayoutComponents = {
  type_1: SpecialBanner1,
};
function Section38({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = SpecialBannerSectionLayoutComponents[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(Section38);
