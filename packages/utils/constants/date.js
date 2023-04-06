import jMoment from "moment-jalaali";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
export const getWeekDays = ["6", "7", "1", "2", "3", "4", "5"];
const defaultMomentToDate = jMoment();
const defaultMomentFromDate = jMoment().add(-6, "day");
export const defaultFromDate = {
  year: defaultMomentFromDate.jYear(),
  month: defaultMomentFromDate.jMonth() + 1,
  day: defaultMomentFromDate.jDate(),
};
export const defaultToDate = {
  year: defaultMomentToDate.jYear(),
  month: defaultMomentToDate.jMonth() + 1,
  day: defaultMomentToDate.jDate(),
};
