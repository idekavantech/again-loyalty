import { englishNumberToPersianNumber } from "./englishNumberToPersianNumber";
import { persianToEnglishNumber } from "./persianToEnglishNumber";
function addCommaToPrice(num) {
  if (num) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return 0;
}
export const priceFormatter = (price) => {
  if (price === 0) return "0";
  return price
    ? englishNumberToPersianNumber(
        addCommaToPrice(
          parseInt(
            persianToEnglishNumber(price.toString().replace(/,/g, "")),
            10
          )
        )
      )
    : "";
};
