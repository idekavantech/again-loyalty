import React, { memo } from "react";

import LazyImage from "@saas/components/LazyImage";
import { discountPaymentMethodsSitchButtonText } from "containers/Checkout/Invoice/constants";
import { coal, smoke } from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";
import useTheme from "@material-ui/core/styles/useTheme";

function GiftCredit({
  selectedDiscountMethod,
  setDiscountDropDownOpen,
  isDiscountDropDownOpen,
  setDiscountMethodsDrawerOpen,
  isDiscountMethodsDrawerOpen,
  giftCredit,
  useGift,
  setUseGift,
  visitCardPluginData,
  maxUsableCreditAmount,
}) {
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between px-4 pt-3">
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
        <div
          className="d-flex align-items-center u-cursor-pointer"
          onClick={
            minWidth768
              ? () => setDiscountDropDownOpen(!isDiscountDropDownOpen)
              : () => setDiscountMethodsDrawerOpen(!isDiscountMethodsDrawerOpen)
          }
        >
          <div
            className="u-fontMedium ml-1"
            style={{ color: theme.palette.secondary.main }}
          >
            {discountPaymentMethodsSitchButtonText[selectedDiscountMethod.name]}
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
      </div>
      <div
        style={{
          border: "1px solid #EDEDED",
          borderRadius: 8,
          width: minWidth768 && "50%",
          height: 40,
        }}
        className="d-flex align-items-center justify-content-between mt-3 mx-4 pr-2 pl-1 mb-3"
      >
        <div className="d-flex align-items-center mr-1">
          <div className="u-fontNormal" style={{ color: smoke }}>
            اعتبار هدیه شما:
          </div>
          <div
            className="u-fontNormal"
            style={{ color: theme.palette.secondary.main }}
          >
            &nbsp;{priceFormatter(giftCredit)}
            &nbsp;
            <Icon
              icon={$}
              width={21}
              height={21}
              color={theme.palette.secondary.main}
            />
          </div>
        </div>
        <Switch
          checked={useGift}
          onChange={(event) => setUseGift(event.target.checked)}
          name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </div>
      {!useGift ? (
        <>
          <Divider className="mb-3" />
          <div className="u-font-semi-small px-4 pb-3" style={{ color: smoke }}>
            برای اعمال شدن اعتبار هدیه باید آن را فعال نمایید.
          </div>
        </>
      ) : visitCardPluginData?.data?.usable_gift_per_order ? (
        <>
          <Divider className="mb-3" />
          <div
            className="u-font-semi-small d-flex align-items-center px-4 pb-3"
            style={{ color: theme.palette.secondary.main }}
          >
            <ErrorRoundedIcon
              className="ml-1"
              style={{ fontSize: 16 }}
              color="secondary"
            />
            می‌توانید در هر سفارش{" "}
            {
              maxUsableCreditAmount[
                visitCardPluginData.data.usable_gift_per_order.type
              ]
            }
            از اعتبار هدیه خود استفاده کنید.
          </div>
        </>
      ) : null}
    </div>
  );
}

export default memo(GiftCredit);
