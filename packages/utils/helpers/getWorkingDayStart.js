import moment from "moment";
import { getNextWorkingDayStart } from "./getNextWorkingDayStart";
import { persianToEnglishNumber } from "./persianToEnglishNumber";

export function getWorkingDayStart(workingHours, date) {
  const today = date ? moment(date).isoWeekday() : moment().isoWeekday();
  const hour = parseInt(persianToEnglishNumber(moment().format("HH")), 10);
  const minute = parseInt(persianToEnglishNumber(moment().format("mm")), 10);

  const todayHours = workingHours[today];
  if (todayHours && todayHours.length) {
    todayHours.slice().sort((a, b) => {
      const aFrom = parseInt(a.from.split(":")[0], 10);
      const bFrom = parseInt(b.from.split(":")[0], 10);
      if (aFrom < bFrom) return -1;
      if (aFrom > bFrom) return 1;
      return 0;
    });
    for (let i = 0; i < todayHours.length; i += 1) {
      const todayHour = parseInt(todayHours[i].from.split(":")[0], 10);
      const todayMinute = parseInt(todayHours[i].from.split(":")[1], 10);
      if (hour * 60 + minute < todayHour * 60 + todayMinute) {
        return {
          dayName: "Today",
          openingTime: todayHours[i].from,
          closingTime: todayHours[i].to,
        };
      }
    }
    return getNextWorkingDayStart(workingHours);
  }
  return getNextWorkingDayStart(workingHours);
}
