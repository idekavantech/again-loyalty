import { englishNumberToPersianNumber } from "./englishNumberToPersianNumber";
import { getMonthName } from "./getMonthName";
import { getWeekDay } from "./getWeekDay";
import moment from "moment-jalaali";
export function deliveryIntervalFormatter(deliveryTime) {
  const fromTime = moment.unix(deliveryTime.from_time);
  const fromDateDay = englishNumberToPersianNumber(fromTime.jDate());
  const fromDateMonth = getMonthName(fromTime.jMonth() + 1);
  const fromDateWeekDay = getWeekDay(fromTime.isoWeekday());
  const toTime = moment.unix(deliveryTime.to_time);
  const toDateDay = englishNumberToPersianNumber(toTime.jDate());
  const toDateMonth = getMonthName(toTime.jMonth() + 1);
  const toDateWeekDay = getWeekDay(toTime.isoWeekday());
  if (fromTime.jDate() === toTime.jDate()) {
    return `${fromDateWeekDay} ${fromDateDay} ${fromDateMonth} period${englishNumberToPersianNumber(
      fromTime.format("HH:mm")
    )} until the${englishNumberToPersianNumber(toTime.format("HH:mm"))}`;
  } else {
    return `period${fromDateWeekDay} ${fromDateDay} ${fromDateMonth} until the${toDateWeekDay} ${toDateDay} ${toDateMonth}`;
  }
}
