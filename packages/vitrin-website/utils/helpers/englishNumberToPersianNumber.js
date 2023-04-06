export function englishNumberToPersianNumber(num) {
  const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  if (num && num.toString())
    return num.toString().replace(/[0-9]/g, (w) => id[+w]);
  return "۰";
}
