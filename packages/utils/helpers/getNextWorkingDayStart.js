import moment from "moment";
import { getWeekDay } from "./getWeekDay";
export function getNextWorkingDayStart(workingHours) {
  const tomorrow = moment().add(1, "day").isoWeekday();
  const tomorrowHours = workingHours[tomorrow];
  if (tomorrowHours && tomorrowHours.length) {
    tomorrowHours.slice().sort((a, b) => {
      const aFrom = parseInt(a.from.split(":")[0], 10);
      const bFrom = parseInt(b.from.split(":")[0], 10);
      if (aFrom < bFrom) return -1;
      if (aFrom > bFrom) return 1;
      return 0;
    });
    return {
      dayName: "Tomorrow",
      openingTime: tomorrowHours[0].from,
      closingTime: tomorrowHours[0].to,
    };
  }
  for (let i = 2; i < 6; i += 1) {
    const nextDay = moment().add(i, "day").isoWeekday();
    const nextDayHours = workingHours[nextDay];
    if (nextDayHours && nextDayHours.length) {
      nextDayHours.slice().sort((a, b) => {
        const aFrom = parseInt(a.from.split(":")[0], 10);
        const bFrom = parseInt(b.from.split(":")[0], 10);
        if (aFrom < bFrom) return -1;
        if (aFrom > bFrom) return 1;
        return 0;
      });
      return {
        dayName: getWeekDay(nextDay),
        openingTime: nextDayHours[0].from,
        closingTime: nextDayHours[0].to,
      };
    }
  }
  return null;
}
