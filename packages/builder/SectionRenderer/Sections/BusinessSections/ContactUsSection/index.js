import React, { memo } from "react";
import dynamic from "next/dynamic";
const ContactUs1 = dynamic(() => import("./ContactUs1"));

const ContactUsComponent = {
  type_1: ContactUs1,
};
function ContactUs({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = ContactUsComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(ContactUs);
