import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

export default function OutOfWorkingHours({ isSmallScreen, workingDayStart }) {
  return (
    <>
      <div
        style={{
          fontStyle: "normal",
          fontSize: 20,
          fontWeight: 700,
          color: "#D72C0D",
        }}
        className="d-flex align-items-center"
      >
        {!isSmallScreen ? (
          <FiberManualRecordIcon
            style={{
              color: "#D72C0D",
              fontSize: 8,
            }}
            className="ml-2"
          />
        ) : null}
        {`Closed. Ordering from${
          workingDayStart.dayName
        } the watch${englishNumberToPersianNumber(workingDayStart.openingTime)}. `}
      </div>
    </>
  );
}
