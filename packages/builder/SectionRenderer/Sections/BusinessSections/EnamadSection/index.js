import React, { memo } from "react";
import dynamic from "next/dynamic";
const Enamad1 = dynamic(() => import("./Enamad1"));

const EnamadComponent = {
  type_1: Enamad1,
};
function Enamad({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = EnamadComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(Enamad);
