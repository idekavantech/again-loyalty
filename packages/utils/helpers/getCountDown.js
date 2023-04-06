export function getCountDown(duration) {
  const timer = duration;
  let minutes;
  let seconds;
  let hours;
  hours = parseInt(timer / 3600, 10);
  minutes = parseInt((timer % 3600) / 60, 10);
  seconds = parseInt((timer % 3600) % 60, 10);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  if (timer - 1 < 0) {
    return null;
  }
  return `${hours}:${minutes}:${seconds}`;
}
