/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import Tooltip from "@material-ui/core/Tooltip";
import Slide from "@material-ui/core/Slide";
import React, { memo, useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import ShareIcon from "@material-ui/icons/Share";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CloseIcon from "@material-ui/icons/Close";
import { textTypes, vanilla } from "@saas/utils/colors";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectBusinessThemeColor } from "@saas/stores/business/selector";
import CustomizedOrderItemCard from "@saas/components/CustomizedOrderItemCard";
import TomanIcon from "@saas/icons/TomanIcon";
import DiscountedPriceView from "../ProductCard2/DiscountPriceView";
import VariantCard from "../VariantCard";
import moment from "moment-jalaali";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import Chip from "@material-ui/core/Chip";
import CopyToClipboard from "react-copy-to-clipboard";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Image from "next/image";

const MODIFIRE_MODAL = "MODIFIRE_MODAL";

function ProductModal({
  isOpen,
  closeModalHandler,
  openModifiersModal,
  addOrderItemToCart,
  decrementOrderItemByOrderId,
  updateOrderItemByOrderId,
  updateMultipleOrdersItems,
  deal,
  orderItem,
  customizedOrderItems = [],
  couldShop,
  categoryId,
  urlPrefix,
}) {
  const phoneSliderSetting = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const title = deal?.title;
  const variations = deal?.variations;
  const hasVariation = deal?.variants_data?.length;
  const description = deal.description;
  let _description = description.replace("nan", " ");
  const hasModifier = Boolean(deal.variations[0]?.modifier_sets?.length);
  const hasVariantsModifier = deal.variations?.find(
    (variant) => variant.modifier_sets.length > 0
  );
  const price = deal.default_variation?.initial_price;
  const discountedPrice = deal.default_variation?.discounted_price;
  const hasDiscountedPercent = price > discountedPrice;
  const discountPercent = calculateDiscountPercent(
    deal.default_variation?.initial_price,
    deal.default_variation?.discounted_price
  );

  const hasImage = deal.has_image;
  const images = deal?.images?.map((image) => image?.image_url);
  const resourceMainImageThumbnailUrl = deal.main_image_thumbnail_url;

  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  const [productCount, setProductCount] = useState(orderItem?.count || 1);
  const { maxWidth768 } = useResponsive();
  useEffect(() => {
    if (orderItem?.count) {
      setProductCount(orderItem?.count);
    } else setProductCount(1);
  }, [isOpen]);

  const [productModalLinkCopied, setProductModalLinkCopied] = useState(false);

  const isAvailable =
    deal.default_variation?.available &&
    (deal.default_variation?.keep_selling ||
      deal.default_variation?.inventory_count > 0);

  const maxDealCount = deal.default_variation?.inventory_count;
  const [selectedVariations, setSelectedVariants] = useState({});

  useEffect(() => {
    if (hasVariation) {
      const newSelectedVariations = {
        ...selectedVariations,
      };
      variations?.map((variant) => {
        const foundVariantInOrders = customizedOrderItems?.find(
          (_orderItem) =>
            _orderItem?.variation_id === variant.id &&
            !_orderItem?.modifiers?.length
        );
        if (foundVariantInOrders) {
          newSelectedVariations[variant.id] = {
            id: foundVariantInOrders.id,
            variation_id: variant.id,
            modifiers: [],
            count: foundVariantInOrders.count,
            product: foundVariantInOrders.product,
          };
        } else {
          newSelectedVariations[variant.id] = {
            variation_id: variant.id,
            modifiers: [],
            count: 0,
            product: deal,
          };
        }
      });
      setSelectedVariants(newSelectedVariations);
    }
  }, [deal, variations, isOpen === true]);

  const increaseSelectedVariantCount = (variationId) => {
    const newSelectedVariations = {
      ...selectedVariations,
    };
    const variant = Object.values(selectedVariations)?.find(
      (variant) => variant.variation_id === variationId
    );

    newSelectedVariations[variationId] = {
      ...variant,
      count: variant.count + 1,
    };

    setSelectedVariants(newSelectedVariations);
  };

  const decreaseSelectedVariantCount = (variationId) => {
    const newSelectedVariations = {
      ...selectedVariations,
    };
    const variant = Object.values(selectedVariations)?.find(
      (variant) => variant.variation_id === variationId
    );

    newSelectedVariations[variationId] = {
      ...variant,
      count: variant.count - 1,
    };

    setSelectedVariants(newSelectedVariations);
  };
  useEffect(() => {
    if (productModalLinkCopied === true) {
      setTimeout(() => {
        setProductModalLinkCopied(false);
      }, 2000);
    }
  }, [productModalLinkCopied === true]);
  return (
    <>
      {maxWidth768 ? (
        <Modal
          className="w-100"
          open={isOpen}
          onClose={closeModalHandler}
          style={{ height: "100vh" }}
        >
          <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
            <div
              style={{ backgroundColor: "#F6F6F7", overflowY: "auto" }}
              className="position-relative h-100"
            >
              {hasImage ? (
                <div className="w-100 " style={{ height: "35vh" }}>
                  <Slider
                    className="mobile-product-modal-slider h-100 w-100"
                    {...phoneSliderSetting}
                  >
                    {images?.map((image, index) => (
                      <Image
                        key={`${image}-image-${index}`}
                        fill
                        className={`object-fit-cover`}
                        src={image}
                        alt={`محصول ${deal?.title}`}
                      />
                    ))}
                  </Slider>
                </div>
              ) : null}
              <div
                className="px-3"
                style={{ paddingTop: hasImage ? "unset" : 64 }}
              >
                <div
                  className="my-4 d-flex align-items-between"
                  style={{ position: "sticky" }}
                >
                  {hasVariation ? (
                    <div>
                      <div
                        className=" mb-2"
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: textTypes.text.default,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        className=""
                        style={{
                          fontSize: 14,
                          fontWeight: 400,
                          color: textTypes.text.subdued,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: _description,
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div className="d-flex w-100 align-items-start justify-content-between">
                      <div className="d-flex w-75 flex-column">
                        <div
                          className=" mb-1"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: textTypes.text.default,
                          }}
                        >
                          {title}
                        </div>
                        <div
                          className=""
                          style={{
                            fontSize: 14,
                            fontWeight: 400,
                            color: textTypes.text.subdued,
                          }}
                          dangerouslySetInnerHTML={{
                            __html: _description,
                          }}
                        ></div>
                      </div>
                      {discountedPrice !== price ? (
                        <div className="d-flex flex-column justify-content-center align-items-start">
                          <div className="d-flex align-items-center justify-content-start">
                            <div
                              className="ml-2"
                              style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: textTypes.text.disabled,
                                textDecoration: "line-through",
                              }}
                            >
                              {priceFormatter(price)}
                            </div>
                            <div
                              className="p-1"
                              style={{
                                color: themeColor,
                                backgroundColor: "rgba(0, 80, 255, 0.08)",
                                fontSize: 16,
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
                              fontSize: 16,
                              fontWeight: 600,
                              color: textTypes.text.default,
                            }}
                          >
                            {priceFormatter(discountedPrice)}{" "}
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
                            fontSize: 16,
                            fontWeight: 600,
                            color: textTypes.text.default,
                          }}
                        >
                          {priceFormatter(price)}{" "}
                          <TomanIcon
                            className="mr-1"
                            width={21}
                            height={21}
                            color="#202223"
                          />{" "}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {!hasVariation &&
                hasModifier &&
                customizedOrderItems?.length ? (
                  <Paper
                    className=""
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      marginBottom: 120,
                    }}
                  >
                    {customizedOrderItems.map((orderItem, index) => {
                      const orderName = orderItem?.product?.title;
                      const modifiersName = orderItem?.modifiers
                        ?.map((modifier) => modifier.title)
                        .join("، ");

                      const variations = orderItem.product?.variations;

                      const initialPrice = Object.keys(
                        orderItem?.product?.variants_data
                      )
                        ? variations?.[0]?.initial_price
                        : variations?.find(
                            (variant) => variant.id === orderItem.variation_id
                          )?.initial_price;
                      const discountedPrice = Object.keys(
                        orderItem?.product?.variants_data
                      )
                        ? variations?.[0]?.discounted_price
                        : variations?.find(
                            (variant) => variant.id === orderItem.variation_id
                          )?.discounted_price;
                      const discountPercent = calculateDiscountPercent(
                        initialPrice,
                        discountedPrice
                      );
                      const numberOfCustomizedOrderItems =
                        customizedOrderItems?.reduce((a, b) => a + b?.count, 0);
                      const numberOfCustomizedCart =
                        customizedOrderItems.length - 1;
                      return (
                        <div
                          key={orderItem?.id}
                          className="p-3 customizedCard"
                          style={{
                            borderBottom:
                              numberOfCustomizedCart === index
                                ? "unset"
                                : "1px solid #E4E6E7",
                          }}
                        >
                          <CustomizedOrderItemCard
                            productImage={resourceMainImageThumbnailUrl}
                            name={orderName}
                            modifiersName={modifiersName}
                            initialPrice={initialPrice}
                            discountedPrice={discountedPrice}
                            discountPercent={discountPercent}
                            orderItem={orderItem}
                            openModifiersModal={openModifiersModal}
                            orderCount={orderItem?.count}
                            remainingCount={
                              deal.default_variation?.inventory_count -
                              numberOfCustomizedOrderItems
                            }
                            couldShop={couldShop}
                          />
                        </div>
                      );
                    })}
                  </Paper>
                ) : null}
                {hasVariation ? (
                  <Paper
                    className="px-3"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      marginBottom: 120,
                    }}
                  >
                    {variations
                      ?.filter(
                        (variant) =>
                          !variant?.extra_data?.only_on_day ||
                          (variant?.extra_data?.only_on_day &&
                          variant?.extra_data?.only_on_day.length
                            ? variant?.extra_data?.only_on_day.find(
                                (sc) => sc.id === moment().day()
                              )
                            : true)
                      )
                      .filter((variation) => !variation?.extra_data?.is_hidden)
                      ?.map((variation) => {
                        const { images: variationImages } = variation;
                        let {
                          main_image_thumbnail_url: mainImageThumbnailUrl,
                        } = variation;
                        if (!variationImages?.length) {
                          mainImageThumbnailUrl = deal.main_image_thumbnail_url;
                        }
                        const discountPercent = calculateDiscountPercent(
                          variation.initial_price,
                          variation.discounted_price
                        );
                        const variantCount =
                          Object.values(selectedVariations)?.find(
                            (variant) => variant.variation_id === variation.id
                          )?.count || 0;
                        const numberOfCustomizedOrderItemsWithSameVariantId =
                          customizedOrderItems
                            ?.filter(
                              (orderItem) =>
                                orderItem?.variation_id === variation.id
                            )
                            ?.reduce((a, b) => a + b?.count, 0);
                        const maxVariantInventoryCount =
                          variation.inventory_count;
                        const isVariantAvailable =
                          variation.available &&
                          (variation.keep_selling ||
                            variation.inventory_count > 0);

                        const hasVariantSpecificModifiers =
                          variation?.modifier_sets?.length;
                        const _orderItem = customizedOrderItems?.find(
                          (orderItem) =>
                            orderItem?.variation_id === variation.id
                        ) || { count: 0 };
                        const isVariantAvailableByHavingModifier =
                          hasVariantSpecificModifiers
                            ? isVariantAvailable &&
                              (maxVariantInventoryCount >
                                numberOfCustomizedOrderItemsWithSameVariantId ||
                                variation.keep_selling)
                            : isVariantAvailable;
                        const isAvailableWithoutInventoryCount =
                          variation.keep_selling;
                        return (
                          <>
                            <VariantCard
                              dealImage={mainImageThumbnailUrl}
                              customizedOrderItems={customizedOrderItems}
                              variant={variation}
                              hasVariantModifier={hasVariantSpecificModifiers}
                              isAvailable={isVariantAvailableByHavingModifier}
                              hasVariantsModifier={hasVariantsModifier}
                              maxVariantInventoryCount={
                                maxVariantInventoryCount
                              }
                              isAvailableWithoutInventoryCount={
                                isAvailableWithoutInventoryCount
                              }
                              discountPercent={discountPercent}
                              variantCount={
                                hasVariantsModifier
                                  ? _orderItem?.count
                                  : variantCount
                              }
                              addAction={() => {
                                if (hasVariantSpecificModifiers) {
                                  openModifiersModal(
                                    MODIFIRE_MODAL,
                                    variation,
                                    null,
                                    maxVariantInventoryCount -
                                      numberOfCustomizedOrderItemsWithSameVariantId
                                  );
                                } else if (hasVariantsModifier) {
                                  addOrderItemToCart(deal, [], variation.id);
                                } else {
                                  increaseSelectedVariantCount(variation.id);
                                }
                              }}
                              decreaseAction={() => {
                                if (
                                  hasVariantsModifier &&
                                  !hasVariantSpecificModifiers
                                ) {
                                  decrementOrderItemByOrderId(_orderItem?.id);
                                }
                                decreaseSelectedVariantCount(variation.id);
                              }}
                              orderItem={_orderItem}
                              couldShop={couldShop}
                            />
                            {hasVariantSpecificModifiers
                              ? customizedOrderItems?.map((orderItem) => {
                                  if (
                                    orderItem?.variation_id === variation.id
                                  ) {
                                    const orderName =
                                      orderItem?.product?.title +
                                      " " +
                                      variation.name;
                                    const modifiersName = orderItem?.modifiers
                                      ?.map((modifier) => modifier.title)
                                      .join("، ");

                                    const initialPrice =
                                      orderItem?.product?.variations
                                        ?.variations_table?.[
                                        orderItem?.variation_id
                                      ]?.initial_price;
                                    const discountedPrice =
                                      orderItem?.product?.variations
                                        ?.variations_table?.[
                                        orderItem?.variation_id
                                      ]?.discounted_price;

                                    const discountPercent =
                                      calculateDiscountPercent(
                                        initialPrice,
                                        discountedPrice
                                      );
                                    return (
                                      <div
                                        key={orderItem?.id}
                                        className="mx-3 py-3 customizedCard product-var-custom-cart"
                                        style={{
                                          borderBottom: "1px solid #E4E6E7",
                                          borderTop: "1px solid #E4E6E7",
                                        }}
                                      >
                                        <CustomizedOrderItemCard
                                          productImage={
                                            resourceMainImageThumbnailUrl
                                          }
                                          name={orderName}
                                          varian
                                          modifiersName={modifiersName}
                                          initialPrice={initialPrice}
                                          discountedPrice={discountedPrice}
                                          discountPercent={discountPercent}
                                          orderItem={orderItem}
                                          openModifiersModal={
                                            openModifiersModal
                                          }
                                          orderCount={orderItem?.count}
                                          remainingCount={
                                            maxVariantInventoryCount -
                                            numberOfCustomizedOrderItemsWithSameVariantId
                                          }
                                          couldShop={couldShop}
                                        />
                                      </div>
                                    );
                                  }
                                })
                              : null}
                          </>
                        );
                      })}
                  </Paper>
                ) : null}
              </div>
              {couldShop ? (
                hasVariation && hasVariantsModifier ? null : (
                  <div
                    className="mt-auto p-5"
                    style={{
                      position: "fixed",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      backgroundColor: vanilla,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    {!hasModifier && !hasVariation ? (
                      <div
                        style={{ height: 45 }}
                        className=" d-flex align-items-center justify-content-center"
                      >
                        {isAvailable ? (
                          <div className="h-100 d-flex align-items-center ml-auto">
                            <div
                              disabled={
                                !isAvailable || productCount === maxDealCount
                              }
                              className="h-100 d-flex align-items-center justify-content-center"
                              style={{
                                padding: 16,
                                color: !(
                                  isAvailable &&
                                  (productCount !==
                                    deal.default_variation?.inventory_count ||
                                    deal.default_variation?.keep_selling)
                                )
                                  ? "#F1F1F1"
                                  : themeColor,
                                maxWidth: 10.5,
                                minWidth: 10.5,
                                minHeight: 10.5,
                                maxHeight: 10.5,
                                border: `1px solid ${
                                  !(
                                    isAvailable &&
                                    (productCount !==
                                      deal.default_variation?.inventory_count ||
                                      deal.default_variation?.keep_selling)
                                  )
                                    ? "#F1F1F1"
                                    : themeColor
                                }`,
                                cursor: "pointer",
                                borderRadius: 8,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (
                                  isAvailable &&
                                  (productCount !==
                                    deal.default_variation?.inventory_count ||
                                    deal.default_variation?.keep_selling)
                                ) {
                                  setProductCount(productCount + 1);
                                } else return null;
                              }}
                            >
                              <Tooltip
                                placement="top"
                                title={
                                  !(
                                    isAvailable &&
                                    (productCount !==
                                      deal.default_variation?.inventory_count ||
                                      deal.default_variation?.keep_selling)
                                  )
                                    ? "اتمام موجودی"
                                    : ""
                                }
                              >
                                <AddIcon
                                  style={{ fontSize: 18 }}
                                  className="w-100 h-100"
                                />
                              </Tooltip>
                            </div>
                            <div
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: textTypes.text.default,
                              }}
                              className="mx-3"
                            >
                              {englishNumberToPersianNumber(productCount)}
                            </div>
                            <div
                              disabled={productCount === 1}
                              className="h-100 d-flex align-items-center justify-content-center"
                              style={{
                                padding: 16,
                                color:
                                  productCount === 1 ? "#F1F1F1" : themeColor,
                                maxWidth: 10.5,
                                minWidth: 10.5,
                                minHeight: 10.5,
                                maxHeight: 10.5,
                                border: `1px solid ${
                                  productCount === 1 ? "#F1F1F1" : themeColor
                                }`,
                                borderRadius: 8,
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (productCount !== 1) {
                                  setProductCount(productCount - 1);
                                }
                              }}
                            >
                              <RemoveRoundedIcon
                                style={{ fontSize: 18 }}
                                className="w-100 h-100"
                              />
                            </div>
                          </div>
                        ) : null}

                        <Button
                          className="h-100"
                          variant="contained"
                          disabled={!isAvailable}
                          fullWidth={!isAvailable}
                          style={{
                            backgroundColor: isAvailable
                              ? themeColor
                              : "#E4E5E7",
                            color: isAvailable ? "#fff" : "#6D7175",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (orderItem?.id) {
                              updateOrderItemByOrderId(orderItem?.id, {
                                product: deal,
                                modifiers: [],
                                count: productCount,
                                variation_id: null,
                              });
                              closeModalHandler();
                            } else {
                              addOrderItemToCart(
                                deal,
                                [],
                                deal?.default_variation?.id,
                                productCount
                              );
                              closeModalHandler();
                            }
                          }}
                        >
                          {isAvailable
                            ? customizedOrderItems?.length
                              ? "اعمال تغییر"
                              : "افزودن به سبد خرید"
                            : "اتمام موجودی"}
                        </Button>
                      </div>
                    ) : hasVariation && !hasVariantsModifier ? (
                      <div
                        style={{ height: 45 }}
                        className=" d-flex align-items-center justify-content-center"
                      >
                        <Button
                          className="h-100"
                          variant="contained"
                          fullWidth
                          disabled={
                            !customizedOrderItems?.length &&
                            !Object.values(selectedVariations)?.find(
                              (variant) => variant.count > 0
                            )
                          }
                          style={{
                            backgroundColor:
                              customizedOrderItems?.length ||
                              Object.values(selectedVariations)?.find(
                                (variant) => variant.count > 0
                              )
                                ? themeColor
                                : "#E4E5E7",
                            color:
                              customizedOrderItems?.length ||
                              Object.values(selectedVariations)?.find(
                                (variant) => variant.count > 0
                              )
                                ? "#fff"
                                : "#6D7175",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (Object.keys(selectedVariations)?.length) {
                              updateMultipleOrdersItems(selectedVariations);
                              closeModalHandler();
                            }
                          }}
                        >
                          {customizedOrderItems?.length
                            ? "اعمال تغییر"
                            : "افزودن به سبد خرید"}
                        </Button>
                      </div>
                    ) : !hasVariation && hasModifier ? (
                      <div
                        style={{ height: 45 }}
                        className=" d-flex align-items-center justify-content-center"
                      >
                        <Button
                          className="h-100"
                          variant="contained"
                          fullWidth
                          disabled={
                            !isAvailable ||
                            customizedOrderItems?.reduce(
                              (a, b) => a + b?.count,
                              0
                            ) === maxDealCount
                          }
                          style={{
                            backgroundColor:
                              isAvailable &&
                              customizedOrderItems?.reduce(
                                (a, b) => a + b?.count,
                                0
                              ) !== maxDealCount
                                ? themeColor
                                : "#E4E5E7",
                            color:
                              isAvailable &&
                              customizedOrderItems?.reduce(
                                (a, b) => a + b?.count,
                                0
                              ) !== maxDealCount
                                ? "#fff"
                                : "#6D7175",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (customizedOrderItems?.length && hasModifier) {
                              openModifiersModal(
                                MODIFIRE_MODAL,
                                null,
                                null,
                                maxDealCount -
                                  customizedOrderItems?.reduce(
                                    (a, b) => a + b?.count,
                                    0
                                  )
                              );
                            } else if (
                              !(
                                customizedOrderItems?.reduce(
                                  (a, b) => a + b?.count,
                                  0
                                ) === maxDealCount
                              ) &&
                              customizedOrderItems?.length < 1
                            ) {
                              openModifiersModal(
                                MODIFIRE_MODAL,
                                null,
                                null,
                                maxDealCount
                              );
                            }
                          }}
                        >
                          {customizedOrderItems?.reduce(
                            (a, b) => a + b?.count,
                            0
                          ) === maxDealCount
                            ? "اتمام موجودی"
                            : customizedOrderItems?.length
                            ? "انتخاب این محصول با افزودنی جدید"
                            : "افزودن به سبد خرید"}
                        </Button>
                      </div>
                    ) : null}
                  </div>
                )
              ) : (
                <div
                  className="mt-auto p-5"
                  style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: vanilla,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  <Button
                    className="h-100"
                    variant="contained"
                    fullWidth
                    disabled
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    موقتا قادر به سفارش‌گیری نیستیم.
                  </Button>
                </div>
              )}
              <button
                onClick={closeModalHandler}
                style={{
                  backgroundColor: hasImage ? "#fff" : "transparent",
                  borderRadius: 8,
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 24,
                  height: 24,
                }}
              >
                <CloseIcon style={{ color: "#5C5F62", fontSize: 24 }} />
              </button>
              <CopyToClipboard
                style={{
                  backgroundColor: hasImage ? "#fff" : "transparent",
                  borderRadius: 8,
                  position: "absolute",
                  top: 16,
                  left: 16,
                  width: 24,
                  height: 24,
                }}
                text={`${window.location.host}${urlPrefix}/${SHOPPING_PLUGIN_URL}?p=${deal.default_variation?.id}&c=${categoryId}`}
                onCopy={() => setProductModalLinkCopied(true)}
              >
                <ShareIcon style={{ color: "#5C5F62" }} />
              </CopyToClipboard>
              {productModalLinkCopied ? (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2000,
                  }}
                >
                  <Chip className="mr-auto ml-1" size="small" label="کپی شد" />
                </div>
              ) : null}
            </div>
          </Slide>
        </Modal>
      ) : (
        <Modal
          className="d-flex align-items-center justify-content-center"
          open={isOpen}
          onClose={closeModalHandler}
          style={{ borderRadius: 8 }}
        >
          <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                backgroundColor: "#F6F6F7",
                width: hasImage ? "" : 604,
                height: hasImage ? "" : 604,
              }}
              className="product-modal d-flex position-relative align-items-stretch justify-content-center"
            >
              {hasImage ? (
                <div className="w-50">
                  <Slider
                    className="product-modal-slider h-100 w-100"
                    {...phoneSliderSetting}
                  >
                    {images?.map((image, index) => (
                      <Image
                        key={`${image}-image-${index}`}
                        fill
                        className={`object-fit-cover`}
                        src={image}
                        alt={`محصول ${deal?.title}`}
                      />
                    ))}
                  </Slider>
                </div>
              ) : null}

              <div
                className={`${hasImage ? "w-50" : "w-100"} d-flex flex-column`}
                style={{
                  backgroundColor: "#fff",
                  paddingTop: hasImage ? "unset" : 76,
                }}
              >
                <div style={{ overflowY: "auto" }} className="p-5">
                  <div className="mb-4 d-flex align-items-between w-100">
                    {/* MODAL HEADER(MAIN NAME OF PRODUCT) */}
                    {hasVariation ? (
                      <div>
                        <div
                          className=" mb-2"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: textTypes.text.default,
                          }}
                        >
                          {title}
                        </div>
                        <div
                          className=""
                          style={{
                            fontSize: 14,
                            fontWeight: 400,
                            color: textTypes.text.subdued,
                          }}
                          dangerouslySetInnerHTML={{
                            __html: _description,
                          }}
                        ></div>
                      </div>
                    ) : (
                      <div className="d-flex w-100 align-items-start justify-content-between">
                        <div className="d-flex w-75 flex-column">
                          <div
                            className=" mb-1"
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: textTypes.text.default,
                            }}
                          >
                            {title}
                          </div>
                          <div
                            className=""
                            style={{
                              fontSize: 14,
                              fontWeight: 400,
                              color: textTypes.text.subdued,
                            }}
                            dangerouslySetInnerHTML={{
                              __html: _description,
                            }}
                          ></div>
                        </div>
                        {hasDiscountedPercent ? (
                          <DiscountedPriceView
                            price={price}
                            discountPercent={discountPercent}
                            discountedPrice={discountedPrice}
                          />
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: textTypes.text.default,
                            }}
                          >
                            {priceFormatter(price)}{" "}
                            <TomanIcon
                              className="mr-1"
                              width={21}
                              height={21}
                              color="#202223"
                            />{" "}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="mr-auto d-flex pr-4">
                      {productModalLinkCopied ? (
                        <Chip
                          className="mr-auto ml-1"
                          size="small"
                          label="کپی شد"
                        />
                      ) : null}
                      <CopyToClipboard
                        style={{
                          cursor: "pointer",
                          width: 24,
                          height: 24,
                        }}
                        text={`${window.location.host}${urlPrefix}/${SHOPPING_PLUGIN_URL}?p=${deal.default_variation?.id}&c=${categoryId}`}
                        onCopy={() => setProductModalLinkCopied(true)}
                      >
                        <ShareIcon style={{ color: "#5C5F62" }} />
                      </CopyToClipboard>
                    </div>
                  </div>
                  {!hasVariation &&
                  hasModifier &&
                  customizedOrderItems?.length ? (
                    <Paper
                      className=""
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 8,
                        marginBottom: 120,
                      }}
                    >
                      {customizedOrderItems.map((orderItem, index) => {
                        const orderName = orderItem?.product?.title;
                        const modifiersName = orderItem?.modifiers
                          ?.map((modifier) => modifier.title)
                          .join("، ");

                        const variations = orderItem.product?.variations;

                        const initialPrice = Object.keys(
                          orderItem?.product?.variants_data
                        )
                          ? variations?.[0]?.initial_price
                          : variations?.find(
                              (variant) => variant.id === orderItem.variation_id
                            )?.initial_price;
                        const discountedPrice = Object.keys(
                          orderItem?.product?.variants_data
                        )
                          ? variations?.[0]?.discounted_price
                          : variations?.find(
                              (variant) => variant.id === orderItem.variation_id
                            )?.discounted_price;
                        const discountPercent = calculateDiscountPercent(
                          initialPrice,
                          discountedPrice
                        );
                        const numberOfCustomizedOrderItems =
                          customizedOrderItems?.reduce(
                            (a, b) => a + b?.count,
                            0
                          );
                        const numberOfCustomizedCart =
                          customizedOrderItems.length - 1;
                        return (
                          <div
                            key={orderItem?.id}
                            className="p-3 customizedCard"
                            style={{
                              borderBottom:
                                numberOfCustomizedCart === index
                                  ? "unset"
                                  : "1px solid #E4E6E7",
                            }}
                          >
                            <CustomizedOrderItemCard
                              productImage={resourceMainImageThumbnailUrl}
                              name={orderName}
                              modifiersName={modifiersName}
                              initialPrice={initialPrice}
                              discountedPrice={discountedPrice}
                              discountPercent={discountPercent}
                              orderItem={orderItem}
                              openModifiersModal={openModifiersModal}
                              orderCount={orderItem?.count}
                              remainingCount={
                                deal.default_variation?.inventory_count -
                                numberOfCustomizedOrderItems
                              }
                              couldShop={couldShop}
                            />
                          </div>
                        );
                      })}
                    </Paper>
                  ) : null}
                  {hasVariation ? (
                    <Paper
                      className=""
                      style={{ backgroundColor: "#fff", borderRadius: 8 }}
                    >
                      {variations
                        ?.filter(
                          (variant) =>
                            !variant?.extra_data?.only_on_day ||
                            (variant?.extra_data?.only_on_day &&
                            variant?.extra_data?.only_on_day.length
                              ? variant?.extra_data?.only_on_day.find(
                                  (sc) => sc.id === moment().day()
                                )
                              : true)
                        )
                        .filter(
                          (variation) => !variation?.extra_data?.is_hidden
                        )
                        .map((variation) => {
                          const { images: variationImages } = variation;
                          let {
                            main_image_thumbnail_url: mainImageThumbnailUrl,
                          } = variation;
                          if (!variationImages?.length) {
                            mainImageThumbnailUrl =
                              deal.main_image_thumbnail_url;
                          }
                          const discountPercent = calculateDiscountPercent(
                            variation.initial_price,
                            variation.discounted_price
                          );
                          const variantCount =
                            Object.values(selectedVariations)?.find(
                              (variant) => variant.variation_id === variation.id
                            )?.count || 0;
                          const numberOfCustomizedOrderItemsWithSameVariantId =
                            customizedOrderItems
                              ?.filter(
                                (orderItem) =>
                                  orderItem?.variation_id === variation.id
                              )
                              ?.reduce((a, b) => a + b?.count, 0);
                          const maxVariantInventoryCount =
                            variation.inventory_count;
                          const isVariantAvailable =
                            variation.available &&
                            (variation.keep_selling ||
                              variation.inventory_count > 0);
                          const hasVariantSpecificModifiers =
                            variation?.modifier_sets?.length;
                          const _orderItem = customizedOrderItems?.find(
                            (orderItem) =>
                              orderItem?.variation_id === variation.id
                          ) || { count: 0 };
                          const isVariantAvailableByHavingModifier =
                            hasVariantSpecificModifiers
                              ? isVariantAvailable &&
                                (maxVariantInventoryCount >
                                  numberOfCustomizedOrderItemsWithSameVariantId ||
                                  variation.keep_selling)
                              : isVariantAvailable;
                          const isAvailableWithoutInventoryCount =
                            variation.keep_selling;

                          return (
                            <>
                              <VariantCard
                                dealImage={mainImageThumbnailUrl}
                                classes="mx-3"
                                customizedOrderItems={customizedOrderItems}
                                variant={variation}
                                hasVariantModifier={hasVariantSpecificModifiers}
                                isAvailable={isVariantAvailableByHavingModifier}
                                isAvailableWithoutInventoryCount={
                                  isAvailableWithoutInventoryCount
                                }
                                hasVariantsModifier={hasVariantsModifier}
                                maxVariantInventoryCount={
                                  maxVariantInventoryCount
                                }
                                discountPercent={discountPercent}
                                variantCount={
                                  hasVariantsModifier
                                    ? _orderItem?.count
                                    : variantCount
                                }
                                addAction={() => {
                                  if (hasVariantSpecificModifiers) {
                                    openModifiersModal(
                                      MODIFIRE_MODAL,
                                      variation,
                                      null,
                                      maxVariantInventoryCount -
                                        numberOfCustomizedOrderItemsWithSameVariantId
                                    );
                                  } else if (hasVariantsModifier) {
                                    addOrderItemToCart(deal, [], variation.id);
                                  } else {
                                    increaseSelectedVariantCount(variation.id);
                                  }
                                }}
                                decreaseAction={() => {
                                  if (
                                    hasVariantsModifier &&
                                    !hasVariantSpecificModifiers
                                  ) {
                                    decrementOrderItemByOrderId(_orderItem?.id);
                                  }
                                  decreaseSelectedVariantCount(variation.id);
                                }}
                                orderItem={_orderItem}
                                couldShop={couldShop}
                              />
                              {hasVariantSpecificModifiers
                                ? customizedOrderItems?.map((orderItem) => {
                                    if (
                                      orderItem?.variation_id === variation.id
                                    ) {
                                      const orderName =
                                        orderItem?.product?.title +
                                        " " +
                                        variation.name;
                                      const modifiersName = orderItem?.modifiers
                                        ?.map((modifier) => modifier.title)
                                        .join("، ");

                                      const initialPrice =
                                        orderItem?.product?.variations
                                          ?.variations_table?.[
                                          orderItem?.variation_id
                                        ]?.initial_price;
                                      const discountedPrice =
                                        orderItem?.product?.variations
                                          ?.variations_table?.[
                                          orderItem?.variation_id
                                        ]?.discounted_price;

                                      const discountPercent =
                                        calculateDiscountPercent(
                                          initialPrice,
                                          discountedPrice
                                        );
                                      return (
                                        <div
                                          key={orderItem?.id}
                                          className="mx-3 py-3 customizedCard product-var-custom-cart"
                                          style={{
                                            borderBottom: "1px solid #E4E6E7",
                                            borderTop: "1px solid #E4E6E7",
                                          }}
                                        >
                                          <CustomizedOrderItemCard
                                            productImage={
                                              resourceMainImageThumbnailUrl
                                            }
                                            name={orderName}
                                            varian
                                            modifiersName={modifiersName}
                                            initialPrice={initialPrice}
                                            discountedPrice={discountedPrice}
                                            discountPercent={discountPercent}
                                            orderItem={orderItem}
                                            openModifiersModal={
                                              openModifiersModal
                                            }
                                            orderCount={orderItem?.count}
                                            remainingCount={
                                              maxVariantInventoryCount -
                                              numberOfCustomizedOrderItemsWithSameVariantId
                                            }
                                            couldShop={couldShop}
                                          />
                                        </div>
                                      );
                                    }
                                  })
                                : null}
                            </>
                          );
                        })}
                    </Paper>
                  ) : null}
                </div>
                {couldShop ? (
                  hasVariation && hasVariantsModifier ? null : (
                    <div
                      className="mt-auto p-5"
                      style={{
                        position: "sticky",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: vanilla,
                        borderBottomLeftRadius: 8,
                      }}
                    >
                      {!hasModifier && !hasVariation ? (
                        <div
                          style={{ height: 45 }}
                          className=" d-flex align-items-center justify-content-center"
                        >
                          {isAvailable ? (
                            <div className="h-100 d-flex align-items-center ml-auto">
                              <div
                                disabled={
                                  !isAvailable || productCount === maxDealCount
                                }
                                className="h-100 d-flex align-items-center justify-content-center"
                                style={{
                                  padding: 16,
                                  color: !(
                                    isAvailable &&
                                    (productCount !==
                                      deal.default_variation?.inventory_count ||
                                      deal.default_variation?.keep_selling)
                                  )
                                    ? "#F1F1F1"
                                    : themeColor,
                                  maxWidth: 10.5,
                                  minWidth: 10.5,
                                  minHeight: 10.5,
                                  maxHeight: 10.5,
                                  border: `1px solid ${
                                    !(
                                      isAvailable &&
                                      (productCount !==
                                        deal.default_variation
                                          ?.inventory_count ||
                                        deal.default_variation?.keep_selling)
                                    )
                                      ? "#F1F1F1"
                                      : themeColor
                                  }`,
                                  cursor: "pointer",
                                  borderRadius: 8,
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (
                                    isAvailable &&
                                    (productCount !==
                                      deal.default_variation?.inventory_count ||
                                      deal.default_variation?.keep_selling)
                                  ) {
                                    setProductCount(productCount + 1);
                                  } else return null;
                                }}
                              >
                                <Tooltip
                                  placement="top"
                                  title={
                                    !(
                                      isAvailable &&
                                      (productCount !==
                                        deal.default_variation
                                          ?.inventory_count ||
                                        deal.default_variation?.keep_selling)
                                    )
                                      ? "اتمام موجودی"
                                      : ""
                                  }
                                >
                                  <AddIcon
                                    style={{ fontSize: 18 }}
                                    className="w-100 h-100"
                                  />
                                </Tooltip>
                              </div>
                              <div
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: textTypes.text.default,
                                }}
                                className="mx-3"
                              >
                                {englishNumberToPersianNumber(productCount)}
                              </div>
                              <div
                                disabled={productCount === 1}
                                className="h-100 d-flex align-items-center justify-content-center"
                                style={{
                                  padding: 16,
                                  color:
                                    productCount === 1 ? "#F1F1F1" : themeColor,
                                  maxWidth: 10.5,
                                  minWidth: 10.5,
                                  minHeight: 10.5,
                                  maxHeight: 10.5,
                                  border: `1px solid ${
                                    productCount === 1 ? "#F1F1F1" : themeColor
                                  }`,
                                  borderRadius: 8,
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (productCount !== 1) {
                                    setProductCount(productCount - 1);
                                  }
                                }}
                              >
                                <RemoveRoundedIcon
                                  style={{ fontSize: 18 }}
                                  className="w-100 h-100"
                                />
                              </div>
                            </div>
                          ) : null}

                          <Button
                            className="h-100"
                            variant="contained"
                            disabled={!isAvailable}
                            fullWidth={!isAvailable}
                            style={{
                              backgroundColor: isAvailable
                                ? themeColor
                                : "#E4E5E7",
                              color: isAvailable ? "#fff" : "#6D7175",
                              fontSize: 14,
                              fontWeight: 400,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (orderItem?.id) {
                                updateOrderItemByOrderId(orderItem?.id, {
                                  product: deal,
                                  modifiers: [],
                                  count: productCount,
                                  variation_id: null,
                                });
                                closeModalHandler();
                              } else {
                                addOrderItemToCart(
                                  deal,
                                  [],
                                  deal.default_variation.id,
                                  productCount
                                );
                                closeModalHandler();
                              }
                            }}
                          >
                            {isAvailable
                              ? customizedOrderItems?.length
                                ? "اعمال تغییر"
                                : "افزودن به سبد خرید"
                              : "اتمام موجودی"}
                          </Button>
                        </div>
                      ) : hasVariation && !hasVariantsModifier ? (
                        <div
                          style={{ height: 45 }}
                          className=" d-flex align-items-center justify-content-center"
                        >
                          <Button
                            className="h-100"
                            variant="contained"
                            fullWidth
                            disabled={
                              !customizedOrderItems?.length &&
                              !Object.values(selectedVariations)?.find(
                                (variant) => variant.count > 0
                              )
                            }
                            style={{
                              backgroundColor:
                                customizedOrderItems?.length ||
                                Object.values(selectedVariations)?.find(
                                  (variant) => variant.count > 0
                                )
                                  ? themeColor
                                  : "#E4E5E7",
                              color:
                                customizedOrderItems?.length ||
                                Object.values(selectedVariations)?.find(
                                  (variant) => variant.count > 0
                                )
                                  ? "#fff"
                                  : "#6D7175",
                              fontSize: 14,
                              fontWeight: 400,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (Object.keys(selectedVariations)?.length) {
                                updateMultipleOrdersItems(selectedVariations);
                                closeModalHandler();
                              }
                            }}
                          >
                            {customizedOrderItems?.length
                              ? "اعمال تغییر"
                              : "افزودن به سبد خرید"}
                          </Button>
                        </div>
                      ) : !hasVariation && hasModifier ? (
                        <div
                          style={{ height: 45 }}
                          className=" d-flex align-items-center justify-content-center"
                        >
                          <Button
                            className="h-100"
                            variant="contained"
                            fullWidth
                            disabled={
                              !isAvailable ||
                              customizedOrderItems?.reduce(
                                (a, b) => a + b?.count,
                                0
                              ) === maxDealCount
                            }
                            style={{
                              backgroundColor:
                                isAvailable &&
                                customizedOrderItems?.reduce(
                                  (a, b) => a + b?.count,
                                  0
                                ) !== maxDealCount
                                  ? themeColor
                                  : "#E4E5E7",
                              color:
                                isAvailable &&
                                customizedOrderItems?.reduce(
                                  (a, b) => a + b?.count,
                                  0
                                ) !== maxDealCount
                                  ? "#fff"
                                  : "#6D7175",
                              fontSize: 14,
                              fontWeight: 400,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (customizedOrderItems?.length && hasModifier) {
                                openModifiersModal(
                                  MODIFIRE_MODAL,
                                  null,
                                  null,
                                  maxDealCount -
                                    customizedOrderItems?.reduce(
                                      (a, b) => a + b?.count,
                                      0
                                    )
                                );
                              } else if (
                                !(
                                  customizedOrderItems?.reduce(
                                    (a, b) => a + b?.count,
                                    0
                                  ) === maxDealCount
                                ) &&
                                customizedOrderItems?.length < 1
                              ) {
                                openModifiersModal(
                                  MODIFIRE_MODAL,
                                  null,
                                  null,
                                  maxDealCount
                                );
                              }
                            }}
                          >
                            {customizedOrderItems?.reduce(
                              (a, b) => a + b?.count,
                              0
                            ) === maxDealCount
                              ? "اتمام موجودی"
                              : customizedOrderItems?.length
                              ? "انتخاب این محصول با افزودنی جدید"
                              : "افزودن به سبد خرید"}
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  )
                ) : (
                  <div
                    className="mt-auto p-5"
                    style={{
                      position: "sticky",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      backgroundColor: vanilla,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    <Button
                      className="h-100"
                      variant="contained"
                      disabled
                      fullWidth
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      موقتا قادر به سفارش‌گیری نیستیم.
                    </Button>
                  </div>
                )}
              </div>
              <button
                className="modal-close-btn d-flex align-items-center justify-content-center"
                onClick={closeModalHandler}
                fulllWidth
                style={{
                  borderRadius: 8,
                  position: "absolute",
                  backgroundColor: hasImage ? "#fff" : "transparent",
                  top: 24,
                  right: 24,
                  padding: hasImage ? 10 : 2,
                }}
              >
                <CloseIcon style={{ fontSize: 25 }} />
              </button>
            </div>
          </Slide>
        </Modal>
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  urlPrefix: makeSelectUrlPrefix(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ProductModal);
