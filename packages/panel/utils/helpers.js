export const formatDateObjectToNormal = (date) => {
  const year = date?.year ? date?.year : "/";
  const month = date?.month ? date?.month : "/";
  const day = date?.day ? date?.day : "/";
  return year + "-" + month + "-" + day;
};

export const formatDateToObject = (date) => {
  const dateFormat = new Date(date)
  const isDateValid = dateFormat instanceof Date && !isNaN(dateFormat) && dateFormat.getTime() > new Date("2000-1-1");
  if (!isDateValid) return null;
  const year = dateFormat.getFullYear()
  const month = dateFormat.getMonth() + 1
  const day = dateFormat.getDate()
  return { year, month, day };
}

export const hashStringToInt = (inputString) => {
  var hash = 0,
    i,
    chr;
  if (inputString.length === 0) return hash;
  for (i = 0; i < inputString.length; i++) {
    chr = inputString.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const isNullish = (input) => {
  return input === null || input === undefined;
};

export const isCardNumberValid = (cardNumber) => {
  let L = cardNumber.length;
  if (
    L < 16 ||
    parseInt(cardNumber.substr(1, 10), 10) === 0 ||
    parseInt(cardNumber.substr(10, 6), 10) === 0
  )
    return false;
  let s = 0;
  let k, d;
  for (let i = 0; i < 16; i++) {
    k = i % 2 === 0 ? 2 : 1;
    d = parseInt(cardNumber.substr(i, 1), 10) * k;
    s += d > 9 ? d - 9 : d;
  }
  return s % 10 === 0;
};
