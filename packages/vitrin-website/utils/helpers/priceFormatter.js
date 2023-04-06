import { addCommaToPrice } from "./addCommaToPrice";
import { englishNumberToPersianNumber } from "./englishNumberToPersianNumber";

export const priceFormatter = (price) =>
  englishNumberToPersianNumber(addCommaToPrice(parseInt(price, 10)));
