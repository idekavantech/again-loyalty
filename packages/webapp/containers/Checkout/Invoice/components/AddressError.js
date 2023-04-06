import React, { memo } from "react";

import { graphite } from "@saas/utils/colors";

import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";

function AddressError({ themeColor, rgbThemeColor }) {
  return (
    <div className="col-12 mb-4">
      <div
        className="d-flex p-3 align-items-center"
        style={{
          border: `1px solid ${themeColor}`,
          borderRadius: 8,
          backgroundColor: `rgba(${rgbThemeColor.r}, ${rgbThemeColor.g}, ${rgbThemeColor.b}, 0.05)`,
        }}
      >
        <ErrorOutlineRoundedIcon
          fontSize="small"
          color="secondary"
          className="ml-1"
        />
        <div className="u-font-semi-small" style={{ color: graphite }}>
          متاسفانه آدرس انتخابی شما در محدوده سرویس‌دهی قرار ندارد. از بخش
          اطلاعات ارسال می‌توانید آدرس خود را تغییر دهید.
        </div>
      </div>
    </div>
  );
}

export default memo(AddressError);
