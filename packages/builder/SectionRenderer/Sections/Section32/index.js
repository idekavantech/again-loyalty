import React, { memo } from "react";
import dynamic from "next/dynamic";
const BannerWithSlider1 = dynamic(() => import("./BannerWithSlider1"));

const BannerWithSliderComponent = {
  type_1: BannerWithSlider1,
};
function section32({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = BannerWithSliderComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(section32);
