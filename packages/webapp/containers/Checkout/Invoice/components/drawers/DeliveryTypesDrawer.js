import React, { memo } from "react";

import { SELECT_DELIVERY_TYPE_DRAWER } from "@saas/plugins/Shopping/constants";
import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import { coal, night, pollution, smoke } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Paper from "@material-ui/core/Paper";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Drawer from "@material-ui/core/Drawer";

function AddressDrawer({
  deliveryOptions,
  isOpen,
  selectedDeliveryMethod,
  setDeliveryMethod,
  toggleDrawer,
}) {
  const onClose = () => {
    toggleDrawer(SELECT_DELIVERY_TYPE_DRAWER, false);
  };
  return (
    <Drawer
      anchor="bottom"
      style={{ zIndex: 10000 }}
      open={isOpen}
      onClose={onClose}
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
            انتخاب نوع سرویس تحویل
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
        {deliveryOptions?.map((deliveryType) => (
          <>
            <div
              className="px-4 py-3 d-flex flex-column u-cursor-pointer checkout-collapse"
              onClick={() => {
                setDeliveryMethod(deliveryType);
                toggleDrawer(SELECT_DELIVERY_TYPE_DRAWER, false);
              }}
              style={{ padding: "15px 15px 0px 15px" }}
            >
              <div className="w-100 d-flex align-items-center">
                <div className="w-100">
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <div
                      className="u-fontMedium u-fontWeightBold"
                      style={{ color: coal }}
                    >
                      {deliveryType.title}
                    </div>
                    {selectedDeliveryMethod &&
                      deliveryType.type_id ===
                        selectedDeliveryMethod.type_id && (
                        <CheckRoundedIcon color="secondary" />
                      )}
                  </div>
                  <div
                    className="u-font-semi-small mt-2"
                    style={{ color: pollution }}
                  >
                    {deliveryType.description || ""}
                  </div>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center u-font-semi-small ml-2"
                    style={{ color: smoke }}
                  >
                    <div>ارسال:</div>
                    &nbsp;
                    <div>
                      {englishNumberToPersianNumber(deliveryType.price)}
                      &nbsp;
                      <Icon icon={$} width={21} height={21} color={smoke} />
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center u-font-semi-small"
                    style={{ color: smoke }}
                  >
                    <div>بسته‌بندی:</div>
                    &nbsp;
                    <div>
                      {englishNumberToPersianNumber(
                        deliveryType.timing.packaging_price
                      )}
                      &nbsp;
                      <Icon icon={$} width={21} height={21} color={smoke} />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="u-fontVerySmall" style={{ color: smoke }}>
                    هزینه کل:
                  </div>
                  &nbsp;
                  <div
                    className="u-font-semi-small u-fontWeightBold"
                    style={{ color: coal }}
                  >
                    {deliveryType.timing.packaging_price
                      ? englishNumberToPersianNumber(
                          deliveryType.timing.packaging_price +
                            deliveryType.price
                        )
                      : englishNumberToPersianNumber(deliveryType.price)}
                    &nbsp;
                    <Icon
                      icon={$}
                      width={21}
                      height={21}
                      color={pollution}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </>
        ))}
      </Paper>
    </Drawer>
  );
}

export default memo(AddressDrawer);
