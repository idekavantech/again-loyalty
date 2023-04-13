import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export default function BusinessIsCloseText() {
  return (
    <div
      style={{
        fontStyle: "normal",
        fontSize: 20,
        fontWeight: 700,
        color: "#D72C0D",
      }}
      className="d-flex align-items-center"
    >
      <FiberManualRecordIcon
        style={{
          color: "#D72C0D",
          fontSize: 8,
        }}
        className="ml-2"
      />
      Temporarily unable to receive an order
    </div>
  );
}
