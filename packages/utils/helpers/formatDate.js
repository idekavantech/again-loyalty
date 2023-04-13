import moment from "moment";
import { englishNumberToPersianNumber } from "./englishNumberToPersianNumber";
import { getMonthName } from "./getMonthName";

export const formatDate = (inputDate) => {
  const date = moment(inputDate, "YYYY/jM/jD");
  return `${englishNumberToPersianNumber(date.date())} ${getMonthName(
    date.month() + 1
  )}`;
};
