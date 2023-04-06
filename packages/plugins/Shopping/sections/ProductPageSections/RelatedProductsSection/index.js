import React, { memo } from "react";
import dynamic from "next/dynamic";
const RelatedProducts1 = dynamic(() => import("./RelatedProducts1"));

const RelatedProductsComponent = {
  type_1: RelatedProducts1,
};
function relatedProducts({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = RelatedProductsComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(relatedProducts);
