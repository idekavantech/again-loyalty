import {
  CLOSING_TYPE_AUTOMATIC,
  CLOSING_TYPE_HOUR,
  CLOSING_TYPE_MANUAL,
  DEFAULT_POPUP,
  IN_THE_WORKING_HOURS,
  NO_CONDITION_POP_UP,
  NO_POP_UP,
  OUT_OF_THE_WORKING_HOURS,
} from "@saas/plugins/Shopping/constants";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";

export const usePopup = (
  isCustomerOrderingOpen,
  themeConfig,
  shoppingPluginData,
  workingHours,
  business,
  nextWorkingDay
) => {
  const closingType =
    shoppingPluginData?.data?.closing_type || CLOSING_TYPE_MANUAL;
  const popupCustomText =
    themeConfig?.plugins?.[SHOPPING_PLUGIN]?.ordering_popup?.text || "";
  const popupType =
    themeConfig?.plugins?.[SHOPPING_PLUGIN]?.ordering_popup?.type ||
    DEFAULT_POPUP;
  const stateOfCurrentTimeInBusinessHours = isBusinessOpenNow(workingHours)
    ? IN_THE_WORKING_HOURS
    : OUT_OF_THE_WORKING_HOURS;
  const businessHasPreOrder =
    typeof business?.has_pre_order !== "boolean"
      ? false
      : business?.has_pre_order;
  const shouldPopupBeOpen =
    popupType === NO_CONDITION_POP_UP ||
    (popupType !== NO_POP_UP &&
      (!isCustomerOrderingOpen ||
        (stateOfCurrentTimeInBusinessHours === OUT_OF_THE_WORKING_HOURS &&
          businessHasPreOrder)));
  const overrideMessage =
    popupType === NO_CONDITION_POP_UP ? popupCustomText : null;
  const closingTypesMessages = {
    [CLOSING_TYPE_MANUAL]: "موقتا قادر به دریافت سفارش نیستیم.",
    [CLOSING_TYPE_AUTOMATIC]:
      nextWorkingDay &&
      `خارج از ساعت کاری هستیم. شروع سفارش‌گیری از ${
        nextWorkingDay?.dayName
      } ساعت ${englishNumberToPersianNumber(nextWorkingDay.openingTime)}`,
    [CLOSING_TYPE_HOUR]:
      "حداقل از یک ساعت دیگر قادر به دریافت سفارش خواهیم بود.",
  };
  const preOrderTypeMessage =
    nextWorkingDay &&
    ` درحال حاضر خارج از ساعت کاری هستیم. در صورت ثبت سفارش،  ${
      nextWorkingDay.dayName
    } ساعت ${englishNumberToPersianNumber(
      nextWorkingDay.openingTime
    )} پردازش می‌شود.`;
  const popupHTMLContent = !isCustomerOrderingOpen
    ? overrideMessage || closingTypesMessages?.[closingType]
    : overrideMessage || preOrderTypeMessage;
  return {
    popupHTMLContent,
    shouldPopupBeOpen,
  };
};
