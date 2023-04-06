import { useCallback, useState } from "react";

import { DELETE_ADDRESS_MODAL } from "@saas/plugins/Shopping/constants";
import {
  FAST_PREORDER_TIME_RANGE_SELECT_MODAL,
  SCHEDULED_TIME_RANGE_SELECT_MODAL,
} from "containers/Checkout/Invoice/containers/DeliveryType/constants";

export const useModals = () => {
  const [UIModals, toggleUIModals] = useState({
    [FAST_PREORDER_TIME_RANGE_SELECT_MODAL]: false,
    [SCHEDULED_TIME_RANGE_SELECT_MODAL]: false,
    [DELETE_ADDRESS_MODAL]: false,
  });
  const toggleModal = useCallback(
    (name, open) => {
      toggleUIModals({ ...UIModals, [name]: open });
    },
    [UIModals]
  );
  return {
    UIModals,
    toggleModal,
  };
};
