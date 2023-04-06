import { useState } from "react";

import { getDefaultPaymentMethod } from "containers/Checkout/Invoice/constants";

export const usePayment = (pluginData) => {
  const paymentTypes = pluginData?.payment_data?.types;
  const [isPaymentDropDownOpen, setPaymentDropDownOpen] = useState(false);
  const [selectedPaymentMethod, setPaymentMethod] = useState(() =>
    getDefaultPaymentMethod(paymentTypes)
  );
  const [isPaymentMethodsDrawerOpen, setPaymentMethodsDrawerOpen] =
    useState(false);

  return {
    paymentTypes,
    isPaymentDropDownOpen,
    setPaymentDropDownOpen,
    selectedPaymentMethod,
    setPaymentMethod,
    isPaymentMethodsDrawerOpen,
    setPaymentMethodsDrawerOpen,
  };
};
