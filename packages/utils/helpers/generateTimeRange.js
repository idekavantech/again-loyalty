import { englishNumberToPersianNumber } from "./englishNumberToPersianNumber";

export function generateTimeRange(minuteInterval) {
  const x = minuteInterval; // minutes interval
  const times = []; // time array
  let tt = 0; // start time
  // const ap = ['AM', 'PM']; // AM-PM

  // loop to increment the time and push results in array
  for (let i = 0; tt <= 24 * 60; i += 1) {
    const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    const mm = tt % 60; // getting minutes of the hour in 0-55 format
    const hour =
      hh % 24 >= 10
        ? (hh % 24).toString().slice(-2)
        : `0${(hh % 24).toString().slice(-2)}`;
    const minute =
      mm >= 10 ? mm.toString().slice(-2) : `0${mm.toString().slice(-2)}`;
    if (tt === 24 * 60)
      times[i] = {
        value: `23:59`,
        label: englishNumberToPersianNumber(`23:59`),
      };
    else
      times[i] = {
        value: `${hour}:${minute}`,
        label: englishNumberToPersianNumber(`${hour}:${minute}`),
      };
    tt += x;
  }
  return times;
}
