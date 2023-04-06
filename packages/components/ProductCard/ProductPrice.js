/**
 *
 * AddNewItemSection
 *
 */

import React, { memo } from "react";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { strawberryI } from "@saas/utils/colors";

function ProductPrice({ discountedPrice, initialPrice }) {
  if (!initialPrice) return null;
  const discountPercent = calculateDiscountPercent(
    initialPrice,
    discountedPrice
  );
  return initialPrice - discountedPrice ? (
    <div className="d-flex flex-row-reverse align-items-center justify-content-between">
      <div className="u-text-darkest-grey d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
          {priceFormatter(initialPrice) && (
            <div className="u-text-line-through text-right">
              {priceFormatter(initialPrice)}
            </div>
          )}
          {discountPercent ? (
            <div
              className="c-btn-discount u-fontNormal mr-1"
              style={{
                padding: 4,
                color: "white",
                backgroundColor: strawberryI,
                borderRadius: 4,
              }}
            >
              <span>{englishNumberToPersianNumber(discountPercent)}٪</span>
            </div>
          ) : null}
        </div>
        <div className="u-text-black u-fontMedium text-right u-fontWeightBold">
          {priceFormatter(discountedPrice)}
          <span className="u-font-semi-small u-fontWeightNormal"> تومان </span>
        </div>
      </div>
    </div>
  ) : (
    priceFormatter(initialPrice) && (
      <div className="u-text-black u-fontMedium text-right u-fontWeightBold py-2">
        {priceFormatter(initialPrice)}
        <span className="u-font-semi-small u-fontWeightNormal"> تومان </span>
      </div>
    )
  );
}

export default memo(ProductPrice);
