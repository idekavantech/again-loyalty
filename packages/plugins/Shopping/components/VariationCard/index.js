import { memo } from "react";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import { textTypes } from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import ProductAmountController from "../ProductCard2/ProductAmountController";
import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";

const VariationCard = ({
  modifiersName = null,
  variation,
  deal,
  customized,
  addOrderItemToCart,
  incrementOrderItemByOrderId,
  decrementOrderItemByOrderId,
  orderItem,
  hasModifier,
  openModifierModal,
  numberOfCustomizedOrderItemsWithSameVariantId,
  maxVariationInventoryCount,
  couldShop,
}) => {
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  return (
    <>
      <>
        <div key={variation.id}>
          <div className="d-flex align-items-start w-100 h-100">
            {variation.image_url ? (
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
                <img
                  alt=""
                  style={{
                    width: 64,
                    borderRadius: 4,
                    height: 64,
                  }}
                  className="overflow-hidden object-fit-cover"
                  src={variation.image_url}
                />
              </div>
            ) : null}
            <div
              className={`overflow-hidden d-flex flex-column h-100 ${
                variation.image_url ? "w-75" : "w-100"
              }`}
            >
              <div
                className="new-product-card__name mb-1 d-flex justify-content-between align-items-center"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: textTypes.text.default,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {variation.title.length > 25
                  ? variation.title.slice(0, 24) + "..."
                  : variation.title}
                {customized && (
                  <div
                    className="mr-2"
                    style={{
                      background: "#F2F7FE",
                      padding: "2px 8px",
                      borderRadius: 100,
                      fontSize: 12,
                    }}
                  >
                    Personalized
                  </div>
                )}
              </div>

              {modifiersName ? (
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
                >
                  {modifiersName}
                </div>
              ) : null}

              <div className="d-flex w-100 align-items-end justify-content-between mt-3">
                {variation.discounted_price !== variation.initial_price ? (
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <div className="d-flex align-items-center justify-content-start">
                      <div
                        className="ml-1"
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: textTypes.text.disabled,
                          textDecoration: "line-through",
                        }}
                      >
                        {priceFormatter(variation.initial_price)}{" "}
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
                        {englishNumberToPersianNumber(
                          variation.discountPercent
                        )}
                        %
                      </div>
                    </div>
                    <div
                      className="new-product-card__price"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: textTypes.text.default,
                      }}
                    >
                      {priceFormatter(variation.discounted_price)}{" "}
                      <Icon icon={$} width={21} height={21} color="black" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="new-product-card__price"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: textTypes.text.default,
                    }}
                  >
                    {priceFormatter(variation.initial_price)}{" "}
                    <Icon icon={$} width={21} height={21} color="black" />
                  </div>
                )}
                {couldShop ? (
                  customized ? (
                    <ProductAmountController
                      amount={orderItem.count}
                      increment={() => {
                        if (customized) {
                          incrementOrderItemByOrderId(orderItem.id);
                        } else if (hasModifier) {
                          openModifierModal();
                        } else {
                          addOrderItemToCart(deal, [], variation.id);
                        }
                      }}
                      decrement={() => {
                        decrementOrderItemByOrderId(orderItem.id);
                      }}
                      disabled={
                        maxVariationInventoryCount ===
                        numberOfCustomizedOrderItemsWithSameVariantId
                      }
                    />
                  ) : hasModifier ? (
                    variation.isAvailable &&
                    numberOfCustomizedOrderItemsWithSameVariantId !==
                      maxVariationInventoryCount ? (
                      <ProductAmountController
                        amount={orderItem.count}
                        increment={() => {
                          if (customized) {
                            incrementOrderItemByOrderId(orderItem.id);
                          } else if (hasModifier) {
                            openModifierModal();
                          } else {
                            addOrderItemToCart(deal, [], variation.id);
                          }
                        }}
                        decrement={() => {
                          decrementOrderItemByOrderId(orderItem.id);
                        }}
                        disabled={
                          !variation.isAvailable ||
                          (!variation.keep_selling &&
                            variation.inventory_count <= orderItem.count)
                        }
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
                  ) : variation.isAvailable ? (
                    <ProductAmountController
                      amount={orderItem.count}
                      increment={() => {
                        addOrderItemToCart(deal, [], variation.id);
                      }}
                      decrement={() => {
                        decrementOrderItemByOrderId(orderItem.id);
                      }}
                      disabled={
                        !variation.isAvailable ||
                        (!variation.keep_selling &&
                          variation.inventory_count <= orderItem.count)
                      }
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
        </div>
      </>
    </>
  );
};

export default memo(VariationCard);
