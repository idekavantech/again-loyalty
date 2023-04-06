import React from "react";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Input from "@saas/components/Input";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";
import { borderColor, dust } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Collapse from "@material-ui/core/Collapse";

export default function StoreAndDeliverySection({
  product,
  setProduct,
  onProductPackagingPriceChange,
  onProductFinalUnitCostChange,
}) {
  const {
    variations: [
      {
        packaging_price: packagingPrice,
        initial_price: initialPrice,
        discounted_price: discountedPrice,
        final_unit_cost: finalPrice,
      },
    ],
    sku,
    ingredients,
  } = product;

  const { minWidth768 } = useResponsive();

  const theme = useTheme();
  return (
    <div>
      <div
        style={{
          padding: `20px ${minWidth768 ? "50px" : "20px"}`,
          fontWeight: 600,
          borderBottom: "1px solid #EEEEEE",
        }}
        className="u-fontVeryLarge"
      >
        Warehouse and send
      </div>

      <AdminProductInBoxWrapper smallPadding>
        <div className="col-12">
          <Input
            labelPlacement="top"
            placeholder="ID of the product"
            label="ID of the product"
            value={sku}
            onChange={(sku) => setProduct({ ...product, sku })}
            InputProps={{ className: "u-height-48 u-border-radius-8" }}
            labelClassName={"u-fontMedium"}
          />
        </div>
        <div className="col-12 mt-3">
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
            onChange={onProductFinalUnitCostChange}
            InputProps={{ className: "u-height-48 u-border-radius-8" }}
            labelClassName={"u-fontMedium"}
            className="u-fontNormal"
            priceInput
          />
        </div>
        <Collapse
          in={finalPrice}
          className="px-4"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          <div
            className="mt-2 mb-4 u-border-radius-4 overflow-hidden"
            style={{
              border: `1px solid ${borderColor}`,
              borderBottom: "none",
            }}
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
                  style={{
                    backgroundColor: theme.palette.background.paper,
                  }}
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
        </Collapse>{" "}
        <div className="col-12 mt-3">
          <Input
            labelPlacement="top"
            placeholder="Packaging cost"
            label="Packaging fee($)"
            value={
              packagingPrice ? englishNumberToPersianNumber(packagingPrice) : ""
            }
            onChange={onProductPackagingPriceChange}
            InputProps={{ className: "u-height-48 u-border-radius-8" }}
            labelClassName={"u-fontMedium"}
            numberOnly
            priceInput
          />
          <div
            className={`d-flex w-100 justify-content-${
              minWidth768 ? "end" : "center"
            } mt-3 align-items-center`}
          >
            <h2 className={"ml-2"} style={{ fontSize: 15, fontWeight: 600 }}>
              {`Final Price with Packaging Cost: ${priceFormatter(
                Math.round(+discountedPrice + +packagingPrice) || 0
              )}`}
            </h2>
            <span style={{ fontSize: 11 }}>$</span>
          </div>
        </div>
      </AdminProductInBoxWrapper>
    </div>
  );
}
