import React, { memo } from "react";
import dynamic from "next/dynamic";
const QuickAccess1 = dynamic(() => import("./QuickAccess1"));

const QuickAccessComponent = {
  type_1: QuickAccess1,
};
function section34({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = QuickAccessComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(section34);
