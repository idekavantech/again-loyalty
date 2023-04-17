import { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import { textTypes } from "@saas/utils/colors";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import ProductModal from "../ProductModal";
import VariationCard from "../VariationCard";
import ProductAmountController from "./ProductAmountController";
import TomanIcon from "@saas/icons/TomanIcon";
import DiscountedPriceView from "./DiscountPriceView";
import VariantCard from "../VariantCard";
import moment from "moment";
import { useRouter } from "next/router";
import ModifierModal from "../ModifierModal";
import Image from "next/image";

const PRODUCT_MODAL = "PRODUCT_MODAL";
const MODIFIRE_MODAL = "MODIFIRE_MODAL";

const MobileProductCard = ({
  deal,
  addOrderItemToCart,
  incrementOrderItemByOrderId,
  decrementOrderItemByOrderId,
  updateOrderItemByOrderId,
  updateMultipleOrdersItems,
  finalPrice,
  orderItem,
  customizedOrderItems = [],
  deleteOrderItem,
  couldShop,
  categoryId,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const title = deal?.title;
  const hasVariation = deal?.variants_data?.length;

  const variations = deal?.variations;
  const description = deal.description;
  let _description = description
    ?.replace(/(<[^>]+>)/g, " ")
    .replace("nan", " ");
  const hasModifier = Boolean(deal?.variations?.[0]?.modifier_sets?.length);
  const price = deal.default_variation?.initial_price;
  const discountedPrice = deal.default_variation?.discounted_price;
  const hasDiscountedPercent = price > discountedPrice;
  const discountPercent = calculateDiscountPercent(
    deal.default_variation?.initial_price,
    deal.default_variation?.discounted_price
  );
  const isAvailable =
    deal.default_variation?.available &&
    (deal.default_variation?.keep_selling ||
      deal.default_variation?.inventory_count > orderItem?.count);
  const [modalsState, setModalsState] = useState({
    MODIFIRE_MODAL: false,
    PRODUCT_MODAL: false,
  });
  const hasVariantsModifier = deal.variations.find(
    (variant) => variant.modifier_sets.length > 0
  );
  const themeColor = theme.palette.secondary.main;
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
    setModalsState({ ...modalsState, [modalType]: true });
    setSelectedVariant(variant);
    setSelectedCustomizedOrderItem(customizedOrderItem);
    setRemainingDealCount(remainingDealCount);
  };
  const handleClose = (modalType) => {
    setModalsState({ ...modalsState, [modalType]: false });
    setSelectedVariant(null);
  };

  useEffect(() => {
    if (
      !router.asPath.includes("#category-") &&
      +router.query.p === +deal.default_variation?.id &&
      +router.query.c === +categoryId
    ) {
      handleOpen(PRODUCT_MODAL);
    }
  }, []);
  return (
    <>
      <ProductModal
        isOpen={modalsState[PRODUCT_MODAL]}
        closeModalHandler={() => handleClose(PRODUCT_MODAL)}
        customizedOrderItems={customizedOrderItems}
        deal={deal}
        orderItem={orderItem}
        finalPrice={finalPrice}
        openModifiersModal={handleOpen}
        addOrderItemToCart={addOrderItemToCart}
        decrementOrderItemByOrderId={decrementOrderItemByOrderId}
        incrementOrderItemByOrderId={incrementOrderItemByOrderId}
        updateOrderItemByOrderId={updateOrderItemByOrderId}
        updateMultipleOrdersItems={updateMultipleOrdersItems}
        couldShop={couldShop}
        categoryId={categoryId}
      />

      <ModifierModal
        customizedOrderItems={customizedOrderItems}
        deal={deal}
        orderItem={orderItem}
        isAvailable={isAvailable}
        finalPrice={finalPrice}
        isOpen={modalsState[MODIFIRE_MODAL]}
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
        categoryId={categoryId}
      />

      <Paper
        className="p-3 w-100 new-product-card"
        style={{
          border: "1px solid rgba(228, 230, 231, 0.6)",
          borderRadius: 8,
          height:
            hasVariation || (hasModifier && customizedOrderItems?.length)
              ? "fit-content"
              : 120,
          backgroundColor: "#fff",
        }}
        onClick={() => {
          if (!hasVariation && hasModifier && customizedOrderItems?.length) {
            handleOpen(PRODUCT_MODAL);
          } else if (!hasVariation && hasModifier && isAvailable) {
            handleOpen(
              MODIFIRE_MODAL,
              null,
              null,
              deal.default_variation.inventory_count -
                customizedOrderItems?.reduce((a, b) => a + b?.count, 0)
            );
          } else handleOpen(PRODUCT_MODAL);
        }}
      >
        <>
          {hasVariation || (hasModifier && customizedOrderItems?.length) ? (
            <div
              className="pb-3 overflow-hidden"
              style={{ borderBottom: "1px solid #E4E6E7" }}
            >
              <div
                className="new-product-card__name mb-1 ml-2"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: textTypes.text.default,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </div>
              <div
                className="new-product-card__description"
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  color: textTypes.text.subdued,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                dangerouslySetInnerHTML={{
                  __html: _description,
                }}
              ></div>
            </div>
          ) : (
            <div className="d-flex align-items-start w-100 h-100">
              <div
                className="ml-5"
                style={{
                  width: 64,
                  height: 64,
                  border: "1px solid rgba(228, 230, 231, 0.6)",
                  borderRadius: 4,
                  boxSizing: "content-box",
                }}
              >
                <Image
                  width={62}
                  height={62}
                  quality={30}
                  layout="fixed"
                  className="u-border-radius-4"
                  src={
                    deal.has_image
                      ? deal.main_image_thumbnail_url
                      : deal?.default_variation?.main_image_thumbnail_url
                  }
                  alt="Product photo"
                />
              </div>
              <div className="overflow-hidden d-flex flex-column h-100 w-100">
                <div
                  className="new-product-card__name mb-1 d-flex justify-content-between align-items-center ml-2"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: textTypes.text.default,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  onClick={() => {
                    if (couldShop) {
                      handleOpen(PRODUCT_MODAL);
                    }
                  }}
                >
                  {title}
                </div>
                <div
                  className="new-product-card__description"
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: textTypes.text.subdued,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: _description,
                  }}
                ></div>
                <div className="d-flex w-100 align-items-end justify-content-between mt-auto">
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
                  {couldShop ? (
                    isAvailable || orderItem?.count > 0 ? (
                      <ProductAmountController
                        amount={orderItem.count}
                        increment={() => {
                          if (hasModifier) {
                            setModalsState({
                              ...modalsState,
                              [MODIFIRE_MODAL]: true,
                              [PRODUCT_MODAL]: false,
                            });
                          } else {
                            addOrderItemToCart(
                              deal,
                              [],
                              deal.default_variation.id
                            );
                          }
                        }}
                        decrement={() => {
                          decrementOrderItemByOrderId(orderItem.id);
                        }}
                        disabled={!isAvailable}
                      />
                    ) : (
                      <Button
                        disabled
                        style={{
                          backgroundColor: "#E4E5E7",
                          fontSize: 9,
                          fontWeight: 700,
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
            </div>
          )}

          {hasVariation
            ? variations
                .filter(
                  (variant) =>
                    !variant?.extra_data?.only_on_day ||
                    (variant?.extra_data?.only_on_day &&
                    variant?.extra_data?.only_on_day.length
                      ? variant?.extra_data?.only_on_day.find(
                          (sc) => sc.id === moment().day()
                        )
                      : true)
                )
                .map((variation, index) => {
                  const { images: variationImages } = variation;
                  let { main_image_thumbnail_url: mainImageThumbnailUrl } =
                    variation;
                  if (!variationImages?.length) {
                    mainImageThumbnailUrl = deal.main_image_thumbnail_url;
                  }
                  const discountPercent = calculateDiscountPercent(
                    variation.initial_price,
                    variation.discounted_price
                  );
                  const numberOfCustomizedOrderItemsWithSameVariantId =
                    customizedOrderItems
                      ?.filter(
                        (orderItem) => orderItem.variation_id === variation.id
                      )
                      ?.reduce((a, b) => a + b?.count, 0);
                  const maxVariantInventoryCount = variation.inventory_count;
                  const isVariantAvailable =
                    variation.available &&
                    (variation.keep_selling || variation.inventory_count > 0);

                  const hasVariantSpecificModifiers =
                    variation?.modifier_sets?.length;
                  const _orderItem = customizedOrderItems?.find(
                    (orderItem) => orderItem.variation_id === variation.id
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

                  const customizedOrderGroupByVariantId =
                    customizedOrderItems?.filter(
                      (orderItem) => orderItem.variation_id === variation.id
                    );
                  const variantsAmount =
                    Object.values(variations)?.length ||
                    0 + customizedOrderGroupByVariantId?.length ||
                    0;
                  const variantCount = _orderItem.count || 0;
                  return (
                    <>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (couldShop) {
                            if (!hasVariantSpecificModifiers) {
                              handleOpen(PRODUCT_MODAL, variation, _orderItem);
                            } else if (
                              numberOfCustomizedOrderItemsWithSameVariantId !==
                              maxVariantInventoryCount
                            ) {
                              handleOpen(
                                MODIFIRE_MODAL,
                                variation,
                                null,
                                maxVariantInventoryCount -
                                  numberOfCustomizedOrderItemsWithSameVariantId
                              );
                            }
                          }
                        }}
                        style={{
                          borderBottom:
                            index < variantsAmount - 1
                              ? "1px solid #E4E6E7"
                              : "",
                        }}
                      >
                        <VariantCard
                          dealImage={mainImageThumbnailUrl}
                          isInMobile={true}
                          customizedOrderItems={customizedOrderItems}
                          variant={variation}
                          hasVariantModifier={hasVariantSpecificModifiers}
                          isAvailable={isVariantAvailableByHavingModifier}
                          hasVariantsModifier={hasVariantsModifier}
                          isAvailableWithoutInventoryCount={
                            isAvailableWithoutInventoryCount
                          }
                          maxVariantInventoryCount={maxVariantInventoryCount}
                          discountPercent={discountPercent}
                          variantCount={variantCount}
                          addAction={() => {
                            if (hasVariantSpecificModifiers) {
                              handleOpen(
                                MODIFIRE_MODAL,
                                variation,
                                null,
                                maxVariantInventoryCount -
                                  numberOfCustomizedOrderItemsWithSameVariantId
                              );
                            } else {
                              addOrderItemToCart(deal, [], variation.id);
                            }
                          }}
                          decreaseAction={() => {
                            decrementOrderItemByOrderId(_orderItem?.id);
                          }}
                          orderItem={_orderItem}
                          couldShop={couldShop}
                        />
                      </div>

                      {hasVariantSpecificModifiers
                        ? customizedOrderGroupByVariantId?.map((_orderItem) => {
                            if (variation.id === _orderItem.variation_id) {
                              const variantCount = _orderItem.count;
                              const discountPercent = calculateDiscountPercent(
                                variation.initial_price,
                                variation.discounted_price
                              );
                              const modifiersName = _orderItem?.modifiers
                                ?.map((modifier) => modifier.title)
                                .join("،");

                              return (
                                <div
                                  key={`custom-var-${variation.id}`}
                                  className={`${
                                    index === variantsAmount - 1
                                      ? "pt-3"
                                      : "py-3"
                                  }`}
                                  style={{
                                    borderBottom:
                                      index !== variantsAmount - 1
                                        ? "1px solid #E4E6E7"
                                        : "",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (couldShop) {
                                      handleOpen(
                                        MODIFIRE_MODAL,
                                        variation,
                                        _orderItem
                                      );
                                    }
                                  }}
                                >
                                  <VariationCard
                                    modifiersName={modifiersName}
                                    variation={{
                                      ...variation,
                                      discountPercent,
                                      isAvailable:
                                        isVariantAvailableByHavingModifier,
                                      variantCount,
                                      index,
                                    }}
                                    openModifierModal={() =>
                                      handleOpen(
                                        MODIFIRE_MODAL,
                                        variation,
                                        null,
                                        variation.inventory_count -
                                          numberOfCustomizedOrderItemsWithSameVariantId
                                      )
                                    }
                                    maxVariationInventoryCount={
                                      variation.inventory_count
                                    }
                                    numberOfCustomizedOrderItemsWithSameVariantId={
                                      numberOfCustomizedOrderItemsWithSameVariantId
                                    }
                                    hasModifier={hasModifier}
                                    finalPrice={finalPrice}
                                    deal={deal}
                                    customized
                                    themeColor={themeColor}
                                    incrementOrderItemByOrderId={
                                      incrementOrderItemByOrderId
                                    }
                                    decrementOrderItemByOrderId={
                                      decrementOrderItemByOrderId
                                    }
                                    orderItem={_orderItem}
                                    couldShop={couldShop}
                                  />
                                </div>
                              );
                            }
                          })
                        : null}
                    </>
                  );
                })
            : null}

          {!hasVariation && hasModifier && customizedOrderItems?.length
            ? customizedOrderItems?.map((_orderItem) => {
                const modifiersName = _orderItem?.modifiers
                  ?.map((modifier) => modifier.title)
                  .join("،");
                const numberOfCustomizedOrderItems =
                  customizedOrderItems?.reduce((a, b) => a + b?.count, 0);
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (couldShop) {
                        handleOpen(MODIFIRE_MODAL, null, _orderItem);
                      }
                    }}
                    key={_orderItem.id}
                    className="my-3"
                  >
                    <div className="w-100 d-flex align-items-center justify-content-between">
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: textTypes.text.default,
                        }}
                        className="mb-1"
                      >
                        {title.length > 25 ? title.slice(0, 24) + "..." : title}
                      </div>
                      <div
                        style={{
                          background: "#F2F7FE",
                          padding: "2px 8px",
                          borderRadius: 100,
                          fontSize: 12,
                        }}
                      >
                        Personalized
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 400,
                        color: textTypes.text.subdued,
                      }}
                    >
                      {modifiersName}
                    </div>
                    <div className="d-flex w-100 align-items-end justify-content-between mt-3">
                      {discountedPrice !== price ? (
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
                              {priceFormatter(price)}
                            </div>
                            <div
                              className="p-1"
                              style={{
                                color: themeColor,
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
                            className="d-flex align-items-center justify-content-center new-product-card__price"
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: textTypes.text.default,
                            }}
                          >
                            {priceFormatter(discountedPrice)}{" "}
                            <TomanIcon
                              className="mr-1"
                              height={21}
                              color="#202223"
                            />{" "}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="d-flex align-items-center justify-content-center new-product-card__price"
                          style={{
                            fontSize: 12,
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
                      {couldShop ? (
                        <ProductAmountController
                          amount={_orderItem.count}
                          increment={() => {
                            incrementOrderItemByOrderId(_orderItem.id);
                          }}
                          decrement={() => {
                            decrementOrderItemByOrderId(_orderItem.id);
                          }}
                          disabled={
                            deal.default_variation.inventory_count ===
                            numberOfCustomizedOrderItems
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })
            : null}
        </>
      </Paper>
    </>
  );
};

export default memo(MobileProductCard);
