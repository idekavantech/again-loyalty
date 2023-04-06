import React, { memo } from "react";
import dynamic from "next/dynamic";
const Faq1 = dynamic(() => import("./Faq1"));

const FaqComponent = {
  type_1: Faq1,
};
function section31({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = FaqComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(section31);
