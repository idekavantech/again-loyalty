import React, { memo } from "react";
import dynamic from "next/dynamic";
const Text1 = dynamic(() => import("./Text1"));

const TextComponent = {
  type_1: Text1,
};
function section26({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = TextComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(section26);
