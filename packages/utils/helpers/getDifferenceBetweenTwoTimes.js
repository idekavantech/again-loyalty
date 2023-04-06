export function getDifferenceBetweenTwoTimes(firstTime, secondTime) {
  const fromHour = parseInt(firstTime.split(":")[0], 10);
  const fromMinute = parseInt(firstTime.split(":")[1], 10);
  const toHour = parseInt(secondTime.split(":")[0], 10);
  const toMinute = parseInt(secondTime.split(":")[1], 10);
  return toHour * 60 + toMinute - (fromHour * 60 + fromMinute);
}
