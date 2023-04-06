import React, { memo } from "react";
import dynamic from "next/dynamic";
const ShoppingHeader1 = dynamic(() => import("./ShoppingHeader1"));
const ShoppingHeader2 = dynamic(() => import("./ShoppingHeader2"));
const ShoppingHeader3 = dynamic(() => import("./ShoppingHeader3"));

const ShoppingHeaderComponent = {
  type_1: ShoppingHeader1,
  type_2: ShoppingHeader2,
  type_3: ShoppingHeader3,
};
function ShoppingHeader({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = ShoppingHeaderComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(ShoppingHeader);
