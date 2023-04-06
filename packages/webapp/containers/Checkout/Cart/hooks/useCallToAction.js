import { useEffect, useState } from "react";

export const useCallToAction = (
  isAuthenticated,
  shoppingPluginData,
  selectedFulfillmentType
) => {
  const [callToActionConfig, setCallToActionConfig] = useState({
    label: "ادامه فرایند خرید",
    isDisabled: false,
  });
  useEffect(() => {
    if (!isAuthenticated) {
      setCallToActionConfig({
        label: "ثبت‌نام/ورود",
        isDisabled: false,
      });
    } else if (
      shoppingPluginData?.data?.delivery_site_type_template === 2 &&
      !selectedFulfillmentType?.name
    ) {
      setCallToActionConfig({
        label: "لطفا نحوه دریافت سفارش را مشخص نمایید.",
        isDisabled: true,
      });
    } else {
      setCallToActionConfig({
        label: "ادامه فرایند خرید",
        isDisabled: false,
      });
    }
  }, [
    selectedFulfillmentType?.name,
    isAuthenticated,
    shoppingPluginData?.data?.delivery_site_type_template,
  ]);
  return {
    callToActionConfig,
  };
};
