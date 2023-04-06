import {memo, useEffect, useMemo, useState} from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {textTypes} from "@saas/utils/colors";
import {calculateDiscountPercent} from "@saas/utils/helpers/calculateDiscountPercent";
import {priceFormatter} from "@saas/utils/helpers/priceFormatter";

import ProductModal from "../ProductModal";
import ProductAmountController from "./ProductAmountController";
import TomanIcon from "@saas/icons/TomanIcon";
import DiscountedPriceView from "./DiscountPriceView";
import {useRouter} from "next/router";
import ModifierModal from "../ModifierModal";
import Image from "next/image";


const variation_icon = `/images/variation-icon.svg`;
const PRODUCT_MODAL = "PRODUCT_MODAL";
const MODIFIRE_MODAL = "MODIFIRE_MODAL";

const DesktopProductCard = ({
                                deal,
                                addOrderItemToCart,
                                incrementOrderItemByOrderId,
                                decrementOrderItemByOrderId,
                                updateOrderItemByOrderId,
                                updateMultipleOrdersItems,
                                customized,
                                finalPrice,
                                orderItem,
                                customizedOrderItems = [],
                                deleteOrderItem,
                                couldShop,
                                categoryId,
                            }) => {
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
        setModalsState({...modalsState, [modalType]: true});
        setSelectedVariant(variant);
        setSelectedCustomizedOrderItem(customizedOrderItem);
        setRemainingDealCount(remainingDealCount);
    };
    const handleClose = (modalType) => {
        setModalsState({...modalsState, [modalType]: false});
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
    const minimumVariantPrice = useMemo(() => {
        if (hasVariation) {
            const variantsPrice = Object.values(variations).map(
                (varaint) => varaint.discounted_price
            );
            return Math.min(...variantsPrice);
        }
        return null;
    }, [variations, hasVariation]);
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
                    setModalsState({MODIFIRE_MODAL: false, PRODUCT_MODAL: false})
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
                className="p-5 w-100 h-100 new-product-card"
                style={{
                    border: "1px solid rgba(228, 230, 231, 0.6)",
                    borderRadius: 8,
                    height: 153,
                    backgroundColor: "#fff",
                    cursor: "pointer",
                }}
                onClick={() => {
                    if (customizedOrderItems?.length && !hasVariation) {
                        handleOpen(PRODUCT_MODAL);
                    } else if (!hasVariation && hasModifier && isAvailable) {
                        handleOpen(
                            MODIFIRE_MODAL,
                            null,
                            null,
                            deal.default_variation?.inventory_count - orderItem.count
                        );
                    } else handleOpen(PRODUCT_MODAL);
                }}
            >
                <div className="d-flex align-items-start w-100 h-100">
                    <div
                        className="ml-5"
                        style={{
                            boxSizing: "content-box",
                            width: 102,
                            height: 102,
                            border: "1px solid rgba(228, 230, 231, 0.6)",
                            borderRadius: 8,
                        }}
                    >
                        <Image
                            width={102}
                            height={102}
                            quality={30}
                            layout="fixed"
                            className="u-border-radius-8"
                            src={
                                deal.has_image
                                    ? deal.main_image_thumbnail_url
                                    : deal?.default_variation?.main_image_thumbnail_url
                            }
                            alt="عکس محصول"
                        />
                    </div>

                    <div className="overflow-hidden d-flex flex-column h-100 w-100">
                        <div
                            className="new-product-card__name mb-2 d-flex justify-content-between align-items-center"
                            style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: textTypes.text.default,
                            }}
                            onClick={() => {
                                if (couldShop) {
                                    handleOpen(PRODUCT_MODAL);
                                }
                            }}
                        >
                            <div
                                style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {title}
                            </div>
                            {!customized && hasVariation ? (
                                <div className="mr-2">
                                    <img src={variation_icon} alt="عکس محصول وریشن دار"/>
                                </div>
                            ) : null}
                            {customized && (
                                <div
                                    style={{
                                        background: "#F2F7FE",
                                        padding: "2px 8px",
                                        borderRadius: 100,
                                        fontSize: 12,
                                    }}
                                    className="mr-2"
                                >
                                    شخصی‌سازی شده
                                </div>
                            )}
                        </div>
                        <div
                            className="new-product-card__description"
                            style={{
                                fontSize: 13,
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
                        <div
                            className={`${"justify-content-between"} align-items-end w-100 d-flex mt-auto`}
                        >
                            {hasVariation ? (
                                <div
                                    className="new-product-card__price"
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        color: textTypes.text.default,
                                    }}
                                >
                                    <div className="d-flex align-items-center justify-content-center">
                                        {"از " + priceFormatter(minimumVariantPrice)}{" "}
                                        <TomanIcon
                                            className="mr-1"
                                            width={21}
                                            height={21}
                                            color="#202223"
                                        />{" "}
                                    </div>
                                </div>
                            ) : hasDiscountedPercent ? (
                                <DiscountedPriceView
                                    price={price}
                                    discountedPrice={discountedPrice}
                                    discountPercent={discountPercent}
                                />
                            ) : (
                                <div
                                    className="new-product-card__price"
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        color: textTypes.text.default,
                                    }}
                                >
                                    <div className="d-flex align-items-center justify-content-center">
                                        {priceFormatter(discountedPrice)}{" "}
                                        <TomanIcon
                                            className="mr-1"
                                            width={21}
                                            height={21}
                                            color="#202223"
                                        />{" "}
                                    </div>
                                </div>
                            )}
                            {couldShop ? (
                                hasVariation ? (
                                    isAvailable ? (
                                        <ProductAmountController
                                            amount={orderItem.count}
                                            increment={() => {
                                                setModalsState({
                                                    ...modalsState,
                                                    [MODIFIRE_MODAL]: false,
                                                    [PRODUCT_MODAL]: true,
                                                });
                                            }}
                                            decrement={() => {
                                                decrementOrderItemByOrderId(orderItem.id);
                                            }}
                                        />
                                    ) : (
                                        <Button
                                            className="mr-auto"
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
                                            اتمام موجودی
                                        </Button>
                                    )
                                ) : isAvailable || orderItem.count > 1 ? (
                                    <ProductAmountController
                                        amount={hasVariation || hasModifier ? 0 : orderItem.count}
                                        increment={() => {
                                            if (hasVariation) {
                                                setModalsState({
                                                    ...modalsState,
                                                    [MODIFIRE_MODAL]: false,
                                                    [PRODUCT_MODAL]: true,
                                                });
                                            } else if (hasModifier) {
                                                setModalsState({
                                                    ...modalsState,
                                                    [MODIFIRE_MODAL]: true,
                                                    [PRODUCT_MODAL]: false,
                                                });
                                            } else if (orderItem.id) {
                                                incrementOrderItemByOrderId(orderItem.id);
                                            } else {
                                                addOrderItemToCart(deal, [], deal.default_variation.id);
                                            }
                                        }}
                                        decrement={() => {
                                            decrementOrderItemByOrderId(orderItem.id);
                                        }}
                                        disabled={!hasVariation && !isAvailable}
                                    />
                                ) : (
                                    <Button
                                        className="mr-auto"
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
                                        اتمام موجودی
                                    </Button>
                                )
                            ) : null}
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default memo(DesktopProductCard);
