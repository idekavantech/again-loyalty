/**
 *
 * Switch
 *
 */

import React, { memo } from "react";
import ReactSwitch from "react-switch";
import useTheme from "@material-ui/core/styles/useTheme";
import { pollution, smoke } from "@saas/utils/colors";
function Switch({
  isSwitchOn,
  toggleSwitch,
  id,
  themeColor,
  onColor,
  className = "mx-2",
}) {
  const theme = useTheme();
  themeColor = themeColor || theme.palette.primary.main;
  return (
    <label
      className={`u-text-dark-grey u-fontMedium u-cursor-pointer ${className}`}
      htmlFor={id}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ReactSwitch
        checked={isSwitchOn}
        onChange={() => toggleSwitch(!isSwitchOn)}
        onColor={onColor || process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
        offColor={smoke}
        onHandleColor={themeColor || process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
        offHandleColor={pollution}
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={14}
        width={34}
        className="react-switch"
        id={id}
      />
    </label>
  );
}

export default memo(Switch);
