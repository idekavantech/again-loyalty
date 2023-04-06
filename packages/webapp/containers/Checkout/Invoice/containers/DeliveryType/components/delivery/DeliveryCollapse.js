import React, { memo } from "react";

import { coal, pollution, smoke, strawberryIII } from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import { SELECT_DELIVERY_TYPE_DROPDOWN } from "containers/Checkout/Invoice/containers/DeliveryType/constants";

import { Collapse } from "react-collapse";
import Divider from "@material-ui/core/Divider";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

function DeliveryCollapse({
  isDeliveryTypeCollapseOpen,
  deliveryOptions,
  setDeliveryMethod,
  toggleDropDown,
  UIDropDowns,
  selectedDeliveryMethod,
  freeDeliveryCostCopyRight,
  orderInfo,
}) {
  return (
    <Collapse isOpened={isDeliveryTypeCollapseOpen}>
      {deliveryOptions?.map((deliveryType) => (
        <>
          <div
            className="px-4 py-3 d-flex flex-column u-cursor-pointer checkout-collapse"
            onClick={() => {
              setDeliveryMethod(deliveryType);
              toggleDropDown(
                SELECT_DELIVERY_TYPE_DROPDOWN,
                !UIDropDowns[SELECT_DELIVERY_TYPE_DROPDOWN]
              );
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div>
                  <div
                    className="u-fontMedium u-fontWeightBold"
                    style={{ color: coal }}
                  >
                    {deliveryType.title}
                  </div>
                  <div
                    className="u-font-semi-small mt-1"
                    style={{ color: pollution }}
                  >
                    {deliveryType.description}
                  </div>
                </div>
              </div>
              {selectedDeliveryMethod &&
                deliveryType.type_id === selectedDeliveryMethod.type_id && (
                  <CheckRoundedIcon color="secondary" />
                )}
            </div>
            <div className="mt-3 d-flex justify-content-between align-items-center">
              {deliveryType?.price === null ? null : (
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center u-font-semi-small ml-2"
                    style={{ color: smoke }}
                  >
                    <div>ارسال:</div>
                    &nbsp;
                    {deliveryType.price === 0 ? (
                      <div>{freeDeliveryCostCopyRight}</div>
                    ) : (
                      <div>
                        {priceFormatter(deliveryType.price)}
                        &nbsp;
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={smoke}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {orderInfo?.final_items_price <
                selectedDeliveryMethod?.minimum_order_price &&
                deliveryType.type_id === selectedDeliveryMethod.type_id && (
                  <div
                    className="u-font-semi-small u-fontWeightBold mx-1"
                    style={{ color: strawberryIII }}
                  >
                    حداقل مجموع قیمت محصولات نمی‌تواند از{" "}
                    {priceFormatter(deliveryType.minimum_order_price)}
                    &nbsp;
                    <Icon
                      icon={$}
                      width={21}
                      height={21}
                      color={strawberryIII}
                    />
                    &nbsp; کمتر باشد.
                  </div>
                )}
            </div>
          </div>
          <Divider />
        </>
      ))}
    </Collapse>
  );
}

export default memo(DeliveryCollapse);
