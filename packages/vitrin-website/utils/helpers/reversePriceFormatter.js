import { persianToEnglishNumber } from "./persianToEnglishNumber";

export const reversePriceFormatter = (price) => {
  if (price)
    return parseInt(
      persianToEnglishNumber(price.toString().replace(/,/g, "")),
      10
    );
  return 0;
};
