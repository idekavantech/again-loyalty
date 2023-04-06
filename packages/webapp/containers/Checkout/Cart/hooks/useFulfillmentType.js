import { useEffect, useState } from "react";

import {
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_USER_SITE,
  ORDER_SUBMITTER_STORAGE,
} from "@saas/plugins/Shopping/constants";

export const useFulfillmentType = (
  availableFulfillmentTypes,
  fulfillmentTypes,
  tableNumber,
  shoppingPluginData,
  autoSubmit,
  business
) => {
  const initialState =
    (availableFulfillmentTypes.includes(FULFILLMENT_ON_USER_SITE) &&
      fulfillmentTypes?.find(
        (item) => item.name === FULFILLMENT_ON_USER_SITE
      )) ||
    fulfillmentTypes?.find(
      (item) => item.name === availableFulfillmentTypes[0]
    );
  const [selectedFulfillmentType, setFulfillmentType] = useState(initialState);

  useEffect(() => {
    if (tableNumber) {
      setFulfillmentType(
        fulfillmentTypes?.find(
          (item) => item.name === FULFILLMENT_ON_BUSINESS_SITE
        )
      );
    }
  }, [tableNumber]);

  useEffect(() => {
    if (
      shoppingPluginData?.data?.delivery_site_type_template === 2 &&
      !autoSubmit
    ) {
      setFulfillmentType(null);
      localStorage.removeItem(`selectedGettingOrderMethodName-${business?.id}`);
    } else {
      const orderDataFromLocalStorage = localStorage.getItem(
        ORDER_SUBMITTER_STORAGE
      )
        ? JSON.parse(localStorage.getItem(ORDER_SUBMITTER_STORAGE))
        : null;
      const fulfillmentTypeNameFromLocalStorage =
        orderDataFromLocalStorage?.delivery_site_type?.toUpperCase();
      const selectedFulfillmentTypeNameByUserFromLocalStorage =
        localStorage.getItem(`selectedGettingOrderMethodName-${business?.id}`);
      if (selectedFulfillmentTypeNameByUserFromLocalStorage) {
        setFulfillmentType(
          fulfillmentTypes?.find(
            (method) =>
              method.name === selectedFulfillmentTypeNameByUserFromLocalStorage
          )
        );
      } else if (fulfillmentTypeNameFromLocalStorage) {
        setFulfillmentType(
          (availableFulfillmentTypes.includes(
            fulfillmentTypeNameFromLocalStorage
          ) &&
            fulfillmentTypes?.find(
              (item) => item.name === fulfillmentTypeNameFromLocalStorage
            )) ||
            fulfillmentTypes?.find(
              (item) => item.name === availableFulfillmentTypes[0]
            )
        );
      }
    }
  }, [shoppingPluginData?.data?.delivery_site_type_template, autoSubmit]);

  return {
    selectedFulfillmentType,
    setFulfillmentType,
  };
};
