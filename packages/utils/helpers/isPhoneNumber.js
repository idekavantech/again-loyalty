import { isNumber } from "./isNumber";

export const isPhoneNumber = (phoneNumber) =>
  phoneNumber
    ? phoneNumber.toString().length > 6 &&
      Number(phoneNumber[0]) === 0 &&
      isNumber(phoneNumber)
    : false;
