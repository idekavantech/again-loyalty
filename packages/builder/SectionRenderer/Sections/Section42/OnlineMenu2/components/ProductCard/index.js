import React, { useState } from "react";

import { textTypes } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import ProductModal from "@saas/plugins/Shopping/components/ProductModal";
import ModifiersModal from "@saas/plugins/Shopping/components/ModifierModal";
import ControllerButton from "../ControllerButton";
import DetailModal from "@saas/plugins/Shopping/components/DetailModal";

const PRODUCT_MODAL = "PRODUCT_MODAL";
const MODIFIRE_MODAL = "MODIFIRE_MODAL";
const DETAIL_MODAL = "DETAIL_MODAL";

export default function ProductCard({
  deal,
  themeColor,
  isMobile = true,
  addOrderItemToCart,
  incrementOrderItemByOrderId,
  decrementOrderItemByOrderId,
  updateOrderItemByOrderId,
  updateMultipleOrdersItems,
  deleteOrderItem,
  couldShop,
  customizedOrderItems,
  orderItem,
  categoryId,
  customization,
}) {
  const isAvailable =
    deal.default_variation.available &&
    (deal.default_variation.keep_selling ||
      deal.default_variation.inventory_count > orderItem?.count);
  const hasVariation = deal?.variations?.length > 1;
  const hasModifier = Boolean(deal?.variations?.[0]?.modifier_sets?.length);
  const [ModalsState, setModalsState] = useState({
    MODIFIRE_MODAL: false,
    PRODUCT_MODAL: false,
    DETAIL_MODAL: false,
  });

  const {
    colors: {
      card_background_color,
      card_texts_color,
      use_theme_color,
      card_theme_color,
    } = {},
    shows
  } = customization;
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedCustomizedOrderItem, setSelectedCustomizedOrderItem] =
    useState(null);
  const [remainingDealCount, setRemainingDealCount] = useState(null);

  let showPlusBtn = true;
  if(shows != undefined && !shows.show_plus_btn) showPlusBtn = false
  
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

  return (
    <>
      <ProductModal
        isOpen={ModalsState[PRODUCT_MODAL]}
        closeModalHandler={() => handleClose(PRODUCT_MODAL)}
        customizedOrderItems={customizedOrderItems}
        deal={deal}
        orderItem={orderItem}
        openModifiersModal={handleOpen}
        addOrderItemToCart={addOrderItemToCart}
        decrementOrderItemByOrderId={decrementOrderItemByOrderId}
        incrementOrderItemByOrderId={incrementOrderItemByOrderId}
        updateOrderItemByOrderId={updateOrderItemByOrderId}
        updateMultipleOrdersItems={updateMultipleOrdersItems}
        couldShop={couldShop}
        categoryId={categoryId}
      />
      <ModifiersModal
        customizedOrderItems={customizedOrderItems}
        deal={deal}
        orderItem={orderItem}
        // isAvailable={isAvailable}
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
        categoryId={categoryId}
      />
      <DetailModal
        isOpen={ModalsState[DETAIL_MODAL]}
        closeModalHandler={() => handleClose(DETAIL_MODAL)}
        deal={deal}
        useThemeColor={card_theme_color}
      />
      <div
        className={`d-flex justify-content-center align-items-center h-100 ${
          isMobile ? "py-0" : "py-4"
        } online-menu-card${isMobile ? "" : "-desktop"}`}
        style={{
          borderBottom: isMobile
            ? `0.5px solid ${use_theme_color ? themeColor : card_theme_color}`
            : "0.5px solid transparent",
          flexDirection: isMobile ? "row" : "column",
          backgroundColor: isMobile
            ? "transparent"
            : card_background_color || "#fff",
        }}
      >
        <div
          className={`my-4 my-md-3 online-menu-card${
            isMobile ? "" : "-desktop"
          }__img-wrapper ${isMobile ? "flex-row" : "flex-column"}`}
          style={{
            border: isMobile
              ? `0.5px solid ${use_theme_color ? themeColor : card_theme_color}`
              : "1px solid transparent",
            padding: isMobile ? 4 : 0,
          }}
        >
          <img
            alt=""
            onClick={() =>
              setModalsState({
                [MODIFIRE_MODAL]: false,
                [PRODUCT_MODAL]: false,
                [DETAIL_MODAL]: true,
              })
            }
            className={`w-100 h-100 online-menu-card${
              isMobile ? "" : "-desktop"
            }__img`}
            src={deal?.main_image_url}
            style={{
              borderRadius: isMobile ? 12 : 0,
            }}
          />
        </div>
        {isMobile ? (
          <div
            className={`  px-md-1 online-menu-card${
              isMobile ? "" : "-desktop"
            }__title`}
            style={{
              textAlign: "right",
              color: card_texts_color || "#202223",
              lineHeight: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: deal?.description ? "space-between" : "center",
            }}
          >
            <div className={"d-flex mt-4"}>
              <p className="title" style={{ width: "50%" }}>
                {deal?.title}
              </p>
              <div
                className={`mr-auto pr-md-3 online-menu-card${
                  isMobile ? "" : "-desktop"
                }__price`}
                style={{
                  color: card_texts_color || textTypes.text.default,
                  textAlign: "left",
                  lineHeight: "16px",
                  width: "50%",
                }}
              >
                {englishNumberToPersianNumber(
                  deal?.default_variation?.discounted_price
                )}{" "}
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 300,
                    color: card_texts_color || textTypes.text.default,
                  }}
                >
                  Toman
                </span>
              </div>
            </div>

            <div
              className={`d-flex align-items-center justify-content-${
                deal.description ? "between" : "end"
              } mb-2`}
            >
              {deal?.description ? (
                <p
                  className="description mt-2"
                  style={{
                    fontSize: 12,
                    color: card_texts_color || "#6D7175",
                    fontWeight: 400,
                    width: "50%",
                    flexGrow: 1,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `
      ${deal?.description}
      `,
                  }}
                />
              ) : null}
              {showPlusBtn && <ControllerButton
                isMobile={isMobile}
                amount={hasVariation || hasModifier ? 0 : orderItem?.count}
                customization={customization}
                increment={() => {
                  if (hasVariation) {
                    setModalsState({
                      ...ModalsState,
                      [MODIFIRE_MODAL]: false,
                      [PRODUCT_MODAL]: true,
                    });
                  } else if (hasModifier) {
                    setModalsState({
                      ...ModalsState,
                      [MODIFIRE_MODAL]: true,
                      [PRODUCT_MODAL]: false,
                    });
                  } else if (orderItem.id) {
                    incrementOrderItemByOrderId(orderItem.id);
                  } else {
                    addOrderItemToCart(deal, [], null);
                  }
                }}
                decrement={() => {
                  decrementOrderItemByOrderId(orderItem.id);
                }}
                disabled={!hasVariation && !isAvailable}
              />}
            </div>
          </div>
        ) : (
          <p
            className={`mb-4 mt-1   px-md-3 online-menu-card${
              isMobile ? "" : "-desktop"
            }__title`}
            style={{
              textAlign: "right",
              color: card_texts_color || "#6D7175",
            }}
          >
            {deal?.title}
          </p>
        )}

        {!isMobile && (
          <div
            style={{
              width: !isMobile ? "100%" : "auto",
              height: isMobile ? 48 : "auto",
              marginTop: isMobile ? -8 : 0,
            }}
          >
            <div
              className={`mr-auto px-md-3 online-menu-card${
                isMobile ? "" : "-desktop"
              }__price`}
              style={{
                color: card_texts_color || textTypes.text.default,
                textAlign: "left",
                lineHeight: "16px",
              }}
            >
              {englishNumberToPersianNumber(
                deal?.default_variation?.discounted_price
              )}{" "}
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 300,
                  color: card_texts_color || textTypes.text.default,
                }}
              >
                Toman
              </span>
            </div>
            {showPlusBtn && <ControllerButton
              amount={hasVariation || hasModifier ? 0 : orderItem?.count}
              customization={customization}
              increment={() => {
                if (hasVariation) {
                  setModalsState({
                    ...ModalsState,
                    [MODIFIRE_MODAL]: false,
                    [PRODUCT_MODAL]: true,
                  });
                } else if (hasModifier) {
                  setModalsState({
                    ...ModalsState,
                    [MODIFIRE_MODAL]: true,
                    [PRODUCT_MODAL]: false,
                  });
                } else if (orderItem.id) {
                  incrementOrderItemByOrderId(orderItem.id);
                } else {
                  addOrderItemToCart(deal, [], null);
                }
              }}
              decrement={() => {
                decrementOrderItemByOrderId(orderItem.id);
              }}
              disabled={!hasVariation && !isAvailable}
            />}
          </div>
        )}
      </div>
    </>
  );
}
