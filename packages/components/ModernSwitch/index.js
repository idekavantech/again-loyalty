/* eslint-disable no-param-reassign */
import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import { noOp } from "@saas/utils/helpers/noOp";
import { pollution } from "@saas/utils/colors";

function ModernSwtich({
  isSwitchOn,
  toggleSwitch,
  disabled,
  texts = ["", ""],
  className = "",
  themeColor,
  width = 260,
  height = 40,
  style = {},
}) {
  const theme = useTheme();
  themeColor = themeColor || theme.palette.primary.main;
  return (
    <div
      bgcolor="background.default"
      role="button"
      tabIndex="0"
      onKeyDown={noOp}
      className={`d-flex position-relative u-border-radius-8 d-inline-block ${className} ${
        disabled ? "cursor-default" : "u-cursor-pointer"
      }`}
      onClick={() => {
        if (!disabled) toggleSwitch(!isSwitchOn);
      }}
      style={{
        width,
        height,
        opacity: disabled ? 0.4 : 1,
        boxShadow: "inset 0px 0px 4px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
    >
      <div
        className="transition-primary u-border-radius-8 position-absolute m-1"
        style={{
          transform: `translateX(-${isSwitchOn ? width / 2 : 0}px)`,
          width: width / 2 - 10,
          opacity: 0.1,
          background: themeColor,
          height: "calc(100% - 10px)",
        }}
      />
      <div
        style={{
          width: width / 2,
          color: isSwitchOn ? pollution : themeColor,
          fontWeight: isSwitchOn ? "normal" : "bold",
        }}
        className="text-center u-border-radius-8 px-3 py-1 d-flex justify-content-center align-items-center"
      >
        {texts[0]}
      </div>
      <div
        style={{
          width: width / 2,
          color: !isSwitchOn ? pollution : themeColor,
          fontWeight: !isSwitchOn ? "normal" : "bold",
        }}
        className="text-center u-border-radius-8 px-3 py-1 d-flex justify-content-center align-items-center"
      >
        {texts[1]}
      </div>
    </div>
  );
}

export default ModernSwtich;
