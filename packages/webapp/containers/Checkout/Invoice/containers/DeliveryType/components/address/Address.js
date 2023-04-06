import React, { memo } from "react";

import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  SELECT_ADDRESS_DRAWER,
  SELECT_ADDRESS_DROPDOWN,
} from "@saas/plugins/Shopping/constants";
import { coal, pollution } from "@saas/utils/colors";

import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";

function Address({
  toggleDropDown,
  UIDropDowns,
  toggleDrawer,
  UIDrawers,
  sendTo,
}) {
  const { minWidth768 } = useResponsive();
  const theme = useTheme();

  return (
    <div
      className="px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
      onClick={() =>
        minWidth768
          ? toggleDropDown(
              SELECT_ADDRESS_DROPDOWN,
              !UIDropDowns[SELECT_ADDRESS_DROPDOWN]
            )
          : toggleDrawer(
              SELECT_ADDRESS_DRAWER,
              !UIDrawers[SELECT_ADDRESS_DRAWER]
            )
      }
    >
      <div className="d-flex align-items-center">
        <LocationOnRoundedIcon className="ml-2" />
        <div className="ml-5">
          <div className="d-flex align-items-center">
            <div style={{ color: coal }} className="u-fontMedium">
              ارسال به:
            </div>
            <div
              className="u-fontMedium u-fontWeightBold"
              style={{ color: coal }}
            >
              &nbsp;{sendTo && sendTo.title}
            </div>
          </div>
          <div
            className="u-font-semi-small mt-1 text-justify"
            style={{ color: pollution }}
          >
            {sendTo && sendTo.full_address}
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-end align-items-center"
        style={{ minWidth: 97 }}
      >
        <div
          className="u-fontMedium ml-1"
          style={{ color: theme.palette.secondary.main }}
        >
          تغییر
        </div>
        {minWidth768 ? (
          UIDropDowns[SELECT_ADDRESS_DROPDOWN] ? (
            <ExpandLessRoundedIcon color="secondary" />
          ) : (
            <ExpandMoreRoundedIcon color="secondary" />
          )
        ) : (
          <ChevronLeftRoundedIcon color="secondary" />
        )}
      </div>
    </div>
  );
}

export default memo(Address);
