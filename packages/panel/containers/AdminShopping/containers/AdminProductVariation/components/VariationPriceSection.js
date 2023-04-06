import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Input from "@saas/components/Input";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";

import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import TextSwitch from "@saas/components/ModernSwitch";
import Collapse from "@material-ui/core/Collapse";
import { borderColor, dust } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";

export default function VariationPriceSection({
  variation,
  onVariationInitialPriceChange,
  onVariationFinalUnitCostChange,
  onVariationDiscountedPriceChange,
  onVariationPackagingPriceChange,
}) {
  const theme = useTheme();
  const [isPercent, setIsPercent] = useState(true);
  const {
    packaging_price: packagingPrice,
    initial_price: initialPrice,
    discounted_price: discountedPrice,
    final_unit_cost: finalPrice,
    ingredients,
  } = variation;
  return (
    <Paper className="my-4" id="variation-price-section">
      <div
        className="d-flex justify-content-between flex-1 px-4 py-4"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div>
          <div className="u-fontLarge u-fontWeightBold">
            Price Management and Discount
          </div>
          <div className="mt-2">
            Price of sale, purchase, discount, product profits and packaging fee in
            Set this section.
          </div>
        </div>
        <div></div>
      </div>
      <div
        className="d-flex px-2 flex-wrap pt-4"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div className="col-12 col-lg-6 px-2 mb-2">
          <Input
            labelPlacement="top"
            label="price product($)"
            selectOnFocus
            value={initialPrice}
            size="medium"
            className="u-fontNormal"
            priceInput
            onChange={onVariationInitialPriceChange}
          />
        </div>
        <div className="col-12 col-lg-6 px-2 mb-2">
          <div className="d-flex position-relative align-items-center">
            <TextSwitch
              width={120}
              height={36}
              style={{ top: 30, left: 4, boxShadow: "none" }}
              className="position-absolute z-index-2"
              isSwitchOn={isPercent}
              toggleSwitch={setIsPercent}
              texts={["$", "Percent"]}
            />
            <Input
              size="medium"
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
              onChange={onVariationDiscountedPriceChange({
                isPercent,
                initialPrice,
              })}
              labelPlacement="top"
              placeholder={`${isPercent ? "Percent" : "the amount of"} Discount`}
              label={`Product discount(${isPercent ? "Percent" : "$"})`}
              numberOnly
            />
          </div>
        </div>
        <div className="col-12 px-2 mb-4">
          <div
            style={{ border: `1px solid ${dust}` }}
            className="d-flex u-border-radius-4 col-12 px-0 align-items-center overflow-hidden"
          >
            <div
              style={{
                height: 40,
                backgroundColor: theme.palette.background.paper,
              }}
              className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
            >
              The final price
            </div>
            <div
              style={{
                height: 40,
                cursor: "default",
                backgroundImage:
                  "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                backgroundColor: dust,
                borderRight: `1px solid ${dust}`,
                color: theme.palette.text.disabled,
              }}
              className="d-flex flex-1 px-0 col-8 align-items-center direction-ltr justify-content-end px-3"
            >
              {priceFormatter(Math.round(discountedPrice))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-4">
        <Input
          selectOnFocus
          style={
            ingredients?.length
              ? {
                  height: 40,
                  backgroundImage:
                    "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                  backgroundColor: dust,
                  borderRight: `1px solid ${dust}`,
                }
              : {}
          }
          disabled={ingredients?.length}
          labelPlacement="top"
          placeholder="The purchase price of the market"
          label={
            <div className="d-flex align-items-center">
              Purchase price
              <div className="u-font-semi-small mr-1">
                (Will never be displayed to the customer)
              </div>
            </div>
          }
          value={finalPrice}
          size="medium"
          className="u-fontNormal"
          priceInput
          onChange={onVariationFinalUnitCostChange}
          numberOnly
        />
      </div>
      <Collapse
        in={finalPrice}
        className="px-4"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div
          className="mt-2 mb-4 u-border-radius-4 overflow-hidden"
          style={{ border: `1px solid ${borderColor}`, borderBottom: "none" }}
        >
          <div
            className="d-flex align-items-center"
            style={{ borderBottom: `1px solid ${borderColor}` }}
          >
            <div
              style={{ backgroundColor: theme.palette.background.paper }}
              className="py-3 col-6 text-center"
            >
              profit marigin %
            </div>
            <div
              style={{
                borderRight: `1px solid ${borderColor}`,
                backgroundColor: theme.palette.background.paper,
              }}
              className="py-3 col-6 text-center"
            >
              profit marigin($)
            </div>
          </div>
          <div
            className="d-flex align-items-center"
            style={{ borderBottom: `1px solid ${borderColor}` }}
          >
            <div className="mt-1 direction-ltr col-6 py-3 text-center">
              {englishNumberToPersianNumber(
                Math.round(((initialPrice - finalPrice) * 100) / finalPrice)
              )}
              ٪
            </div>
            <div
              style={{ borderRight: `1px solid ${borderColor}` }}
              className="mt-1 direction-ltr col-6 py-3 text-center"
            >
              {priceFormatter(initialPrice - finalPrice)}
            </div>
          </div>
          <Collapse in={discountedPrice < initialPrice}>
            <div
              className="d-flex align-items-center"
              style={{ borderBottom: `1px solid ${borderColor}` }}
            >
              <div
                style={{ backgroundColor: theme.palette.background.paper }}
                className="py-3 col-6 text-center"
              >
                Profit margins with a discount %
              </div>
              <div
                style={{
                  borderRight: `1px solid ${borderColor}`,
                  backgroundColor: theme.palette.background.paper,
                }}
                className="py-3 col-6 text-center"
              >
                Profit margins with discounts($)
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="mt-1 py-3 direction-ltr col-6 text-center">
                {englishNumberToPersianNumber(
                  Math.round(
                    ((discountedPrice - finalPrice) * 100) / finalPrice
                  )
                )}
                ٪
              </div>
              <div
                style={{ borderRight: `1px solid ${borderColor}` }}
                className="mt-1 py-3 direction-ltr col-6 text-center"
              >
                {priceFormatter(discountedPrice - finalPrice)}
              </div>
            </div>
          </Collapse>
        </div>
      </Collapse>

      <div className="p-4">
        <Input
          labelPlacement="top"
          selectOnFocus
          size="medium"
          placeholder="Packaging cost"
          label="Product packaging fee($)"
          value={
            packagingPrice ? englishNumberToPersianNumber(packagingPrice) : ""
          }
          onChange={onVariationPackagingPriceChange}
          numberOnly
        />
      </div>
    </Paper>
  );
}
