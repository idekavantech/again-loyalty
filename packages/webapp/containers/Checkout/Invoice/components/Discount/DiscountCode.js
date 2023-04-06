import React, { memo, useEffect } from "react";

import LazyImage from "@saas/components/LazyImage";
import { SHOPPING_ORDER_INVOICE_DTO } from "@saas/plugins/Shopping/constants";
import { discountPaymentMethodsSitchButtonText } from "containers/Checkout/Invoice/constants";
import { coal } from "@saas/utils/colors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import Button from "@material-ui/core/Button";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import useTheme from "@material-ui/core/styles/useTheme";

function DiscountCode({
  selectedDiscountMethod,
  giftCredit,
  setDiscountDropDownOpen,
  isDiscountDropDownOpen,
  setDiscountMethodsDrawerOpen,
  isDiscountMethodsDrawerOpen,
  changeCode,
  code,
  _setDiscountError,
  _getShoppingOrderInvoice,
  discountError,
  orderInfo,
}) {
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  let dto;

  if (typeof sessionStorage !== "undefined")
    dto = sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
      ? JSON.parse(sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO))
      : {};

  useEffect(() => {
    if (!code && !dto?.discount_code) _setDiscountError("");
  }, [code]);

  return (
    <div className="px-4 py-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <LazyImage
            src={selectedDiscountMethod.Icon}
            width={24}
            height={24}
            className="ml-2"
          />
          <div>
            <div
              className="u-fontMedium u-fontWeightBold"
              style={{ color: coal }}
            >
              {selectedDiscountMethod.title}
            </div>
          </div>
        </div>
        {giftCredit ? (
          <div
            className="d-flex align-items-center u-cursor-pointer"
            onClick={
              minWidth768
                ? () => setDiscountDropDownOpen(!isDiscountDropDownOpen)
                : () =>
                    setDiscountMethodsDrawerOpen(!isDiscountMethodsDrawerOpen)
            }
          >
            <div
              className="u-fontMedium ml-1"
              style={{ color: theme.palette.secondary.main }}
            >
              {
                discountPaymentMethodsSitchButtonText[
                  selectedDiscountMethod.name
                ]
              }
            </div>
            {minWidth768 ? (
              isDiscountDropDownOpen ? (
                <ExpandLessRoundedIcon color="secondary" />
              ) : (
                <ExpandMoreRoundedIcon color="secondary" />
              )
            ) : (
              <ChevronLeftRoundedIcon color="secondary" />
            )}
          </div>
        ) : null}
      </div>
      <div className="d-flex flex-column">
        <div
          style={{
            border: "1px solid #C4C4C4",
            borderRadius: 8,
            width: minWidth768 ? "50%" : "100%",
            height: 40,
          }}
          className="d-flex align-items-center mt-3"
        >
          <input
            type="text"
            className="w-100 h-100 mr-1"
            placeholder="افزودن کد تخفیف"
            value={code}
            onChange={(event) => changeCode(event.target.value)}
          ></input>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            className="ml-1 u-box-shadow-none"
            onClick={() => {
              if (!code) {
                _setDiscountError("لطفا کد تخفیف را وارد کنید.");
              } else {
                setTimeout(() => {
                  _getShoppingOrderInvoice(
                    orderInfo?.id,
                    { ...dto, discount_code: code },
                    () => {
                      const newDto = sessionStorage.getItem(
                        SHOPPING_ORDER_INVOICE_DTO
                      )
                        ? JSON.parse(
                            sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
                          )
                        : {};
                      newDto.use_gift_credit = false;
                      newDto.discount_code = code;
                      sessionStorage.setItem(
                        SHOPPING_ORDER_INVOICE_DTO,
                        JSON.stringify(newDto)
                      );
                    }
                  );
                }, 0);
              }
            }}
            disabled={code === ""}
          >
            اعمال
          </Button>
        </div>
        {discountError ? (
          <div
            className="u-font-semi-small mt-2"
            style={{
              minHeight: 24,
              color: discountError.includes("موفقیت")
                ? theme.palette.success.main
                : theme.palette.error.main,
            }}
          >
            {discountError}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default memo(DiscountCode);
