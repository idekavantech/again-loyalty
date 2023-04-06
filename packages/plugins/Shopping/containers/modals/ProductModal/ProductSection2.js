/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-danger */
/* eslint-disable indent */

import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import AddRounded from "@material-ui/icons/AddRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { text } from "@saas/utils/colors";
import ModifiersModal from "../../../components/ModifierModal";
import ProductModal from "../../../components/ProductModal";
const PRODUCT_MODAL = "PRODUCT_MODAL";
const MODIFIRE_MODAL = "MODIFIRE_MODAL";

function ProductSection2({
  product,
  lessPadding,
  noStickyButton,
  secondary,
  customThemeColor = "#000000",
  useThemeColor = true,
  showPrices,
  addOrderItemToCart,
  incrementOrderItemByOrderId,
  decrementOrderItemByOrderId,
  updateOrderItemByOrderId,
  updateMultipleOrdersItems,
  deleteOrderItem,
  customizedOrderItems,
  orderItem,
  couldShop,
}) {
  const theme = useTheme();
  const maxWidth768 = true;

  const totalCountOfCustomizedOrderItems = customizedOrderItems?.reduce(
    (previousValue, currentValue) => previousValue + currentValue?.count,
    0
  );

  const hasVariation = product?.variations?.length > 1;
  const hasModifier = Boolean(product?.variations?.[0]?.modifier_sets?.length);

  const price = product.default_variation?.initial_price;
  const discountedPrice = product.default_variation?.discounted_price;
  const discountPercent = calculateDiscountPercent(price, discountedPrice);

  const discount = price - discountedPrice;
  const [ModalsState, setModalsState] = useState({
    MODIFIRE_MODAL: false,
    PRODUCT_MODAL: false,
  });
  const isAvailable = hasVariation
    ? true
    : hasModifier
    ? product.default_variation.available &&
      (product.default_variation.keep_selling ||
        product.default_variation.inventory_count >
          (totalCountOfCustomizedOrderItems || 0))
    : product.default_variation.available &&
      (product.default_variation.keep_selling ||
        product.default_variation.inventory_count > (orderItem?.count || 0));

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedCustomizedOrderItem, setSelectedCustomizedOrderItem] =
    useState(null);
  const [remainingDealCount, setRemainingDealCount] = useState(null);
  const handleOpen = (
    modalType,
    variant,
    customizedOrderItem,
    remainingDealCount
  ) => {
    setModalsState({ ...ModalsState, [modalType]: true });
    setSelectedVariant(variant);
    setSelectedCustomizedOrderItem(customizedOrderItem);
    setRemainingDealCount(remainingDealCount);
  };

  const handleClose = (modalType) => {
    setModalsState({ ...ModalsState, [modalType]: false });
    setSelectedVariant(null);
  };

  if (product) {
    return (
      <>
        <div
          className={`${
            secondary ? "d-flex flex-column justify-content-between h-100" : ""
          } ${lessPadding ? "" : "py-3"}`}
        >
          <div className="d-flex justify-content-between">
            <>
              <h1
                className={
                  maxWidth768 && secondary ? "u-fontLarge" : "u-fontVeryLarge"
                }
              >
                {product.title}
              </h1>
              {!couldShop && !isAvailable && (
                <h2
                  className={
                    maxWidth768 && secondary ? "u-fontLarge" : "u-fontVeryLarge"
                  }
                >
                  اتمام موجودی
                </h2>
              )}
            </>
          </div>

          {secondary ? (
            <div
              className="mt-2 u-fontLarge"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          ) : null}

          <div
            className={`mt-4 ${
              secondary
                ? "d-flex flex-wrap justify-content-between align-items-center"
                : ""
            }`}
          >
            <div>
              <div
                className={`d-flex ${
                  secondary && maxWidth768 ? "u-fontMedium" : "u-fontLarge"
                }`}
              >
                {isAvailable || showPrices ? (
                  <div
                    className={`d-flex justify-content-between align-items-center ${
                      discount ? "u-text-line-through" : ""
                    }`}
                    style={{
                      fontSize: discount ? "" : "13px",
                      color: discount
                        ? theme.palette.text.quaternary
                        : useThemeColor
                        ? theme.palette.secondary.main
                        : customThemeColor,
                    }}
                  >
                    <div
                      className={
                        discount
                          ? ""
                          : secondary && maxWidth768
                          ? "u-fontMedium u-fontWeightBold mx-1"
                          : "u-fontVeryLarge u-fontWeightBold mx-1"
                      }
                    >
                      {priceFormatter(price)}
                    </div>
                    {discountPercent ? "" : " تومان "}
                  </div>
                ) : null}

                {discountPercent ? (
                  <div
                    className={
                      secondary && maxWidth768
                        ? "c-btn-discount py-1 mx-1 u-fontMedium"
                        : "c-btn-discount py-1 px-2 mx-2"
                    }
                    style={{
                      height: 26,
                      borderRadius: 4,
                      backgroundColor: theme.palette.error.main,
                      color: "white",
                    }}
                  >
                    ٪{englishNumberToPersianNumber(discountPercent)}
                  </div>
                ) : null}
              </div>
              {discount ? (
                <div
                  style={{
                    color: useThemeColor
                      ? theme.palette.secondary.main
                      : customThemeColor,
                  }}
                  className={
                    secondary && maxWidth768
                      ? "u-no-wrap u-fontMedium u-fontWeightBold"
                      : "u-no-wrap u-fontVeryLarge u-fontWeightBold"
                  }
                >
                  {priceFormatter(discountedPrice)}{" "}
                  <span className="font-weight-normal">تومان</span>
                </div>
              ) : null}
            </div>

            {couldShop ? (
              isAvailable ? (
                <div
                  className={`d-flex ${secondary ? "" : "flex-1"} ${
                    maxWidth768 ? "" : lessPadding ? "" : " py-5 "
                  }`}
                >
                  {!maxWidth768 || noStickyButton ? (
                    <Button
                      id="shoppingModalAddProduct"
                      className="u-border-radius-8"
                      color="secondary"
                      size={secondary && maxWidth768 ? "small" : "medium"}
                      style={{
                        minWidth: "unset",
                        background: useThemeColor ? "" : customThemeColor,
                      }}
                      onClick={() => {
                        if (hasVariation) {
                          handleOpen(PRODUCT_MODAL);
                        } else if (hasModifier) {
                          handleOpen(
                            MODIFIRE_MODAL,
                            null,
                            null,
                            product.default_variation.inventory_count -
                              (orderItem?.count || 0)
                          );
                        } else {
                          addOrderItemToCart(product, [], null);
                        }
                      }}
                      variant="contained"
                    >
                      <AddRounded className="ml-1" />
                      افزودن {lessPadding ? "" : "به سبد خرید"}
                    </Button>
                  ) : (
                    <div
                      className="fixed-bottom p-3 bg-white"
                      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)" }}
                    >
                      <Button
                        id="shoppingModalAddProduct"
                        className="px-3 u-border-radius-8 w-100"
                        style={{
                          minWidth: "unset",
                        }}
                        onClick={() => {
                          if (hasVariation) {
                            handleOpen(PRODUCT_MODAL);
                          } else if (hasModifier) {
                            handleOpen(
                              MODIFIRE_MODAL,
                              null,
                              null,
                              product.default_variation.inventory_count -
                                (orderItem?.count || 0)
                            );
                          } else {
                            addOrderItemToCart(product, [], null);
                          }
                        }}
                        color="secondary"
                        variant="contained"
                      >
                        <AddRounded className="ml-1" />
                        افزودن به سبد خرید
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  id="shoppingModalAddProduct"
                  className="u-border-radius-8"
                  color="secondary"
                  size={secondary && maxWidth768 ? "small" : "medium"}
                  style={{
                    minWidth: "unset",
                    background: useThemeColor ? "" : customThemeColor,
                  }}
                  disabled
                  variant="contained"
                >
                  <AddRounded className="ml-1" />
                  اتمام موجودی
                </Button>
              )
            ) : null}
          </div>

          {!secondary ? (
            <>
              <div
                className="u-fontSemiLarge mt-2"
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
              <div style={{ color: text.disabled }} className="mt-2">
                {selectedVariation?.description || ""}
              </div>
            </>
          ) : null}
        </div>

        <ProductModal
          isOpen={ModalsState[PRODUCT_MODAL]}
          closeModalHandler={() => handleClose(PRODUCT_MODAL)}
          customizedOrderItems={customizedOrderItems}
          orderItem={orderItem}
          deal={product}
          openModifiersModal={handleOpen}
          addOrderItemToCart={addOrderItemToCart}
          decrementOrderItemByOrderId={decrementOrderItemByOrderId}
          incrementOrderItemByOrderId={incrementOrderItemByOrderId}
          updateOrderItemByOrderId={updateOrderItemByOrderId}
          updateMultipleOrdersItems={updateMultipleOrdersItems}
          couldShop={couldShop}
        />
        <ModifiersModal
          customizedOrderItems={customizedOrderItems}
          deal={product}
          orderItem={orderItem}
          isAvailable={isAvailable}
          isOpen={ModalsState[MODIFIRE_MODAL]}
          closeModalHandler={() =>
            setModalsState({ MODIFIRE_MODAL: false, PRODUCT_MODAL: false })
          }
          backModalHandler={() => handleClose(MODIFIRE_MODAL)}
          addOrderItemToCart={addOrderItemToCart}
          selectedVariant={selectedVariant}
          updateOrderItemByOrderId={updateOrderItemByOrderId}
          selectedCustomizedOrderItem={selectedCustomizedOrderItem}
          deleteOrderItem={deleteOrderItem}
          remainingDealCount={remainingDealCount}
          couldShop={couldShop}
        />
      </>
    );
  }
  return null;
}

export default memo(ProductSection2);
