import React, { useState } from "react";
import Input from "@saas/components/Input";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import TextSwitch from "@saas/components/ModernSwitch";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function PriceSection({
  error = "",
  product,
  onProductInitialPriceChange,
  onProductDiscountedPriceChange,
  productHasVariations,
}) {
  const [isPercent, setIsPercent] = useState(true);
  const { maxWidth430: isMobile } = useResponsive();

  const {
    variations: [
      { initial_price: initialPrice, discounted_price: discountedPrice },
    ],
  } = product;

  return (
    <div className="mb-4 mt-2" id="product-price-section">
      <div className="d-flex flex-wrap">
        <div className="col-12 col-lg-6">
          <Input
            labelPlacement="top"
            label="price product($)"
            placeholder="price product"
            selectOnFocus
            value={initialPrice}
            disabled={productHasVariations}
            className="u-fontNormal"
            priceInput
            onChange={onProductInitialPriceChange}
            assistive={error}
            error={Boolean(error)}
            InputProps={{ className: "u-height-48 u-border-radius-8" }}
            labelClassName={"u-fontMedium"}
          />
        </div>
        <div className={`col-12 col-lg-6 ${isMobile ? "mt-3" : ""}`}>
          <div className="d-flex position-relative align-items-center">
            <TextSwitch
              width={120}
              height={36}
              style={{ top: 35, left: 4, boxShadow: "none" }}
              className="position-absolute z-index-2"
              isSwitchOn={isPercent}
              toggleSwitch={setIsPercent}
              texts={["$", "Percent"]}
              disabled={productHasVariations}
            />
            <Input
              selectOnFocus
              value={
                isPercent
                  ? englishNumberToPersianNumber(
                      calculateDiscountPercent(
                        reversePriceFormatter(initialPrice),
                        discountedPrice
                      ),
                      ""
                    )
                  : englishNumberToPersianNumber(
                      reversePriceFormatter(initialPrice) - discountedPrice,
                      ""
                    )
              }
              className={`u-fontNormal ${
                !isPercent ? "productDiscountToman" : ""
              }`}
              priceInput={!isPercent}
              onChange={onProductDiscountedPriceChange({
                isPercent,
                initialPrice,
              })}
              labelPlacement="top"
              placeholder={`${isPercent ? "Percent" : "the amount of"} Discount`}
              label={`Product discount(${isPercent ? "Percent" : "$"})`}
              numberOnly
              disabled={productHasVariations}
              InputProps={{ className: "u-height-48 u-border-radius-8" }}
              labelClassName={"u-fontMedium"}
            />
          </div>
          <div
            style={{
              ...(productHasVariations ? { color: "rgba(0, 0, 0, 0.38)" } : {}),
            }}
            className={
              "d-flex w-100 justify-content-end mt-3 align-items-center"
            }
          >
            <h2 className={"ml-2"} style={{ fontSize: 15, fontWeight: 600 }}>
              {` Final Price Price: ${priceFormatter(
                discountedPrice ? Math.round(discountedPrice) : 0
              )}`}
            </h2>
            <span style={{ fontSize: 11 }}>$</span>
          </div>
        </div>
      </div>
    </div>
  );
}
