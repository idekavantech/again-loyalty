import React, { memo } from "react";
import dynamic from "next/dynamic";
const Slider1 = dynamic(() => import("./Slider1"));

const SliderComponent = {
  type_1: Slider1,
};
function Section45({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = SliderComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(Section45);
