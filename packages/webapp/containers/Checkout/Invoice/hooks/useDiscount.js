import { useMemo, useState } from "react";

import { discountMethods } from "containers/Checkout/Invoice/constants";
import { DISCOUNT_CODE, GIFT_CREDIT } from "@saas/plugins/Shopping/constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";

export const useDiscount = (giftCredit, visitCardPluginData) => {
  const usableGiftPerOrder =
    visitCardPluginData?.data?.usable_gift_per_order?.value;
  const [isDiscountDropDownOpen, setDiscountDropDownOpen] = useState(false);
  const [selectedDiscountMethod, setDiscountMethod] = useState(
    discountMethods[giftCredit === 0 ? DISCOUNT_CODE : GIFT_CREDIT]
  );
  const [isDiscountMethodsDrawerOpen, setDiscountMethodsDrawerOpen] =
    useState(false);
  const [code, changeCode] = useState("");
  const [useGift, setUseGift] = useState(true);
  const maxUsableCreditAmount = useMemo(() => {
    return {
      percent: `${englishNumberToPersianNumber(
        usableGiftPerOrder
      )} درصد مبلغ سفارش `,
      amount: `${priceFormatter(usableGiftPerOrder)} تومان`,
    };
  }, [usableGiftPerOrder]);
  return {
    isDiscountDropDownOpen,
    setDiscountDropDownOpen,
    selectedDiscountMethod,
    setDiscountMethod,
    isDiscountMethodsDrawerOpen,
    setDiscountMethodsDrawerOpen,
    maxUsableCreditAmount,
    code,
    changeCode,
    useGift,
    setUseGift,
  };
};
