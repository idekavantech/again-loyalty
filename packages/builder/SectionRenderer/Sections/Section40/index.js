import React, { memo } from "react";
import dynamic from "next/dynamic";
const FeaturedCategories1 = dynamic(() => import("./FeaturedCategories1"));
const FeaturedCategories2 = dynamic(() => import("./FeaturedCategories2"));

const FeaturedCategoriesComponent = {
  type_1: FeaturedCategories1,
  type_2: FeaturedCategories2,
};
function Section40({ customization, ...props }) {
  if (!customization) {
    return null;
  }
  const Comp = FeaturedCategoriesComponent[customization.layout.type];
  return <Comp customization={customization} {...props} />;
}

export default memo(Section40);
