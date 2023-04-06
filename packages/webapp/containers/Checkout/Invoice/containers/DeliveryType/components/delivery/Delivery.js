import React, { memo } from "react";

import {
  cement,
  coal,
  pollution,
  smoke,
  strawberryIII,
} from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import {
  timesTypes,
  DELIVERY_TYPE_CUSTOM,
  SELECT_DELIVERY_TYPE_DRAWER,
} from "@saas/plugins/Shopping/constants";
import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { SELECT_DELIVERY_TYPE_DROPDOWN } from "containers/Checkout/Invoice/containers/DeliveryType/constants";

import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import useTheme from "@material-ui/core/styles/useTheme";

function Delivery({
  deliveryOptions,
  toggleDropDown,
  UIDropDowns,
  toggleDrawer,
  UIDrawers,
  isDeliveryTypeCollapseOpen,
  selectedDeliveryMethod,
  freeDeliveryCostCopyRight,
  orderInfo,
}) {
  const { minWidth768 } = useResponsive();
  const theme = useTheme();

  return (
    <div
      className={`px-4 py-3 ${
        deliveryOptions &&
        deliveryOptions.length !== 1 &&
        "u-cursor-pointer checkout-collapse"
      }`}
      onClick={() =>
        deliveryOptions && deliveryOptions.length !== 1
          ? minWidth768
            ? toggleDropDown(
                SELECT_DELIVERY_TYPE_DROPDOWN,
                !UIDropDowns[SELECT_DELIVERY_TYPE_DROPDOWN]
              )
            : toggleDrawer(
                SELECT_DELIVERY_TYPE_DRAWER,
                !UIDrawers[SELECT_DELIVERY_TYPE_DRAWER]
              )
          : null
      }
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column">
          <div className="d-flex flex-wrap align-items-center">
            <div
              style={{
                color:
                  UIDrawers[SELECT_DELIVERY_TYPE_DRAWER] ||
                  isDeliveryTypeCollapseOpen
                    ? cement
                    : coal,
              }}
              className="u-fontMedium"
            >
              نحوه ارسال:{" "}
            </div>
            <div
              className="u-fontMedium u-fontWeightBold"
              style={{
                color:
                  UIDrawers[SELECT_DELIVERY_TYPE_DRAWER] ||
                  isDeliveryTypeCollapseOpen
                    ? cement
                    : coal,
              }}
            >
              &nbsp;
              {selectedDeliveryMethod && selectedDeliveryMethod.title}
            </div>
            {selectedDeliveryMethod &&
              selectedDeliveryMethod.type === DELIVERY_TYPE_CUSTOM && (
                <div className="u-font-semi-small u-fontWeightBold mr-1">
                  (
                  {englishNumberToPersianNumber(
                    selectedDeliveryMethod.timing.delivery_interval.from
                  )}{" "}
                  تا{" "}
                  {englishNumberToPersianNumber(
                    selectedDeliveryMethod.timing.delivery_interval.to
                  )}{" "}
                  {
                    timesTypes[
                      selectedDeliveryMethod.timing.delivery_interval.type
                    ]
                  }{" "}
                  کاری)
                </div>
              )}
          </div>
          <div
            className="u-font-semi-small mt-1"
            style={{
              color:
                UIDrawers[SELECT_DELIVERY_TYPE_DRAWER] ||
                isDeliveryTypeCollapseOpen
                  ? cement
                  : pollution,
            }}
          >
            {selectedDeliveryMethod && selectedDeliveryMethod.description}
          </div>
        </div>
        {deliveryOptions && deliveryOptions.length !== 1 && (
          <div className="d-flex align-items-center">
            <div
              className="u-fontMedium ml-1"
              style={{ color: theme.palette.secondary.main }}
            >
              تغییر
            </div>
            {minWidth768 ? (
              UIDropDowns[SELECT_DELIVERY_TYPE_DROPDOWN] ? (
                <ExpandLessRoundedIcon color="secondary" />
              ) : (
                <ExpandMoreRoundedIcon color="secondary" />
              )
            ) : (
              <ChevronLeftRoundedIcon color="secondary" />
            )}
          </div>
        )}
      </div>
      <div className="mt-3 d-flex justify-content-between align-items-center">
        {selectedDeliveryMethod?.price === null ? null : (
          <div className="d-flex flex-wrap align-items-center">
            <div
              className="d-flex align-items-center u-font-semi-small ml-2"
              style={{
                color:
                  UIDrawers[SELECT_DELIVERY_TYPE_DRAWER] ||
                  isDeliveryTypeCollapseOpen
                    ? cement
                    : smoke,
              }}
            >
              <div>ارسال:</div>
              {selectedDeliveryMethod?.price === 0 ? (
                <div className="mx-1">&nbsp;{freeDeliveryCostCopyRight}</div>
              ) : (
                <div className="mx-1">
                  {selectedDeliveryMethod &&
                    priceFormatter(selectedDeliveryMethod.price)}
                  &nbsp;
                  <Icon
                    icon={$}
                    width={21}
                    height={21}
                    color={
                      UIDrawers[SELECT_DELIVERY_TYPE_DRAWER] ||
                      isDeliveryTypeCollapseOpen
                        ? cement
                        : smoke
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {orderInfo?.final_items_price <
          selectedDeliveryMethod?.minimum_order_price && (
          <div
            className="u-font-semi-small u-fontWeightBold"
            style={{ color: strawberryIII }}
          >
            حداقل مجموع قیمت محصولات نمی‌تواند از{" "}
            {priceFormatter(selectedDeliveryMethod.minimum_order_price)}
            &nbsp;
            <Icon icon={$} width={21} height={21} color={strawberryIII} />
            &nbsp; کمتر باشد.
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Delivery);
