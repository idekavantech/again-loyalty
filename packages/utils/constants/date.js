import jMoment from "moment";

 
 
export const getWeekDays = ["6", "7", "1", "2", "3", "4", "5"];
const defaultMomentToDate = jMoment();
const defaultMomentFromDate = jMoment().add(-6, "day");
export const defaultFromDate = {
  year: defaultMomentFromDate.year(),
  month: defaultMomentFromDate.month() + 1,
  day: defaultMomentFromDate.date(),
};
export const defaultToDate = {
  year: defaultMomentToDate.year(),
  month: defaultMomentToDate.month() + 1,
  day: defaultMomentToDate.date(),
};
