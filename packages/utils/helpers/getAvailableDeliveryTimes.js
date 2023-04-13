import { defaultDeliveryTimes } from "../constants/defaultDeliveryTimes";
import moment from "moment";
import { persianToEnglishNumber } from "./persianToEnglishNumber";

export function getAvailableDeliveryTimes(
  deliveryTimes = defaultDeliveryTimes,
  today,
  startTimeBaseType,
  startTimeBaseValue
) {
  const nextWeekDeliveryTimes = [];
  if (startTimeBaseValue) {
    today.add(startTimeBaseValue, startTimeBaseType);
  }

  for (let i = 0; i < 30; i += 1) {
    const shifts =
      deliveryTimes[today.isoWeekday()]?.filter((timeRange) => {
        if (startTimeBaseType === "day") {
          return true;
        } else {
          return (
            Date.parse(
              persianToEnglishNumber(
                moment()
                  .add(startTimeBaseValue, startTimeBaseType)
                  .format("YYYY/jM/jD HH:mm")
              )
            ) <
              Date.parse(
                persianToEnglishNumber(
                  `${today.format("YYYY/jM/jD")} ${timeRange.from}`
                )
              ) &&
            Date.parse(
              persianToEnglishNumber(
                moment()
                  .add(startTimeBaseValue, startTimeBaseType)
                  .format("YYYY/jM/jD HH:mm")
              )
            ) <
              Date.parse(
                persianToEnglishNumber(
                  `${today.format("YYYY/jM/jD")} ${timeRange.to}`
                )
              )
          );
        }
      }) || [];
    if (shifts.length) {
      nextWeekDeliveryTimes.push({
        date: persianToEnglishNumber(today.format("YYYY/jM/jD")),
        weekDay: today.isoWeekday(),
        shifts,
      });
    }
    today.add(1, "day");
  }
  return nextWeekDeliveryTimes;
}
