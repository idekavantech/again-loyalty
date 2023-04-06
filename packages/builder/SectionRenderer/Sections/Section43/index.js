import React, { memo } from "react";
import dynamic from "next/dynamic";

const Type1 = dynamic(() => import("./Type1"));
const Type2 = dynamic(() => import("./Type2"));
const Type3 = dynamic(() => import("./Type3"));

const Component = {
  type_1: Type1,
  type_2: Type2,
  type_3: Type3,
};

function Section43({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = Component[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(Section43);
