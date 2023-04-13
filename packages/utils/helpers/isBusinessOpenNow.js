import moment from "moment";

const isLocalTimeIncorrect = (date = null) => {
  const utc = moment.utc();
  const local = date ? moment(date) : moment();

  const timeDiffInMinutes = local.utcOffset() - utc.utcOffset();

  return timeDiffInMinutes === 270;
};

export function isBusinessOpenNow(workingHours, date = null) {
  const nowDate = date ? moment(date) : moment();
  const day =
    typeof workingHours == "string"
      ? JSON.parse(workingHours)[nowDate.isoWeekday()]
      : workingHours[nowDate.isoWeekday()];
  if (day) {
    if (!day.length) return false;
    const result = day?.filter((shift) => {
      const fromHour = parseInt(shift.from.split(":")[0], 10);
      const toHour = parseInt(shift.to.split(":")[0], 10);
      const fromMinute = parseInt(shift.from.split(":")[1], 10);
      const toMinute = parseInt(shift.to.split(":")[1], 10);
      const nowHour = isLocalTimeIncorrect(date)
        ? nowDate.hours() - 1
        : nowDate.hours();
      const nowMinute = nowDate.minutes();
      return (
        nowHour * 60 + nowMinute >= fromHour * 60 + fromMinute &&
        nowHour * 60 + nowMinute <= toHour * 60 + toMinute
      );
    });
    return Boolean(result.length);
  }
  return true;
}
