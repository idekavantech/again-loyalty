export function persianToEnglishNumber(number) {
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ];
  if (typeof number === "string") {
    for (let i = 0; i < 10; i += 1) {
      // eslint-disable-next-line no-param-reassign
      number = number
        .replace(persianNumbers[i], i)
        .replace(arabicNumbers[i], i);
    }
  }
  return number;
}
