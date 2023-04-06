import React, { memo } from "react";
import dynamic from "next/dynamic";
const Sound1 = dynamic(() => import("./Sound1"));

const SoundComponent = {
  type_1: Sound1,
};
function Section45({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = SoundComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(Section45);
