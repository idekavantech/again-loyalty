import { useCallback, useState } from "react";

import { SELECT_ADDRESS_DROPDOWN } from "@saas/plugins/Shopping/constants";
import { SELECT_DELIVERY_TYPE_DROPDOWN } from "containers/Checkout/Invoice/containers/DeliveryType/constants";

export const useDropDowns = () => {
  const [UIDropDowns, toggleUIDropDowns] = useState({
    [SELECT_ADDRESS_DROPDOWN]: false,
    [SELECT_DELIVERY_TYPE_DROPDOWN]: false,
  });
  const toggleDropDown = useCallback(
    (name, open) => {
      toggleUIDropDowns({ ...UIDropDowns, [name]: open });
    },
    [UIDropDowns]
  );
  return {
    UIDropDowns,
    toggleDropDown,
  };
};
