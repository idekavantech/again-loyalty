import React, { memo } from "react";
import dynamic from "next/dynamic";
const Video1 = dynamic(() => import("./Video1"));
const Video2 = dynamic(() => import("./Video2"));

const VideoSectionLayoutComponents = {
  type_1: Video1,
  type_2: Video2,
};
function Section39({ customization, ...props }) {
  if (!customization) {
    return null;
  }
  const Comp = VideoSectionLayoutComponents[customization.layout.type];
  return <Comp customization={customization} {...props} />;
}

export default memo(Section39);
