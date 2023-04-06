import React, { memo } from "react";
import dynamic from "next/dynamic";
const GalleryImagesType1 = dynamic(() => import("./GalleryImagesType1"));
const GalleryImagesType2 = dynamic(() => import("./GalleryImagesType2"));
const GalleryImagesType3 = dynamic(() => import("./GalleryImagesType3"));

const galleryImageSectionLayoutComponents = {
  type_1: GalleryImagesType1,
  type_2: GalleryImagesType2,
  type_3: GalleryImagesType3,
};
function Section11({ customization, ...props }) {
  if (!customization) {
    return null;
  }
  const Comp = galleryImageSectionLayoutComponents[customization?.layout?.type];
  return <Comp customization={customization} {...props} />;
}

export default memo(Section11);
