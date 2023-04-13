import { englishNumberToPersianNumber } from "./englishNumberToPersianNumber";
import { getMonthName } from "./getMonthName";
import { getWeekDay } from "./getWeekDay";
import moment from "moment";

export function deliveryTimeFormatter(deliveryTime) {
  const toTime = moment.unix(deliveryTime);
  const toDateDay = englishNumberToPersianNumber(toTime.date());
  const toDateMonth = getMonthName(toTime.month() + 1);
  const toDateWeekDay = getWeekDay(toTime.isoWeekday());
  return `until the${toDateWeekDay} ${toDateDay} ${toDateMonth} ${englishNumberToPersianNumber(
    toTime.format("HH:mm")
  )}`;
}
