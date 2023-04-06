import React, { memo } from "react";

import { coal, night, pollution } from "@saas/utils/colors";
import LazyImage from "@saas/components/LazyImage";
import { SHOPPING_ORDER_INVOICE_DTO } from "@saas/plugins/Shopping/constants";

import Paper from "@material-ui/core/Paper";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Drawer from "@material-ui/core/Drawer";

function DiscountMethodsDrawer({
  isDiscountMethodsDrawerOpen,
  discountMethods,
  selectedDiscountMethod,
  setDiscountMethod,
  setDiscountMethodsDrawerOpen,
  changeCode,
}) {
  const onClose = () => {
    setDiscountMethodsDrawerOpen(false);
  };
  return (
    <Drawer
      anchor="bottom"
      open={isDiscountMethodsDrawerOpen}
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
            انتخاب نوع تخفیف
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
        {Object.entries(discountMethods).map(([key, value]) => {
          return (
            <>
              <div
                className="px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
                onClick={() => {
                  const dto = localStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
                    ? JSON.parse(
                        localStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
                      )
                    : {};
                  if (dto) {
                    delete dto.use_gift_credit;
                    delete dto.discount_code;
                  }
                  localStorage.setItem(
                    SHOPPING_ORDER_INVOICE_DTO,
                    JSON.stringify(dto)
                  );
                  changeCode("");
                  setDiscountMethod(value);
                  setDiscountMethodsDrawerOpen(false);
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
                      {value.selectableOptionTitle}
                    </div>
                    <div
                      className="u-font-semi-small"
                      style={{ color: pollution }}
                    >
                      {value.selectableOptionDescription}
                    </div>
                  </div>
                </div>
                {selectedDiscountMethod?.name === key && (
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
}

export default memo(DiscountMethodsDrawer);
