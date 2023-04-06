export function nationalIdValidator(nationalId) {
  if (!/^\d{10}$/.test(nationalId)) return false;
  const check = +nationalId[9];
  const sum =
    nationalId
      .split("")
      .slice(0, 9)
      .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
  return sum < 2 ? check === sum : check + sum === 11;
}
