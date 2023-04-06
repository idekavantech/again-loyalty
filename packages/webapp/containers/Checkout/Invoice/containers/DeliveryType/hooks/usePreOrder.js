import { useEffect, useMemo, useState } from "react";

import {
  DELIVERY_TYPE_FAST,
  PRE_ORDER_ACTIVE,
  PRE_ORDER_DELAYED,
  PRE_ORDER_INACTIVE,
  PRE_ORDER_NORMAL,
} from "@saas/plugins/Shopping/constants";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { preOrderTimeRanges } from "containers/Checkout/Invoice/containers/DeliveryType/constants";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

export const usePreOrder = (
  workingHours,
  today,
  tomorrow,
  moment,
  selectedDeliveryMethod
) => {
  const [selectedPreOrderTimingMethod, selectPreOrderTimingMethod] = useState(
    isBusinessOpenNow(workingHours) ? PRE_ORDER_NORMAL : PRE_ORDER_DELAYED
  );
  const [selectedDayForDeliveryPreOrder, setDayForDeliveryPreOrder] =
    useState(today);
  const [selectedTimeForDeliveryPreOrder, selectTimeForDeliveryPreOrder] =
    useState(null);
  const availableTimeRangeForTodayDeliveryPreOrder = useMemo(() => {
    return preOrderTimeRanges.filter(
      (timeRange) =>
        Date.parse(moment().format("jYYYY/jM/jD HH:mm")) <
          Date.parse(`${today} ${timeRange.value}`) &&
        isBusinessOpenNow(
          workingHours,
          Date.parse(
            `${moment(today, "jYYYY/jM/jD").format("YYYY-M-D")} ${
              timeRange.value
            }`
          )
        )
    );
  }, [workingHours]);
  const availableTimeRangeForTomorrowDeliveryPreOrder = useMemo(() => {
    return preOrderTimeRanges.filter((timeRange) =>
      isBusinessOpenNow(
        workingHours,
        Date.parse(
          `${moment(tomorrow, "jYYYY/jM/jD").format("YYYY-M-D")} ${
            timeRange.value
          }`
        )
      )
    );
  }, [workingHours]);
  const fastPreorderChosenDeliveryTime = useMemo(() => {
    if (selectedDayForDeliveryPreOrder && selectedTimeForDeliveryPreOrder) {
      const convertedToEnglishDay = persianToEnglishNumber(
        selectedDayForDeliveryPreOrder
      );
      return {
        from_time: moment(
          `${convertedToEnglishDay} ${selectedTimeForDeliveryPreOrder}`,
          "jYYYY/jM/jD HH:mm"
        ).unix(),
        to_time:
          moment(
            `${convertedToEnglishDay} ${selectedTimeForDeliveryPreOrder}`,
            "jYYYY/jM/jD HH:mm"
          ).unix() +
          30 * 60,
      };
    } else {
      return null;
    }
  }, [selectedDayForDeliveryPreOrder, selectedTimeForDeliveryPreOrder]);
  useEffect(() => {
    selectTimeForDeliveryPreOrder(
      selectedDayForDeliveryPreOrder === today
        ? availableTimeRangeForTodayDeliveryPreOrder?.[0]?.value ||
            preOrderTimeRanges[0].value
        : availableTimeRangeForTomorrowDeliveryPreOrder?.[0]?.value ||
            preOrderTimeRanges[0].value
    );
  }, [selectedDayForDeliveryPreOrder]);

  const isSelectedDeliveryMethodFastWithoutPreorderOutOfWorkingHours =
    selectedDeliveryMethod?.timing.type === DELIVERY_TYPE_FAST &&
    selectedDeliveryMethod?.timing.pre_order?.status === PRE_ORDER_INACTIVE &&
    !isBusinessOpenNow(workingHours);

  const isSelectedDeliveryMethodFastWithDelayedPreorderWithoutTodayAndTomorrow =
    selectedDeliveryMethod?.timing.type === DELIVERY_TYPE_FAST &&
    selectedDeliveryMethod?.timing.pre_order?.status === PRE_ORDER_ACTIVE &&
    selectedDeliveryMethod?.timing?.pre_order?.type === PRE_ORDER_DELAYED &&
    !availableTimeRangeForTodayDeliveryPreOrder?.length &&
    !availableTimeRangeForTomorrowDeliveryPreOrder?.length;

  const selectedDeliveryMethodIsNotAvailableRightNow =
    isSelectedDeliveryMethodFastWithoutPreorderOutOfWorkingHours ||
    isSelectedDeliveryMethodFastWithDelayedPreorderWithoutTodayAndTomorrow;

  const timesRange =
    selectedDayForDeliveryPreOrder === today
      ? availableTimeRangeForTodayDeliveryPreOrder
      : availableTimeRangeForTomorrowDeliveryPreOrder;
  useEffect(() => {
    setDayForDeliveryPreOrder(
      availableTimeRangeForTodayDeliveryPreOrder?.length ? today : tomorrow
    );
  }, [availableTimeRangeForTodayDeliveryPreOrder]);
  const isPreOrderComponentActivated =
    selectedDeliveryMethod?.timing?.type === DELIVERY_TYPE_FAST &&
    selectedDeliveryMethod?.timing?.pre_order?.type === PRE_ORDER_DELAYED &&
    selectedDeliveryMethod?.timing?.pre_order?.status === PRE_ORDER_ACTIVE &&
    !isSelectedDeliveryMethodFastWithDelayedPreorderWithoutTodayAndTomorrow;
  return {
    selectedPreOrderTimingMethod,
    selectPreOrderTimingMethod,
    selectedDayForDeliveryPreOrder,
    setDayForDeliveryPreOrder,
    selectedTimeForDeliveryPreOrder,
    selectTimeForDeliveryPreOrder,
    availableTimeRangeForTodayDeliveryPreOrder,
    availableTimeRangeForTomorrowDeliveryPreOrder,
    timesRange,
    fastPreorderChosenDeliveryTime,
    isPreOrderComponentActivated,
    selectedDeliveryMethodIsNotAvailableRightNow,
  };
};
