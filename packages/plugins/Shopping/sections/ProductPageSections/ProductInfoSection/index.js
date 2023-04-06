import React, { memo } from "react";
import dynamic from "next/dynamic";
const ProductInfo1 = dynamic(() => import("./ProductInfo1"));

const ProductInfoComponent = {
  type_1: ProductInfo1,
};
function ProductInfo({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = ProductInfoComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(ProductInfo);
