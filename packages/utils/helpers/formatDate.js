import moment from "moment-jalaali";
import { englishNumberToPersianNumber } from "./englishNumberToPersianNumber";
import { getMonthName } from "./getMonthName";

export const formatDate = (inputDate) => {
  const date = moment(inputDate, "jYYYY/jM/jD");
  return `${englishNumberToPersianNumber(date.jDate())} ${getMonthName(
    date.jMonth() + 1
  )}`;
};
