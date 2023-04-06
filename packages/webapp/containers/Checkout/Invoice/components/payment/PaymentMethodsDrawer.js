import React, { memo } from "react";

import LazyImage from "@saas/components/LazyImage";
import { coal, night, pollution } from "@saas/utils/colors";
import { paymentMethods } from "containers/Checkout/Invoice/constants";

import Paper from "@material-ui/core/Paper";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Drawer from "@material-ui/core/Drawer";

function PaymentMethodsDrawer({
  isPaymentMethodsDrawerOpen,
  selectedPaymentMethod,
  setPaymentMethod,
  setPaymentMethodsDrawerOpen,
}) {
  const onClose = () => {
    setPaymentMethodsDrawerOpen(false);
  };
  return (
    <Drawer
      anchor="bottom"
      open={isPaymentMethodsDrawerOpen}
      onClose={onClose}
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
            onClick={onClose}
            style={{ color: night }}
          >
            <CancelRoundedIcon />
          </IconButton>
          <span
            style={{ color: coal }}
            className="u-fontLarge  u-fontWeightBold"
          >
            انتخاب نحوه پرداخت وجه
          </span>
          <IconButton
            className="p-0"
            onClick={onClose}
            style={{ color: night, visibility: "hidden" }}
          >
            <CancelRoundedIcon />
          </IconButton>
        </div>
        <Divider />
        {Object.entries(paymentMethods).map(([key, value], index) => {
          return (
            <>
              <div
                className="px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
                onClick={() => {
                  setPaymentMethod(value);
                  setPaymentMethodsDrawerOpen(false);
                }}
                style={{ padding: "15px 15px 0px 15px" }}
              >
                <div className="d-flex align-items-center">
                  <LazyImage
                    src={value.Icon}
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                  <div>
                    <div
                      className="u-fontMedium u-fontWeightBold"
                      style={{ color: coal }}
                    >
                      {value.title}
                    </div>
                    <div
                      className="u-font-semi-small"
                      style={{ color: pollution }}
                    >
                      {value.description}
                    </div>
                  </div>
                </div>
                {selectedPaymentMethod?.name === key && (
                  <CheckRoundedIcon color="secondary" />
                )}
              </div>
              {index !== Object.keys(paymentMethods).length - 1 ? (
                <Divider />
              ) : null}
            </>
          );
        })}
      </Paper>
    </Drawer>
  );
}

export default memo(PaymentMethodsDrawer);
