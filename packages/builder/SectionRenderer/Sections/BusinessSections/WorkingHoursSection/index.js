import React, { memo } from "react";
import dynamic from "next/dynamic";
const WorkingHours1 = dynamic(() => import("./WorkingHours1"));

const WorkingHoursComponent = {
  type_1: WorkingHours1,
};
function WorkingHoursSection({ customization, ...props }) {
  if (!customization) {
    return null;
  }

  const Comp = WorkingHoursComponent[customization.layout.type];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(WorkingHoursSection);
