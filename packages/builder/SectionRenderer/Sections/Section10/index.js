import React, { memo } from "react";
import dynamic from "next/dynamic";
const Testimonial1 = dynamic(() => import("./Testimonial1"));

const TetimonialComponent = {
  type_1: Testimonial1,
};
function Section5({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = TetimonialComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(Section5);
