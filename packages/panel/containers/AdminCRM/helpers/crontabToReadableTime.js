import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

export const crontabToReadableTime = (crontab) => {
  if (!crontab || isNaN(Number(crontab.hour)) || isNaN(Number(crontab.minute))) return "";
  const { hour, minute } = crontab;
  const formattedHour = ("0" + hour).slice(-2);
  const formattedMinutes = ("0" + minute).slice(-2);
  return englishNumberToPersianNumber(`${formattedHour}:${formattedMinutes}`);
};
