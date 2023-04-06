import React, { memo } from "react";
import dynamic from "next/dynamic";
const ProductsListType1 = dynamic(() => import("./ProductsListType1"));
const ProductsListType2 = dynamic(() => import("./ProductsListType2"));
const ProductsListType3 = dynamic(() => import("./ProductsListType3"));

const productsSectionLayoutComponents = {
  type_1: ProductsListType1,
  type_2: ProductsListType3,
  type_3: ProductsListType2,
};
function Section36({ customization, ...props }) {
  if (!customization) {
    return null;
  }
  const Comp = productsSectionLayoutComponents[customization.layout.type];
  return <Comp customization={customization} {...props} />;
}

export default memo(Section36);
