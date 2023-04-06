import React, { memo } from "react";

import { coal, pollution } from "@saas/utils/colors";
import LazyImage from "@saas/components/LazyImage";
import Styles from "containers/Checkout/Cart/components/FulfillmentTypesDropDown/Styles";

import { Collapse } from "react-collapse";
import Paper from "@material-ui/core/Paper";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import Divider from "@material-ui/core/Divider";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import useTheme from "@material-ui/core/styles/useTheme";

function FulfillmentTypesDropDown({
  rgbThemeColor,
  selectedFulfillmentType,
  availableFulfillmentTypes,
  minWidth768,
  setFulfillmentTypesDropDownOpen,
  isFulfillmentTypesDropDownOpen,
  setFulfillmentTypesDrawerOpen,
  isFulfillmentTypesDrawerOpen,
  toggleDrawer,
  shoppingPluginData,
  themeColor,
  Icon,
  fulfillmentTypes,
  setFulfillmentType,
}) {
  const theme = useTheme();
  return (
    <Paper elevation={1}>
      <Styles rgbThemeColor={rgbThemeColor} themeColor={themeColor} />
      <div
        className={`${
          !selectedFulfillmentType?.name ? "" : "px-4 py-3"
        } d-flex align-items-center justify-content-between  ${
          availableFulfillmentTypes?.length > 1 &&
          "u-cursor-pointer checkout-collapse"
        }`}
        onClick={
          availableFulfillmentTypes?.length > 1
            ? minWidth768
              ? () =>
                  setFulfillmentTypesDropDownOpen(
                    !isFulfillmentTypesDropDownOpen
                  )
              : (event) => {
                  const setStateFunction = () =>
                    setFulfillmentTypesDrawerOpen(
                      !isFulfillmentTypesDrawerOpen
                    );
                  toggleDrawer(setStateFunction)(event);
                }
            : null
        }
      >
        {shoppingPluginData?.data?.delivery_site_type_template === 2 &&
        !selectedFulfillmentType?.name ? (
          <div
            className={`px-4 py-3 d-flex w-100 h-100 justify-content-between ${
              !selectedFulfillmentType?.name
                ? "error-address-details-invalid"
                : ""
            } `}
          >
            <div className=" d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse">
              <div className="d-flex align-items-center">
                <div>
                  <div
                    className="u-fontMedium u-fontWeightBold"
                    style={{ color: coal }}
                  >
                    نحوه دریافت سفارش خود را مشخص نمایید.
                  </div>
                </div>
              </div>
              <Divider />
            </div>

            <div className="d-flex align-items-center">
              <div
                className="u-fontMedium ml-1"
                style={{ color: theme?.palette?.secondary?.main }}
              >
                انتخاب
              </div>
              {minWidth768 ? (
                isFulfillmentTypesDropDownOpen ? (
                  <ExpandLessRoundedIcon color="secondary" />
                ) : (
                  <ExpandMoreRoundedIcon color="secondary" />
                )
              ) : (
                <ChevronLeftRoundedIcon color="secondary" />
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex align-items-center">
              {Icon && (
                <LazyImage src={Icon} width={24} height={24} className="ml-2" />
              )}
              <div>
                <div
                  className="u-fontMedium u-fontWeightBold"
                  style={{ color: coal }}
                >
                  {selectedFulfillmentType?.title}
                </div>
                <div
                  className="u-font-semi-small mt-1"
                  style={{ color: pollution }}
                >
                  {selectedFulfillmentType?.description}
                </div>
              </div>
            </div>
            {availableFulfillmentTypes?.length > 1 && (
              <div className="d-flex align-items-center">
                <div
                  className="u-fontMedium ml-1"
                  style={{ color: theme?.palette?.secondary?.main }}
                >
                  تغییر به روش‌ دیگر
                </div>
                {minWidth768 ? (
                  isFulfillmentTypesDropDownOpen ? (
                    <ExpandLessRoundedIcon color="secondary" />
                  ) : (
                    <ExpandMoreRoundedIcon color="secondary" />
                  )
                ) : (
                  <ChevronLeftRoundedIcon color="secondary" />
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Collapse isOpened={isFulfillmentTypesDropDownOpen && minWidth768}>
        {availableFulfillmentTypes?.map((option) => {
          const selectedMethod = fulfillmentTypes?.find(
            (method) => method.name === option
          );
          const title = selectedMethod?.title;
          const Icon = selectedMethod?.icon;
          const description = selectedMethod?.description;
          return (
            <>
              <Divider />
              <div
                className="px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
                onClick={() => {
                  setFulfillmentType(selectedMethod);
                  setFulfillmentTypesDropDownOpen(
                    !isFulfillmentTypesDropDownOpen
                  );
                }}
              >
                <div className="d-flex align-items-center">
                  {Icon && (
                    <LazyImage
                      src={Icon}
                      width={24}
                      height={24}
                      className="ml-2"
                    />
                  )}
                  <div>
                    <div
                      className="u-fontMedium u-fontWeightBold"
                      style={{ color: coal }}
                    >
                      {title}
                    </div>
                    <div
                      className="u-font-semi-small"
                      style={{ color: pollution }}
                    >
                      {description}
                    </div>
                  </div>
                </div>
                {selectedFulfillmentType?.name === option && (
                  <CheckRoundedIcon color="secondary" />
                )}
              </div>
            </>
          );
        })}
      </Collapse>
    </Paper>
  );
}
export default memo(FulfillmentTypesDropDown);
