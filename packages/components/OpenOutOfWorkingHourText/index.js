import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

export default function OpenOutOfWorkingHourText({
  isSelectedAddressCurrect,
  isBusinessOpenNow,
  workingDayStart,
}) {
  return (
    <>
      <div
        style={{
          fontStyle: "normal",
          fontWeight: " bold",
          fontSize: 20,
          fontWeight: 700,
          color: isSelectedAddressCurrect ? "#D72C0D" : "#00A47C",
        }}
        className="d-flex align-items-center"
      >
        <FiberManualRecordIcon
          style={{
            color: isSelectedAddressCurrect ? "#D72C0D" : "#00A47C",
            fontSize: 8,
          }}
          className="ml-2"
        />
        {isBusinessOpenNow
          ? "باز . سفارش گیری تا " +
            englishNumberToPersianNumber(workingDayStart.closingTime)
          : "پیش سفارش می‌پذیریم"}{" "}
        {isSelectedAddressCurrect ? ". خارج از محدوده " : ""}
      </div>
    </>
  );
}
