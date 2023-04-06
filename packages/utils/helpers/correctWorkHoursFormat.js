import { getWeekDays } from "../constants/date";
import { removeSecondsFromDateString } from "./removeSecondsFromDateString";

export function correctWorkHoursFormat(_workHours) {
  let workHours =
    typeof _workHours === "string" ? JSON.parse(_workHours) : _workHours;
  if (workHours) {
    const newWorkHours = {};
    getWeekDays.map((label) => {
      const day = workHours[label];
      newWorkHours[label] = day.map((d) => ({
        from: removeSecondsFromDateString(d.from),
        to: removeSecondsFromDateString(d.to),
      }));
      return false;
    });
    return newWorkHours;
  }
  return {};
}
