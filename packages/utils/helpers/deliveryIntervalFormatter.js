import { englishNumberToPersianNumber } from "./englishNumberToPersianNumber";
import { getMonthName } from "./getMonthName";
import { getWeekDay } from "./getWeekDay";
import moment from "moment";
export function deliveryIntervalFormatter(deliveryTime) {
  const {from_time , to_time} = deliveryTime
  const fromFormattedTime = moment(from_time * 1000).format("DD MMMM YYYY")
  const toFormattedTime = moment(to_time * 1000).format("DD MMMM YYYY");
  return `from ${fromFormattedTime} until ${toFormattedTime}`
}
