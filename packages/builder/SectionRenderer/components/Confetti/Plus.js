import React from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

export default function Plus({
  primaryColor,
  left = "unset",
  right = "unset",
  top = "unset",
  bottom = "unset",
  size = 24,
  className = "",
}) {
  return (
    <AddRoundedIcon
      className={`position-absolute ${className}`}
      style={{
        fontSize: size,
        left,
        right,
        top,
        bottom,
        color: primaryColor || "#8C91EC",
      }}
    />
  );
}
