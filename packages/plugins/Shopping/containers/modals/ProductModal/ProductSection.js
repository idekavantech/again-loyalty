/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-danger */
/* eslint-disable indent */

import React, { memo, useEffect, useMemo, useState } from "react";
import Button from "@material-ui/core/Button";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import AddRounded from "@material-ui/icons/AddRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { text } from "@saas/utils/colors";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectBusiness,
  makeSelectResourceLabels,
} from "@saas/stores/business/selector";
import { createStructuredSelector } from "reselect";
import ModifiersModal from "../ModifiersModal";

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const modalDefaultValue = { show: false, productId: null, variationId: null };

function ProductSection({
  product,
  increaseOrderItem,
  isDisabled,
  selectVariant = () => {},
  orders,
  lessPadding,
  noStickyButton,
  secondary,
  customThemeColor = "#000000",
  useThemeColor = true,
  showPrices,
  categories,
}) {
  const { maxWidth768 } = useResponsive();
  const [selectedVariations, selectVariations] = useState({});
  const [modal, setModal] = useState(modalDefaultValue);

  const onOpenModal = (productId, variationId) =>
    setModal({ show: true, productId, variationId });
  const onCloseModal = () => setModal(modalDefaultValue);
  useEffect(() => {
    selectVariant(null);
    selectVariations({});
    if (product?.variations?.length > 1) {
      const _obj = {};
      product.variants_data.forEach((item) => {
        const availableVariants = product?.variations?.filter(
          (variant) =>
            variant.available &&
            (variant.keep_selling || variant.inventory_count)
        );
        const availableVariantValue = item.values.find((variantValue) =>
          availableVariants.find(
            (variant) =>
              variant.extra_data.variants[item.id] === variantValue.id
          )
        );
        if (availableVariantValue) {
          _obj[item.id] = availableVariantValue.id;
        }
      });
      selectVariations(_obj);
    }
  }, [JSON.stringify(product)]);
  const selectedVariation = useMemo(() => {
    const _selectedVariation = product?.variations?.find((variant) => {
      let found = true;
      for (const key in selectedVariations) {
        if (variant.extra_data.variants[key] !== selectedVariations[key]) {
          found = false;
        }
      }
      return found;
    });

    selectVariant(_selectedVariation);
    return _selectedVariation;
  }, [selectedVariations]);
  const discount = selectedVariation
    ? selectedVariation.initial_price - selectedVariation.discounted_price
    : product.initial_price - product.discounted_price;
  const discountPercent = selectedVariation
    ? calculateDiscountPercent(
        selectedVariation.initial_price,
        selectedVariation.discounted_price
      )
    : calculateDiscountPercent(
        product.initial_price,
        product?.default_variation?.discounted_price
      );
  const initial_price = selectedVariation
    ? selectedVariation.initial_price
    : product?.default_variation?.initial_price;
  const discounted_price = selectedVariation
    ? selectedVariation.discounted_price
    : product?.default_variation?.discounted_price;
  const theme = useTheme();
  const hasVariation = product?.variants_data?.length;
  const hasModifiers =
    product?.variations?.[0]?.modifier_sets?.length &&
    (!selectedVariation?.id ||
      product?.variations?.find(
        (variant) => selectedVariation?.id === variant.id
      )?.modifier_sets?.length);
  const [selectedOrderInventory, setSelectedOrderInventory] = useState(null);
  const [selectedOrderVariationInventory, setSelectedOrderVariationInventory] =
    useState(null);
  useEffect(() => {
    if (selectedVariation) {
      if (orders?.find((item) => item.variation_id === selectedVariation.id)) {
        setSelectedOrderVariationInventory(
          orders?.find((item) => item.variation_id === selectedVariation.id)
            .count
        );
      } else {
        setSelectedOrderVariationInventory(0);
      }
    } else if (
      !selectedVariation &&
      orders?.find((item) => item?.product?.id === product?.id)
    ) {
      let newArray = [];
      orders?.forEach((item) => {
        if (item?.product?.id === product?.id) {
          newArray.push(item.count);
        }
      });
      setSelectedOrderInventory(newArray?.reduce(reducer, 0));
    } else {
      setSelectedOrderInventory(null);
    }
  }, [orders, product, selectedVariation]);
  const isAvailable =
    (selectedVariation &&
      !isDisabled &&
      product.available &&
      selectedVariation.available &&
      (selectedVariation.keep_selling ||
        selectedVariation.inventory_count > selectedOrderVariationInventory)) ||
    (!selectedVariation &&
      product.available &&
      !isDisabled &&
      (product.keep_selling ||
        product.inventory_count > selectedOrderInventory));

  if (!product) {
    return null;
  }
  return (
    <div
      className={`${
        secondary ? "d-flex flex-column justify-content-between h-100" : ""
      } ${lessPadding ? "" : "py-3"}`}
    >
      <ModifiersModal
        isOpen={modal.show}
        productId={modal.productId}
        variationId={modal.variationId}
        onClose={onCloseModal}
      />
      <h1
        className={maxWidth768 && secondary ? "u-fontLarge" : "u-fontVeryLarge"}
      >
        {product.title}
      </h1>
      {secondary ? (
        <div
          className="mt-2 u-fontLarge"
          dangerouslySetInnerHTML={{
            __html: product.description,
          }}
        />
      ) : null}
      {secondary ? (
        <div style={{ color: text.disabled }} className="mt-2">
          {selectedVariation?.description || ""}
        </div>
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
                  {priceFormatter(initial_price)}
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
              {priceFormatter(discounted_price)}{" "}
              <span className="font-weight-normal">تومان</span>
            </div>
          ) : null}
        </div>
        {hasVariation && product.available && selectedVariations ? (
          <div className="w-100">
            {product?.variants_data?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="d-flex align-items-center mt-3"
                  style={{ width: "50%" }}
                >
                  <div className={'ml-1'}>{item.name}</div>
                  <Select
                    labelId="variation"
                    id="variation"
                    variant="outlined"
                    color="secondary"
                    value={
                      item.values.find(
                        (_item) => _item.id === selectedVariations[item.id]
                      )?.id || item.values[0].id
                    }
                    onChange={(event) => {
                      selectVariations({
                        ...selectedVariations,
                        [item.id]: event.target.value,
                      });
                    }}
                    style={{ minWidth: 100 }}
                    className="medium"
                  >
                    {item.values.map((_item) => (
                      <MenuItem
                        key={_item.id}
                        selected={_item.id === selectedVariations[item.id]}
                        value={_item.id}
                      >
                        {_item.value}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              );
            })}
          </div>
        ) : null}

        {isAvailable ? (
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
                  if (hasModifiers) {
                    onOpenModal(product.id, selectedVariation.id || null);
                  } else {
                    increaseOrderItem(product, selectedVariation?.id || null);
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
                    if (hasModifiers) {
                      onOpenModal(product.id, selectedVariation.id || null);
                    } else {
                      increaseOrderItem(product, selectedVariation?.id || null);
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
        ) : !isDisabled && selectedVariation && product.available ? (
          <div className="flex-1 pl-4 d-flex align-items-center mt-5">
            <div className="pr-0">این گوناگونی ناموجود است.</div>
          </div>
        ) : !isDisabled ? (
          <div className="flex-1 pl-4 d-flex align-items-center mt-5 pr-0">
            <div className="pr-0">این محصول ناموجود است.</div>
          </div>
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
  );
}

const mapStateToProps = createStructuredSelector({
  categories: makeSelectResourceLabels(),
  business: makeSelectBusiness(),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect, memo)(ProductSection);
