import React, { memo } from "react";
import dynamic from "next/dynamic";
const CounterCard1 = dynamic(() => import("./CounterCard1"));

const CounterCardComponent = {
  type_1: CounterCard1,
};
function section30({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = CounterCardComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(section30);
