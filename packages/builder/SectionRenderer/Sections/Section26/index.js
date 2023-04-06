import React, { memo } from "react";
import dynamic from "next/dynamic";
const Form1 = dynamic(() => import("./Form1"));

const FormComponent = {
  type_1: Form1,
};

function section26({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = FormComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(section26);
