import { useState } from "react";

export const useCallToAction = (isLoading, orders, orderInfo) => {
  const [callToActionConfig, setCallToActionConfig] = useState({
    label: "تایید و ثبت سفارش",
    onClick: null,
    isDisabled: false,
  });
  const isSubmitButtonDisabled =
    isLoading ||
    !orders?.length ||
    callToActionConfig.isDisabled ||
    orderInfo?.total_price === null;
  return {
    callToActionConfig,
    setCallToActionConfig,
    isSubmitButtonDisabled,
  };
};
