import Button from "@material-ui/core/Button";
import ProductAmountController from "../ProductCard2/ProductAmountController";
import React, { memo } from "react";
import { textTypes } from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import TomanIcon from "@saas/icons/TomanIcon";
const VariantCard = ({
  customizedOrderItems,
  variant,
  hasVariantModifier,
  hasVariantsModifier,
  isAvailable,
  maxVariantInventoryCount,
  discountPercent,
  variantCount,
  addAction,
  decreaseAction,
  classes = "",
  isInMobile,
  isAvailableWithoutInventoryCount,
  couldShop = true,
  dealImage,
}) => {
  return (
    <div
      className={`${classes} py-3 product-var-custom-cart`}
      style={
        !isInMobile
          ? {
              borderBottom:
                customizedOrderItems?.find(
                  (orderItem) => orderItem.variation_id === variant.id
                ) && hasVariantModifier
                  ? "unset"
                  : "1px solid #E4E6E7",
            }
          : {}
      }
    >
      <div className="d-flex w-100 align-items-end justify-content-between">
        <div className="d-flex">
          {dealImage ? (
            <div
              className="ml-5"
              style={{
                boxSizing: "content-box",
                width: 64,
                height: 64,
                border: "1px solid rgba(228, 230, 231, 0.6)",
                borderRadius: 8,
              }}
            >
              <img
                style={{
                  borderRadius: 8,
                  width: 64,
                  height: 64,
                }}
                className="overflow-hidden object-fit-cover"
                src={variant?.image_url || dealImage}
                alt="Product photo"
              />
            </div>
          ) : null}
          <div className="d-flex flex-column" style={{ minHeight: 64 }}>
            <div className="d-flex w-75 flex-column">
              <div
                className=" mb-1"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: textTypes.text.default,
                }}
              >
                {variant.title.length > 50
                  ? variant.title.slice(0, 49) + "..."
                  : variant.title}
              </div>
              {variant.description ? (
                <div
                  className=""
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: textTypes.text.subdued,
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      variant.description.length > 60
                        ? variant.description.slice(0, 59) + "..."
                        : variant.description,
                  }}
                ></div>
              ) : null}
            </div>
            {variant.discounted_price !== variant.initial_price ? (
              <div className="d-flex flex-column justify-content-center align-items-start">
                <div className="d-flex align-items-center justify-content-start">
                  <div
                    className="ml-2"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: textTypes.text.disabled,
                      textDecoration: "line-through",
                    }}
                  >
                    {priceFormatter(variant.initial_price)}
                  </div>
                  <div
                    className="p-1"
                    style={{
                      color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                      backgroundColor: "rgba(0, 80, 255, 0.08)",
                      fontSize: 10,
                      fontWeight: 700,
                      borderRadius: 4,
                    }}
                  >
                    {englishNumberToPersianNumber(discountPercent)}%
                  </div>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: textTypes.text.default,
                  }}
                >
                  {priceFormatter(variant.discounted_price)}{" "}
                  <TomanIcon
                    className="mr-1"
                    width={21}
                    height={21}
                    color="#202223"
                  />{" "}
                </div>
              </div>
            ) : (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: textTypes.text.default,
                }}
              >
                {priceFormatter(variant.initial_price)}{" "}
                <TomanIcon
                  className="mr-1"
                  width={21}
                  height={21}
                  color="#202223"
                />{" "}
              </div>
            )}
          </div>
        </div>
        {couldShop ? (
          isAvailable ? (
            <ProductAmountController
              amount={hasVariantModifier ? 0 : variantCount}
              increment={() => {
                addAction();
              }}
              decrement={() => {
                decreaseAction();
              }}
              disabled={
                hasVariantsModifier
                  ? !isAvailable && !isAvailableWithoutInventoryCount
                  : (!isAvailable ||
                      maxVariantInventoryCount === variantCount) &&
                    !isAvailableWithoutInventoryCount
              }
            />
          ) : (
            <Button
              disabled
              style={{
                backgroundColor: "#E4E5E7",
                fontSize: 14,
                fontWeight: 400,
                color: "#6D7175",
                borderRadius: 8,
                padding: "4px 12px",
              }}
            >
              Completion of inventory
            </Button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default memo(VariantCard);
