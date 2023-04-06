import React, { memo } from "react";

import LazyImage from "@saas/components/LazyImage";
import { coal, night, pollution } from "@saas/utils/colors";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const FulfillmentTypesDrawer = ({
  isFulfillmentTypesDrawerOpen,
  setFulfillmentTypesDrawerOpen,
  toggleDrawer,
  availableFulfillmentTypes,
  setFulfillmentType,
  selectedFulfillmentType,
  fulfillmentTypes,
}) => {
  return (
    <Drawer
      anchor="bottom"
      open={isFulfillmentTypesDrawerOpen}
      onClose={(event) => {
        const setStateFunction = () => setFulfillmentTypesDrawerOpen(false);
        toggleDrawer(setStateFunction)(event);
      }}
      style={{ zIndex: 10000 }}
      classes={{ paperAnchorBottom: "drawer-border-radius" }}
    >
      <Paper elevation={1} style={{ borderRadius: 0 }}>
        <div
          className="d-flex justify-content-between align-items-center mb-5 w-100"
          style={{ padding: "15px 15px 0px 15px" }}
        >
          <IconButton
            className="p-0"
            onClick={() => setFulfillmentTypesDrawerOpen(false)}
            style={{ color: night }}
          >
            <CancelRoundedIcon />
          </IconButton>
          <span
            style={{ color: coal }}
            className="u-fontLarge  u-fontWeightBold"
          >
            انتخاب نحوه دریافت سفارش
          </span>
          <IconButton
            className="p-0"
            onClick={() => setFulfillmentTypesDrawerOpen(false)}
            style={{ color: night, visibility: "hidden" }}
          >
            <CancelRoundedIcon />
          </IconButton>
        </div>
        <Divider />
        {availableFulfillmentTypes?.map((option) => {
          const selectedMethod = fulfillmentTypes.find(
            (method) => method?.name === option
          );
          const title = selectedMethod?.title;
          const Icon = selectedMethod?.icon;
          const description = selectedMethod?.description;
          return (
            <>
              <div
                className="px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
                onClick={(event) => {
                  setFulfillmentType(selectedMethod);
                  const setStateFunction = () =>
                    setFulfillmentTypesDrawerOpen(false);
                  toggleDrawer(setStateFunction)(event);
                }}
                style={{ padding: "15px 15px 0px 15px" }}
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
              <Divider />
            </>
          );
        })}
      </Paper>
    </Drawer>
  );
};

export default memo(FulfillmentTypesDrawer);
