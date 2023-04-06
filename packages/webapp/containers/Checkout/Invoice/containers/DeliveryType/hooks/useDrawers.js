import { useCallback, useState } from "react";

import {
  SELECT_ADDRESS_DRAWER,
  SELECT_DELIVERY_TYPE_DRAWER,
} from "@saas/plugins/Shopping/constants";
import {
  FAST_PREORDER_TIME_RANGE_SELECT_DRAWER,
  SCHEDULED_TIME_RANGE_SELECT_DRAWER,
} from "containers/Checkout/Invoice/containers/DeliveryType/constants";

export const useDrawers = () => {
  const [UIDrawers, toggleUIDrawers] = useState({
    [SELECT_ADDRESS_DRAWER]: false,
    [SELECT_DELIVERY_TYPE_DRAWER]: false,
    [FAST_PREORDER_TIME_RANGE_SELECT_DRAWER]: false,
    [SCHEDULED_TIME_RANGE_SELECT_DRAWER]: false,
  });
  const toggleDrawer = useCallback(
    (name, open) => {
      toggleUIDrawers({ ...UIDrawers, [name]: open });
    },
    [UIDrawers]
  );
  return {
    UIDrawers,
    toggleDrawer,
  };
};
