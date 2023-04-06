export function englishNumberToPersianNumber(num, defaultValue = "0") {
  if ((num || num === 0) && num.toString())
    return num.toString();
  return defaultValue;
}
