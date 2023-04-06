import React, { memo } from "react";
import dynamic from "next/dynamic";
const BranchesType1 = dynamic(() => import("./BranchesType1"));
const BranchesType2 = dynamic(() => import("./BranchesType2"));
const BranchesType3 = dynamic(() => import("./BranchesType3"));

const BranchesSectionLayoutComponents = {
  type_1: BranchesType1,
  type_2: BranchesType2,
  type_3: BranchesType3,
};

function Section11({ customization, ...props }) {
  if (!customization) {
    return null;
  }
  const Comp = BranchesSectionLayoutComponents[customization?.layout?.type];
  return <Comp customization={customization} {...props} />;
}

export default memo(Section11);
