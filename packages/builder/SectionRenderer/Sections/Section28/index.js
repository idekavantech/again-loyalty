import React, { memo } from "react";
import dynamic from "next/dynamic";
const Title1 = dynamic(() => import("./Title1"));

const TitleComponent = {
  type_1: Title1,
};
function section26({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = TitleComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(section26);
