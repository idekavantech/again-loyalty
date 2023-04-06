import React, { memo } from "react";
import dynamic from "next/dynamic";
const OnlineMenu1 = dynamic(() => import("./OnlineMenu1"));
const OnlineMenu2 = dynamic(() => import("./OnlineMenu2"));

const OnlineMenuComponent = {
  type_1: OnlineMenu1,
  type_2: OnlineMenu2,
};
function OnlineMenu({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = OnlineMenuComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(OnlineMenu);
