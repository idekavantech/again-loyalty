import { useEffect, useState } from "react";

import { SELECT_DELIVERY_TYPE_DROPDOWN } from "containers/Checkout/Invoice/containers/DeliveryType/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { useDidMountEffect } from "@saas/utils/hooks/useDidMountEffect";
import { SHOPPING_ORDER_INVOICE_DTO } from "@saas/plugins/Shopping/constants";

export const useDelivery = (
  deliveryOptions,
  sendTo,
  pluginData,
  UIDropDowns,
  orderInfo,
  _getShoppingOrderInvoice
) => {
  const { minWidth768 } = useResponsive();
  const freeDeliveryCostCopyRight = pluginData.data.delivery_costs_by_user
    ? "به عهده مشتری"
    : "رایگان";
  const isDeliveryTypeCollapseOpen =
    UIDropDowns[SELECT_DELIVERY_TYPE_DROPDOWN] &&
    minWidth768 &&
    deliveryOptions &&
    deliveryOptions.length !== 1;
  const [selectedDeliveryMethod, setDeliveryMethod] = useState(null);

  useEffect(() => {
    if (deliveryOptions?.length) {
      setDeliveryMethod(deliveryOptions[0]);
    } else {
      setDeliveryMethod(null);
    }
  }, [sendTo?.id, deliveryOptions?.length]);
  useDidMountEffect(() => {
    const dto = sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
      ? JSON.parse(sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO))
      : {};
    const newDTO = {
      ...dto,
      delivery: {
        rule_id: selectedDeliveryMethod?.rule_id,
      },
    };
    sessionStorage.setItem(SHOPPING_ORDER_INVOICE_DTO, JSON.stringify(newDTO));
    setTimeout(() => {
      _getShoppingOrderInvoice(orderInfo?.id, newDTO);
    }, 0);
  }, [selectedDeliveryMethod?.rule_id]);
  return {
    selectedDeliveryMethod,
    setDeliveryMethod,
    freeDeliveryCostCopyRight,
    isDeliveryTypeCollapseOpen,
  };
};
