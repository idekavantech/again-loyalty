import React, { memo } from "react";
import dynamic from "next/dynamic";
const ProductDetail1 = dynamic(() => import("./ProductDetail1"));

const ProductDetailComponent = {
  type_1: ProductDetail1,
};
function ProductDetail({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = ProductDetailComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(ProductDetail);
