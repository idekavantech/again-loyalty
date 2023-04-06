import React from "react";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { purchaseStatusOptions } from "store/constants";

export default function PurchaseStatusChip({
  purchaseStatus,
  hasBorder,
  circleSize = 10,
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        backgroundColor: hexToRGBA(
          purchaseStatusOptions[purchaseStatus]?.color,
          0.04
        ),
        color: purchaseStatusOptions[purchaseStatus]?.color,
        borderStyle: "solid",
        borderWidth: hasBorder ? 1 : 0,
        borderColor: purchaseStatusOptions[purchaseStatus]?.color,
      }}
      className="py-1 px-2 d-flex align-items-center justify-content-center u-fontMedium"
    >
      <div
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: "50%",
          backgroundColor: purchaseStatusOptions[purchaseStatus]?.color,
        }}
      />
      <div className="mr-1">{purchaseStatusOptions[purchaseStatus]?.text}</div>
    </div>
  );
}
