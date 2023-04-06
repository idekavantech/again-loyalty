import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import {
  DELIVERY_TYPE_FAST_IN_BUSINESS_TIME_CLOSED,
  DELIVERY_TYPE_FAST_IN_BUSINESS_TIME_CLOSED_MESSAGE,
  PREORDER_TYPE,
} from "containers/Checkout/Invoice/containers/DeliveryType/constants";

export const usePop = (nextDay) => {
  const PREORDER_TYPE_MESSAGE =
    nextDay &&
    ` درحال حاضر خارج از ساعت کاری هستیم. در صورت ثبت سفارش،  ${
      nextDay.dayName
    } ساعت ${englishNumberToPersianNumber(nextDay.openingTime)} پردازش می‌شود.`;

  const popupHTML = {
    [DELIVERY_TYPE_FAST_IN_BUSINESS_TIME_CLOSED]: (
      <div className="u-fontNormal">
        {DELIVERY_TYPE_FAST_IN_BUSINESS_TIME_CLOSED_MESSAGE}
      </div>
    ),
    [PREORDER_TYPE]: (
      <div className="u-fontNormal">{PREORDER_TYPE_MESSAGE}</div>
    ),
  };
  return {
    popupHTML,
  };
};
