import { useMemo } from "react";

export const useDelivery = (pluginData, orderInfo) => {
  const deliveryCostCopyRight = pluginData?.data?.delivery_costs_by_user
    ? "به عهده مشتری"
    : "رایگان";
  const deliveryOptions = useMemo(() => {
    if (orderInfo?.delivery_options) {
      return Object.values(orderInfo?.delivery_options);
    } else {
      return [];
    }
  }, [orderInfo?.delivery_options]);
  return {
    deliveryCostCopyRight,
    deliveryOptions,
  };
};
