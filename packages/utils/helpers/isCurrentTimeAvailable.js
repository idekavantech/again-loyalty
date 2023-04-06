import moment from "moment-jalaali";
export function isCurrentTimeAvailable(shifts) {
  const nowDate = moment();
  const day = shifts;
  if (day) {
    if (!day.length) return false;
    const result = day.filter((shift) => {
      const fromHour = parseInt(shift.from.split(":")[0], 10);
      const toHour = parseInt(shift.to.split(":")[0], 10);
      const fromMinute = parseInt(shift.from.split(":")[1], 10);
      const toMinute = parseInt(shift.to.split(":")[1], 10);
      const nowHour = nowDate.hours();
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
