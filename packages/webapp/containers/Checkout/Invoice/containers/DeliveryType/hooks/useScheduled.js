import { useEffect, useMemo, useState } from "react";

import { DELIVERY_TYPE_SCHEDULED } from "@saas/plugins/Shopping/constants";
import { getAvailableDeliveryTimes } from "@saas/utils/helpers/getAvailableDeliveryTimes";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

export const useScheduled = (selectedDeliveryMethod, _today, moment) => {
  const [selectedDayForDeliveryScheduled, setDayForDeliveryScheduled] =
    useState(null);
  const [selectedTimeForDeliveryScheduled, setTimeForDeliveryScheduled] =
    useState(null);
  const isScheduledComponentActivated =
    selectedDeliveryMethod?.timing.type === DELIVERY_TYPE_SCHEDULED;
  const scheduledDeliveryDaysShownNumber =
    selectedDeliveryMethod?.timing.type === DELIVERY_TYPE_SCHEDULED &&
    (typeof selectedDeliveryMethod?.timing.no_next_delivery_days === "undefined"
      ? 4
      : selectedDeliveryMethod?.timing.no_next_delivery_days);
  const deliveryTimes = selectedDeliveryMethod?.timing.delivery_times;
  let availableDeliveryTimes = useMemo(() => {
    if (deliveryTimes)
      return getAvailableDeliveryTimes(
        deliveryTimes,
        _today,
        selectedDeliveryMethod?.timing.maximum_delivery_time?.type || "day",
        selectedDeliveryMethod?.timing.maximum_delivery_time?.value || 0
      )?.filter(
        (time) =>
          Date.parse(time.date) <=
          Date.parse(
            persianToEnglishNumber(
              moment()
                .add(scheduledDeliveryDaysShownNumber, "day")
                .locale("fa")
                .format("jYYYY/jM/jD")
            )
          )
      );
    return null;
  }, [selectedDeliveryMethod]);

  const availableTimeRangeForTodayDeliveryScheduled = useMemo(() => {
    if (selectedDayForDeliveryScheduled && availableDeliveryTimes) {
      availableDeliveryTimes.filter(
        (date) =>
          date.date === selectedDayForDeliveryScheduled &&
          date.shifts.map((shift) => {
            if (
              Date.parse(moment().format("jYYYY/jM/jD HH:mm")) <
              Date.parse(
                `${selectedDayForDeliveryScheduled} ${shift.to.substr(0, 5)}`
              )
            ) {
              return true;
            } else {
              return false;
            }
          })
      );
    }
  }, [selectedDayForDeliveryScheduled, availableDeliveryTimes]);
  const scheduledChosenDeliveryTime = useMemo(() => {
    if (selectedDayForDeliveryScheduled && selectedTimeForDeliveryScheduled) {
      return {
        from_time: moment(
          `${selectedDayForDeliveryScheduled} ${selectedTimeForDeliveryScheduled.from}`,
          "jYYYY/jM/jD HH:mm"
        ).unix(),
        to_time: moment(
          `${selectedDayForDeliveryScheduled} ${selectedTimeForDeliveryScheduled.to}`,
          "jYYYY/jM/jD HH:mm"
        ).unix(),
      };
    } else {
      return null;
    }
  }, [selectedDayForDeliveryScheduled, selectedTimeForDeliveryScheduled]);
  useEffect(() => {
    if (availableDeliveryTimes) {
      setDayForDeliveryScheduled(availableDeliveryTimes[0]?.date);
      setTimeForDeliveryScheduled(availableDeliveryTimes[0]?.shifts[0]);
    }
  }, [selectedDeliveryMethod, availableDeliveryTimes]);
  useEffect(() => {
    if (availableTimeRangeForTodayDeliveryScheduled) {
      setTimeForDeliveryScheduled(
        availableTimeRangeForTodayDeliveryScheduled[0]
      );
    }
  }, [availableTimeRangeForTodayDeliveryScheduled]);
  return {
    selectedDayForDeliveryScheduled,
    setDayForDeliveryScheduled,
    selectedTimeForDeliveryScheduled,
    setTimeForDeliveryScheduled,
    availableDeliveryTimes,
    scheduledChosenDeliveryTime,
    isScheduledComponentActivated,
  };
};
