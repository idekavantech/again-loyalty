import React, { memo, useEffect, useRef, useState } from "react";

import Head from "next/head";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@saas/components/Input";
import Icon from "@saas/components/Icon";
import { $ } from "@saas/icons";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import cloneDeep from "lodash/cloneDeep";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectAdminProducts,
  makeSelectDealsByIds,
  makeSelectShoppingAdminOrder,
  makeSelectShoppingAdminOrderInvoice,
} from "../../../../store/selectors";
import {
  editShoppingAdminOrder,
  getAdminProducts,
  getAdminProductsByIds,
  getShoppingAdminOrder,
  getShoppingAdminOrderInvoice,
  setShoppingAdminOrderInvoice,
} from "../../../../store/actions";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import {
  alterInventoryOptions,
  PLUGIN_INACTIVE_STATUS,
} from "@saas/stores/plugins/constants";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import Divider from "@material-ui/core/Divider";
import {
  cement,
  graphite,
  night,
  pollution,
  smoke,
  strawberryI,
} from "@saas/utils/colors";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import SearchProductsModal from "./Modals/SearchProductsModal";
import ThreeDotsBounceLoading from "@saas/components/ThreeDotsBounceLoading";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import {
  NEW_ORDER_STATUS_CART,
  NEW_ORDER_STATUS_COMP,
  NEW_ORDER_STATUS_VOID,
} from "@saas/plugins/Shopping/constants";
import EditIcon from "@material-ui/icons/Edit";
import ModifiersModal from "./Modals/ModifiersModal";
import isMatch from "lodash/isMatch";
import { useDeepEffect } from "@saas/stores/hooks/useDeepEffect";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { DEALS_BY_ID } from "@saas/stores/global/constants";

let timeoutId = null;

export function AdminEditOrder({
  adminOrder = {},
  loading,
  adminDealsLoading,
  _getAdminOrder,
  urlPrefix,
  plugin = SHOPPING_PLUGIN,
  pluginsData,
  business,
  _getAdminProducts,
  adminDeals,
  _getAdminProductsByIds,
  adminDealsByIds,
  _editOrder,
  _getAdminOrderInvoice,
  adminOrderInvoice,
  _setSnackBarMessage,
  _emptyAdminOrderInvoice,
}) {
  const order = { ...adminOrder, ...adminOrderInvoice };
  const [orderItems, setOrderItems] = useState({
    data: null,
    shouldUpdateInvoice: true,
  });
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPackagingPrice, setTotalPackagingPrice] = useState(0);
  const [customDiscountAmount, setCustomDiscountAmount] = useState(0);
  const [discountAmountUsed, setDiscountAmountUsed] = useState(0);
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0);
  const [taxingPrice, setTaxingPrice] = useState(0);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [isTaxingPriceEdited, setIsTaxingPriceEdited] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  const businessSiteDomain = router.query.business;
  const selected_business = order
    ? business.site_domain === businessSiteDomain
      ? business
      : business.branches?.find(
          (_business) => _business.site_domain === businessSiteDomain
        )
    : null;
  const shoppingPluginData =
    selected_business?.plugins_config?.[SHOPPING_PLUGIN]?.status !==
    PLUGIN_INACTIVE_STATUS
      ? selected_business?.plugins_config?.[SHOPPING_PLUGIN]?.data
      : null;
  const [isSearchModalOpen, toggleSearchModal] = useState(false);
  const [isModifiersModalOpen, toggleModifiersModal] = useState(false);
  const [selectedProduct, selectProduct] = useState({});
  const [selectedVariant, selectVariant] = useState({});
  const [selectedIndex, selectIndex] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      _getAdminOrder(router.query.id);
    }, 0);

    return () => {
      _emptyAdminOrderInvoice([]);
    };
  }, []);

  useDeepEffect(() => {
    const obj = {
      order_items: orderItems.data?.filter((orderItem) => orderItem.amount),
      business_id: selected_business?.id,
      delivery_price: deliveryPrice
        ? +persianToEnglishNumber(deliveryPrice)
        : undefined,
      order_packaging_price: totalPackagingPrice
        ? +persianToEnglishNumber(totalPackagingPrice)
        : undefined,
      custom_discount_amount: customDiscountAmount
        ? +persianToEnglishNumber(customDiscountAmount)
        : undefined,
      discount_amount_used: discountAmountUsed
        ? +persianToEnglishNumber(discountAmountUsed)
        : undefined,
      coupon_discount_amount: couponDiscountAmount
        ? +persianToEnglishNumber(couponDiscountAmount)
        : undefined,
    };
    if (isTaxingPriceEdited) {
      obj.taxing_price = +persianToEnglishNumber(taxingPrice);
      obj.taxing_type = "C";
    }
    clearTimeout(timeoutId);
    if (orderItems.shouldUpdateInvoice)
      timeoutId = setTimeout(() => {
        _getAdminOrderInvoice(router.query.id, obj);
      }, 500);
  }, [orderItems.data]);

  useDeepEffect(() => {
    if (order) {
      if (!adminDealsByIds)
        setTimeout(() => {
          _getAdminProductsByIds(
            selected_business?.slug,
            order.items.map((item) => item.product_id)
          );
        }, 0);
      setOrderItems({
        data: order.items.map((item) => ({
          product_id: item.product_id,
          variation_id: item.variation_id,
          amount: item.amount,
          modifiers: item.modifiers,
        })),
        shouldUpdateInvoice: false,
      });
      setDeliveryPrice(order?.delivery_price);
      setTotalPackagingPrice(order?.total_packaging_price);
      setCustomDiscountAmount(order?.custom_discount_amount);
      setDiscountAmountUsed(order?.discount_code_amount);
      setCouponDiscountAmount(order?.coupon_discount_amount);
      setTaxingPrice(order?.taxing_price);
    }
  }, [order]);

  const addItems = (selectedProductsDictionary, modifiersDictionary) => {
    const _orderItems = cloneDeep(orderItems.data);

    Object.entries(selectedProductsDictionary).map(([key]) => {
      const product_id = +key.split("_")[0];
      const variation_id = +key.split("_")[1] || null;
      const foundIndex = _orderItems.findIndex(
        (item) =>
          item.product_id === product_id &&
          (!variation_id || item.variation_id === variation_id) &&
          JSON.stringify(item.modifiers?.map((modifier) => modifier.id)) ===
            JSON.stringify(
              Object.values(modifiersDictionary[key] || {}).map(
                (modifier) => modifier.id
              )
            )
      );
      if (foundIndex > -1) {
        _orderItems[foundIndex].amount += 1;
      } else {
        const newOrderItem = {
          product_id,
          variation_id,
          amount: 1,
          modifiers: modifiersDictionary[key]
            ? Object.values(modifiersDictionary[key])
            : [],
        };

        _orderItems.push(newOrderItem);
      }
    });

    setOrderItems({ data: _orderItems, shouldUpdateInvoice: true });
    toggleSearchModal(false);
  };
  const editModifiers = (selectedModifiers, product_key, variation_id) => {
    const _orderItems = cloneDeep(orderItems.data);
    const foundIndex = _orderItems.findIndex(
      (item, _index) =>
        item.product_id === product_key &&
        item.variation_id === variation_id &&
        _index === selectedIndex
    );
    if (foundIndex > -1) {
      _orderItems[foundIndex].modifiers = selectedModifiers;
    }
    setOrderItems({ data: _orderItems, shouldUpdateInvoice: true });
    toggleModifiersModal(false);
  };
  const setReason = (index, reason) => {
    const _orderItems = cloneDeep(orderItems.data);
    _orderItems[index].reason = parseInt(reason);
    setOrderItems({ data: _orderItems, shouldUpdateInvoice: true });
  };
  const toggleRestock = (index) => {
    const _orderItems = cloneDeep(orderItems.data);
    _orderItems[index].restock = !Boolean(_orderItems[index].restock);
    setOrderItems({ data: _orderItems, shouldUpdateInvoice: true });
  };
  const increase = (index, differenceAmount) => {
    const _orderItems = cloneDeep(orderItems.data);
    _orderItems[index].amount += 1;
    if (differenceAmount >= 0) {
      delete _orderItems[index].restock;
      delete _orderItems[index].reason;
    }
    setOrderItems({ data: _orderItems, shouldUpdateInvoice: true });
  };

  const decrease = (index, differenceAmount) => {
    const _orderItems = cloneDeep(orderItems.data);
    if (_orderItems[index].amount > 0) {
      _orderItems[index].amount -= 1;
      const isItemAlreadyAdded = adminOrder?.items.find(
        (item) => item.id === _orderItems[index].product_id
      );
      if (_orderItems[index].amount === 0 && !isItemAlreadyAdded) {
        _orderItems.splice(index, 1);
      }
      if (differenceAmount < 0 && _orderItems[index]) {
        _orderItems[index].restock = true;
        _orderItems[index].reason = 1;
      }
      setOrderItems({ data: _orderItems, shouldUpdateInvoice: true });
    }
  };
  const pluginUrl = pluginsData[plugin].plugin_url;
  return (
    <>
      <Head>
        <title>
          {order?.order_status === NEW_ORDER_STATUS_CART
            ? "Order"
            : "Edit the order"}
        </title>
      </Head>
      {isSearchModalOpen && (
        <SearchProductsModal
          isOpen={isSearchModalOpen}
          onClose={() => toggleSearchModal(false)}
          getProducts={_getAdminProducts}
          deals={adminDeals}
          selected_business={selected_business}
          businessSlug={business?.slug}
          loading={loading}
          submit={addItems}
          orderItems={orderItems.data}
        />
      )}
      <ModifiersModal
        isOpen={isModifiersModalOpen}
        onClose={() => toggleModifiersModal(false)}
        loading={loading}
        submit={editModifiers}
        orderItems={orderItems.data}
        selectedProduct={selectedProduct}
        selectedVariant={selectedVariant}
        selectedIndex={selectedIndex}
      />
      <div className="container pb-3">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <div
              onClick={() => {
                order?.order_status === NEW_ORDER_STATUS_CART
                  ? router.back()
                  : router.push(
                      `${urlPrefix}${pluginUrl}/orders/${router.query.id}?is_edited=true`
                    );
              }}
              className="d-flex justify-content-center align-items-center p-2"
              style={{
                border: `1px solid ${cement}`,
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              <ChevronRightRoundedIcon
                fontSize="medium"
                style={{ color: smoke }}
              />
            </div>
            <div className="mr-3 position-relative">
              {order?.order_status === NEW_ORDER_STATUS_CART
                ? `Order registration in${selected_business?.title || ""}`
                : "Edit the order"}
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap" style={{ color: night }}>
          <div
            className={`${
              minWidth768 ? "pl-2 pr-0 col-7" : "px-0 col-12"
            } pt-4`}
          >
            <Paper elevation={2} className="mb-3 d-flex flex-1 flex-column">
              <div className="px-5 pt-5 pb-4" style={{ fontWeight: 500 }}>
                Add product
              </div>
              <div className="px-5 pb-4 d-flex justify-content-between">
                <div
                  className="w-100"
                  onClick={() => {
                    toggleSearchModal(true);
                  }}
                >
                  <Input
                    size="small"
                    inputRef={inputRef}
                    style={{
                      width: "100%",
                    }}
                    className="ml-2"
                    placeholder={minWidth768 ? "Product search" : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          className="u-cursor-pointer"
                          position="start"
                        >
                          <SearchRoundedIcon
                            className="mr-1"
                            style={{ color: theme.palette.text.disabled }}
                            fontSize="small"
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color="default"
                    className="mr-3"
                    onClick={() => {
                      toggleSearchModal(true);
                    }}
                    style={{ minWidth: 140, color: smoke }}
                  >
                    Product selection
                  </Button>
                </div>
              </div>
              <Divider />
              <div className="px-5 pt-4 pb-5">
                {!adminDealsLoading &&
                  orderItems.data?.map((item, index) => {
                    const product =
                      adminDealsByIds?.find(
                        (_deal) => _deal.id === item.product_id
                      ) ||
                      order.items?.find(
                        (_item) => _item.product_id === item.product_id
                      );
                    if (!product) {
                      return null;
                    }
                    let variationId = item.variation_id;

                    const variant = product.variations?.find(
                      (variation) => variation.id === variationId
                    );
                    const hasAnyModifierInProduct = product?.variations
                      ? product?.variations.find(
                          (variation) => variation?.modifier_sets?.length
                        )
                      : !!product.modifiers.length;
                    let modifiersPrice = 0;
                    item.modifiers?.forEach((modifier) => {
                      if (
                        item.modifiers?.find(
                          (_modifier) => _modifier.id === modifier?.id
                        )
                      ) {
                        modifiersPrice +=
                          modifier.discounted_price * modifier.amount;
                      }
                    });
                    const itemFinalPrice =
                      variant?.discounted_price + modifiersPrice;
                    const hasDiscount =
                      variant?.initial_price - variant?.discounted_price;

                    const isUnderThreshold =
                      variant?.inventory_count <= variant?.threshold;
                    const originalItem = adminOrder?.items.find(
                      (_item) =>
                        _item.variation_id === item.variation_id &&
                        ((!_item.modifiers.length && !item.modifiers?.length) ||
                          isMatch(
                            _item.modifiers,
                            item.modifiers.map((_m) => ({
                              amount: _m.amount,
                              modifier_id: _m.modifier_id,
                              modifier_set_id: _m.modifier_set_id,
                            }))
                          ))
                    );
                    const invoiceItem = adminOrderInvoice?.items?.find(
                      (_item) => {
                        return (
                          _item.variation_id === item.variation_id &&
                          ((!_item.modifiers.length &&
                            !item.modifiers?.length) ||
                            isMatch(
                              _item.modifiers,
                              item.modifiers.map((_m) => ({
                                amount: _m.amount,
                                modifier_id: _m.modifier_id,
                                modifier_set_id: _m.modifier_set_id,
                              }))
                            ))
                        );
                      }
                    );
                    const differenceAmount =
                      invoiceItem?.amount - (originalItem?.amount || 0);

                    const inventoryCount = variant?.inventory_count;
                    let itemAmountForTheSameDealIds = 0;
                    orderItems.data.forEach((orderItem) => {
                      if (orderItem.product_id === item.product_id) {
                        if (orderItem.variation_id === variant?.id) {
                          itemAmountForTheSameDealIds += orderItem.amount;
                        } else if (!variant) {
                          itemAmountForTheSameDealIds += orderItem.amount;
                        }
                      }
                    });
                    const canMakeItemAmountZero =
                      orderItems.data.length > 1 || item.amount > 1;
                    return (
                      <div
                        key={`${item.product_id}-${item.variation_id}-${index}`}
                        className={`d-flex justify-content-between align-items-start ${
                          index === 0 ? "" : "mt-5"
                        }`}
                      >
                        <div className="pl-3" style={{ cursor: "pointer" }}>
                          <div
                            style={{
                              width: 64,
                              height: 64,
                              borderRadius: 8,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={
                                variant?.main_image_thumbnail_url ||
                                variant?.main_image_url
                              }
                              alt=""
                              className="w-100 h-100"
                            />
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="d-flex justify-content-between align-items-start pb-3">
                            <div
                              className="pl-5"
                              style={{
                                flex: 3,
                                color: theme.palette.primary.main,
                              }}
                            >
                              <Link
                                href={
                                  `${urlPrefix}${pluginUrl}/settings/products/${product.id}` ||
                                  ""
                                }
                              >
                                {product.title || product.product_title || ""}
                              </Link>{" "}
                              <>
                                /{" "}
                                <Link
                                  href={
                                    `${urlPrefix}${pluginUrl}/settings/products/${product.id}/variations/${variant?.id}` ||
                                    ""
                                  }
                                >
                                  {variant?.title || ""}
                                </Link>
                              </>
                              {differenceAmount ? (
                                <span
                                  style={{
                                    color:
                                      differenceAmount < 0
                                        ? theme.palette.error.main
                                        : theme.palette.success.main,
                                  }}
                                >
                                  {" "}
                                  (
                                  {englishNumberToPersianNumber(
                                    Math.abs(differenceAmount)
                                  )}{" "}
                                  Item{" "}
                                  {differenceAmount < 0
                                    ? "Reduced"
                                    : "Added"}
                                  )
                                </span>
                              ) : null}
                            </div>
                            <div>
                              {hasDiscount ? (
                                <div
                                  className="d-flex"
                                  style={{ color: smoke }}
                                >
                                  <div className="u-text-line-through">
                                    {priceFormatter(variant?.initial_price)}
                                  </div>
                                  <div
                                    style={{
                                      color: theme.palette.primary.main,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {englishNumberToPersianNumber(
                                      calculateDiscountPercent(
                                        variant?.initial_price,
                                        variant?.discounted_price
                                      )
                                    )}
                                    <span className="mr-1">٪</span>
                                  </div>
                                </div>
                              ) : null}
                              <div style={{ flex: 2 }} className="text-left">
                                {priceFormatter(variant?.discounted_price)}
                                <Icon
                                  icon={$}
                                  width={21}
                                  height={21}
                                  color={graphite}
                                  className="mr-1"
                                />
                              </div>
                            </div>
                          </div>
                          {hasAnyModifierInProduct ? (
                            <div
                              style={{ color: theme.palette.primary.main }}
                              className="u-font-semi-small my-3 u-cursor-pointer"
                              onClick={() => {
                                selectProduct(product);
                                selectVariant(variant);
                                selectIndex(index);
                                toggleModifiersModal(true);
                              }}
                            >
                              {item.modifiers.length ? (
                                <div className="d-flex align-items-center">
                                  <div>Editing additives</div>
                                  <EditIcon
                                    style={{ fontSize: 16 }}
                                    className="mr-1"
                                  />
                                </div>
                              ) : (
                                <div className="d-flex align-items-center">
                                  <div>Creating additives</div>
                                  <AddRoundedIcon
                                    style={{ fontSize: 16 }}
                                    className="mr-1"
                                  />
                                </div>
                              )}
                            </div>
                          ) : null}
                          {item.modifiers?.map((modifier) => {
                            const originalModifier = adminOrder?.items
                              ?.find(
                                (_item, _index) =>
                                  _item.product_id === item.product_id &&
                                  _item.variation_id === item.variation_id &&
                                  _index === index
                              )
                              ?.modifiers?.find(
                                (_modifier) =>
                                  _modifier.modifier_set_id ===
                                    modifier.modifier_set_id &&
                                  _modifier.modifier_id === modifier.modifier_id
                              );
                            const invoiceModifier = adminOrderInvoice?.items
                              ?.find(
                                (_item, _index) =>
                                  _item.product_id === item.product_id &&
                                  _item.variation_id === item.variation_id &&
                                  _index === index
                              )
                              ?.modifiers?.find(
                                (_modifier) =>
                                  _modifier.modifier_set_id ===
                                    modifier.modifier_set_id &&
                                  _modifier.modifier_id === modifier.modifier_id
                              );

                            const differenceAmountForModifiers =
                              invoiceModifier?.amount -
                              (originalModifier?.amount || 0);

                            return (
                              <div
                                key={modifier.id}
                                className="d-flex justify-content-between align-items-center pb-3"
                              >
                                <div
                                  style={{
                                    flex: 3,
                                    color: smoke,
                                    fontSize: 12,
                                  }}
                                >
                                  <Link
                                    href={
                                      `${urlPrefix}${pluginUrl}/settings/products/${modifier.modifier_id}` ||
                                      ""
                                    }
                                  >
                                    {modifier.title ||
                                      modifier.modifier_title ||
                                      ""}
                                  </Link>{" "}
                                  {differenceAmountForModifiers ? (
                                    <span
                                      style={{
                                        color:
                                          differenceAmountForModifiers < 0
                                            ? theme.palette.error.main
                                            : theme.palette.success.main,
                                      }}
                                      className="u-fontSmall"
                                    >
                                      {" "}
                                      (
                                      {englishNumberToPersianNumber(
                                        Math.abs(differenceAmountForModifiers)
                                      )}{" "}
                                      Item{" "}
                                      {differenceAmountForModifiers < 0
                                        ? "Reduced"
                                        : "Added"}
                                      )
                                    </span>
                                  ) : null}
                                </div>
                                <div className="d-flex align-items-center">
                                  <div>
                                    {englishNumberToPersianNumber(
                                      modifier.amount
                                    )}
                                  </div>
                                  <div className="mx-2">X</div>
                                  <div
                                    style={{
                                      flex: 2,
                                      color: graphite,
                                      fontWeight: 400,
                                    }}
                                    className="text-left"
                                  >
                                    {priceFormatter(modifier.discounted_price)}
                                    <Icon
                                      icon={$}
                                      width={21}
                                      height={21}
                                      color={graphite}
                                      className="mr-1"
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="d-flex justify-content-between align-items-center">
                            <div
                              style={{
                                flex: 3,
                                color: night,
                                direction: "rtl",
                              }}
                            >
                              <div
                                className="d-flex align-items-center p-1"
                                style={{
                                  border: "1px solid #EDEDED",
                                  borderRadius: 8,
                                  maxWidth: "fit-content",
                                }}
                              >
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    increase(index, differenceAmount + 1);
                                  }}
                                  disabled={
                                    (!variant?.keep_selling &&
                                      inventoryCount <=
                                        itemAmountForTheSameDealIds) ||
                                    loading
                                  }
                                >
                                  <AddRoundedIcon fontSize="small" />
                                </IconButton>
                                <span className="mx-3">
                                  {englishNumberToPersianNumber(item.amount)}
                                </span>
                                <IconButton
                                  size="small"
                                  color="primary"
                                  disabled={!item.amount || loading}
                                  onClick={() => {
                                    if (canMakeItemAmountZero)
                                      decrease(index, differenceAmount - 1);
                                    else
                                      _setSnackBarMessage(
                                        "Before removing this product, first add another product to the order.",
                                        "fail"
                                      );
                                  }}
                                >
                                  {item.amount > 1 ? (
                                    <RemoveRoundedIcon fontSize="small" />
                                  ) : (
                                    <DeleteOutlineRoundedIcon
                                      fontSize="small"
                                      color="default"
                                    />
                                  )}
                                </IconButton>
                              </div>
                            </div>
                            <div style={{ flex: 2 }} className="text-left">
                              {priceFormatter(itemFinalPrice * item.amount)}
                              <Icon
                                icon={$}
                                width={21}
                                height={21}
                                color={graphite}
                                className="mr-1"
                              />
                            </div>
                          </div>
                          <div
                            className="d-flex justify-content-between align-items-center mt-3"
                            style={{
                              fontSize: 12,
                              color: isUnderThreshold ? strawberryI : graphite,
                            }}
                          >
                            <div>
                              Warehouse inventory:{" "}
                              <span>
                                {englishNumberToPersianNumber(inventoryCount)}
                              </span>
                            </div>
                          </div>
                          {differenceAmount < 0 ? (
                            <div className="u-text-ellipse">
                              <FormControlLabel
                                style={{ padding: 0, marginRight: -12 }}
                                className="mt-1"
                                control={
                                  <Checkbox
                                    checked={item.restock}
                                    onChange={() => toggleRestock(index)}
                                    name="compareToPrevious"
                                    color="primary"
                                  />
                                }
                                label="Restore items to warehouse"
                              />
                              {item.restock && (
                                <FormControl
                                  className="d-flex flex-1"
                                  margin="dense"
                                  variant="outlined"
                                  size="small"
                                  outline="none"
                                >
                                  <Select
                                    value={item.reason || 1}
                                    onChange={(value) =>
                                      setReason(index, value)
                                    }
                                    className="p-2"
                                    style={{
                                      border: "1px solid #E4E6E7",
                                      borderRadius: 4,
                                    }}
                                    input={
                                      <Input
                                        tableInput
                                        className="pl-2 pr-0 text-right"
                                      />
                                    }
                                  >
                                    {Object.entries(alterInventoryOptions).map(
                                      ([key, option]) => (
                                        <MenuItem key={key} value={key}>
                                          {option.text}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </FormControl>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Paper>
            <Paper color={theme.palette.text.tertiary} elevation={2}>
              <div
                className="pt-5 px-5 d-flex align-items-center justify-content-between"
                style={{ fontWeight: 500 }}
              >
                <div>Final Factor</div>
              </div>
              <div
                style={{ color: night }}
                className={minWidth768 ? "py-4 px-5" : "mt-3 py-4 px-5"}
              >
                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>shipping cost</div>
                  <div>
                    <Input
                      value={englishNumberToPersianNumber(deliveryPrice, "")}
                      size="small"
                      style={{ width: 150 }}
                      onChange={(value) => {
                        setDeliveryPrice(value);
                        const obj = {
                          order_items: orderItems?.data.filter(
                            (orderItem) => orderItem.amount
                          ),
                          business_id: selected_business?.id,
                          delivery_price: +value,
                          order_packaging_price:
                            +persianToEnglishNumber(totalPackagingPrice),
                          custom_discount_amount:
                            +persianToEnglishNumber(customDiscountAmount),
                          discount_amount_used:
                            +persianToEnglishNumber(discountAmountUsed),
                          coupon_discount_amount:
                            +persianToEnglishNumber(couponDiscountAmount),
                        };
                        if (isTaxingPriceEdited) {
                          obj.taxing_price =
                            +persianToEnglishNumber(taxingPrice);
                          obj.taxing_type = "C";
                        }
                        Object.keys(obj).forEach((key) => {
                          if (
                            obj[key] == null ||
                            typeof obj[key] === "undefined"
                          ) {
                            delete obj[key];
                          }
                        });
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                          _getAdminOrderInvoice(router.query.id, obj);
                        }, 500);
                      }}
                      InputProps={{
                        className: "small",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        className: "small",
                      }}
                      numberOnly
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>Packaging cost</div>
                  <div>
                    <Input
                      value={englishNumberToPersianNumber(
                        totalPackagingPrice,
                        ""
                      )}
                      size="small"
                      style={{ width: 150 }}
                      onChange={(value) => {
                        setTotalPackagingPrice(value);
                        const obj = {
                          order_items: orderItems?.data.filter(
                            (orderItem) => orderItem.amount
                          ),
                          business_id: selected_business?.id,
                          order_packaging_price: +value,
                          delivery_price:
                            +persianToEnglishNumber(deliveryPrice),
                          custom_discount_amount:
                            +persianToEnglishNumber(customDiscountAmount),
                          discount_amount_used:
                            +persianToEnglishNumber(discountAmountUsed),
                          coupon_discount_amount:
                            +persianToEnglishNumber(couponDiscountAmount),
                        };
                        if (isTaxingPriceEdited) {
                          obj.taxing_price =
                            +persianToEnglishNumber(taxingPrice);
                          obj.taxing_type = "C";
                        }
                        Object.keys(obj).forEach((key) => {
                          if (
                            obj[key] == null ||
                            typeof obj[key] === "undefined"
                          ) {
                            delete obj[key];
                          }
                        });
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                          _getAdminOrderInvoice(router.query.id, obj);
                        }, 500);
                      }}
                      InputProps={{
                        className: "small",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        className: "small",
                      }}
                      numberOnly
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>Discounts of desire</div>
                  <div>
                    <Input
                      value={englishNumberToPersianNumber(
                        customDiscountAmount,
                        ""
                      )}
                      size="small"
                      style={{ width: 150 }}
                      onChange={(value) => {
                        setCustomDiscountAmount(value);
                        const obj = {
                          order_items: orderItems?.data.filter(
                            (orderItem) => orderItem.amount
                          ),
                          business_id: selected_business?.id,
                          custom_discount_amount: +value,
                          delivery_price:
                            +persianToEnglishNumber(deliveryPrice),
                          order_packaging_price:
                            +persianToEnglishNumber(totalPackagingPrice),
                          discount_amount_used:
                            +persianToEnglishNumber(discountAmountUsed),
                          coupon_discount_amount:
                            +persianToEnglishNumber(couponDiscountAmount),
                        };
                        if (isTaxingPriceEdited) {
                          obj.taxing_price =
                            +persianToEnglishNumber(taxingPrice);
                          obj.taxing_type = "C";
                        }
                        Object.keys(obj).forEach((key) => {
                          if (
                            obj[key] == null ||
                            typeof obj[key] === "undefined"
                          ) {
                            delete obj[key];
                          }
                        });
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                          _getAdminOrderInvoice(router.query.id, obj);
                        }, 500);
                      }}
                      InputProps={{
                        className: "small",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        className: "small",
                      }}
                      numberOnly
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>Discount the discount code</div>
                  <div>
                    <Input
                      value={englishNumberToPersianNumber(
                        discountAmountUsed,
                        ""
                      )}
                      size="small"
                      style={{ width: 150 }}
                      onChange={(value) => {
                        setDiscountAmountUsed(value);
                        const obj = {
                          order_items: orderItems?.data.filter(
                            (orderItem) => orderItem.amount
                          ),
                          business_id: selected_business?.id,
                          discount_amount_used: +value,
                          delivery_price:
                            +persianToEnglishNumber(deliveryPrice),
                          order_packaging_price:
                            +persianToEnglishNumber(totalPackagingPrice),
                          custom_discount_amount:
                            +persianToEnglishNumber(customDiscountAmount),
                          coupon_discount_amount:
                            +persianToEnglishNumber(couponDiscountAmount),
                        };
                        if (isTaxingPriceEdited) {
                          obj.taxing_price =
                            +persianToEnglishNumber(taxingPrice);
                          obj.taxing_type = "C";
                        }
                        Object.keys(obj).forEach((key) => {
                          if (
                            obj[key] == null ||
                            typeof obj[key] === "undefined"
                          ) {
                            delete obj[key];
                          }
                        });
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                          _getAdminOrderInvoice(router.query.id, obj);
                        }, 500);
                      }}
                      InputProps={{
                        className: "small",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        className: "small",
                      }}
                      numberOnly
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>Coupon discount</div>
                  <div>
                    <Input
                      value={englishNumberToPersianNumber(
                        couponDiscountAmount,
                        ""
                      )}
                      size="small"
                      style={{ width: 150 }}
                      onChange={(value) => {
                        setCouponDiscountAmount(value);
                        const obj = {
                          order_items: orderItems?.data.filter(
                            (orderItem) => orderItem.amount
                          ),
                          business_id: selected_business?.id,
                          coupon_discount_amount: +value,
                          delivery_price:
                            +persianToEnglishNumber(deliveryPrice),
                          order_packaging_price:
                            +persianToEnglishNumber(totalPackagingPrice),
                          custom_discount_amount:
                            +persianToEnglishNumber(customDiscountAmount),
                          discount_amount_used:
                            +persianToEnglishNumber(discountAmountUsed),
                        };
                        if (isTaxingPriceEdited) {
                          obj.taxing_price =
                            +persianToEnglishNumber(taxingPrice);
                          obj.taxing_type = "C";
                        }
                        Object.keys(obj).forEach((key) => {
                          if (
                            obj[key] == null ||
                            typeof obj[key] === "undefined"
                          ) {
                            delete obj[key];
                          }
                        });
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                          _getAdminOrderInvoice(router.query.id, obj);
                        }, 500);
                      }}
                      InputProps={{
                        className: "small",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        className: "small",
                      }}
                      numberOnly
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>Tax amount</div>
                  <div>
                    <Input
                      value={englishNumberToPersianNumber(taxingPrice, "")}
                      size="small"
                      style={{ width: 150 }}
                      onChange={(value) => {
                        setTaxingPrice(value);
                        setIsTaxingPriceEdited(true);
                        const obj = {
                          order_items: orderItems?.data.filter(
                            (orderItem) => orderItem.amount
                          ),
                          business_id: selected_business?.id,
                          coupon_discount_amount:
                            +persianToEnglishNumber(couponDiscountAmount),
                          delivery_price:
                            +persianToEnglishNumber(deliveryPrice),
                          order_packaging_price:
                            +persianToEnglishNumber(totalPackagingPrice),
                          custom_discount_amount:
                            +persianToEnglishNumber(customDiscountAmount),
                          discount_amount_used:
                            +persianToEnglishNumber(discountAmountUsed),
                          taxing_price: +value,
                          taxing_type: "C",
                        };
                        Object.keys(obj).forEach((key) => {
                          if (
                            obj[key] == null ||
                            typeof obj[key] === "undefined"
                          ) {
                            delete obj[key];
                          }
                        });
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                          _getAdminOrderInvoice(router.query.id, obj);
                        }, 500);
                      }}
                      InputProps={{
                        className: "small",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        className: "small",
                      }}
                      numberOnly
                    />
                  </div>
                </div>
                {shoppingPluginData?.taxing_percent && !isTaxingPriceEdited ? (
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <div>Tax</div>
                    <div style={{ flex: 2 }} className="text-left">
                      ٪
                      {englishNumberToPersianNumber(
                        shoppingPluginData?.taxing_percent
                      )}
                    </div>
                  </div>
                ) : null}
                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>Total price</div>
                  <div style={{ flex: 2 }} className="text-left">
                    {priceFormatter(order?.total_price)}
                    <Icon
                      icon={$}
                      width={21}
                      height={21}
                      color={graphite}
                      className="mr-1"
                    />
                  </div>
                </div>
              </div>
              <hr
                style={{
                  border: "none",
                  borderBottom: "1px solid #EDEDED",
                }}
              />
              <div>
                <div className="d-flex justify-content-between align-items-center pb-4 pt-4 px-5">
                  <div className="d-flex">The amount of the customer's payment</div>
                  <div style={{ flex: 2 }} className="text-left">
                    {priceFormatter(order?.paid_price)}
                    <Icon
                      icon={$}
                      width={21}
                      height={21}
                      color={graphite}
                      className="mr-1"
                    />
                  </div>
                </div>
                {Boolean(order?.should_pay) ? (
                  <div
                    className="pb-5 px-5"
                    style={{
                      fontSize: 13,
                      color: theme.palette.error.main,
                    }}
                  >
                    {order.order_status !== NEW_ORDER_STATUS_VOID &&
                    order.order_status !== NEW_ORDER_STATUS_COMP
                      ? Math.sign(order?.should_pay) === 1
                        ? `Customer to you${priceFormatter(
                            order?.should_pay
                          )} $ owes.`
                        : `You${priceFormatter(
                            order?.should_pay * -1
                          )} $ owed to the customer.`
                      : null}
                  </div>
                ) : null}
              </div>
            </Paper>
          </div>
          <div
            className={`${
              minWidth768 ? "pr-2 pl-0 col-5" : "px-0 col-12"
            } pt-4`}
          >
            {order?.order_status === NEW_ORDER_STATUS_CART && (
              <Paper
                color={theme.palette.text.tertiary}
                elevation={2}
                className="mb-3"
              >
                <div className="d-flex flex-column px-5 py-4">
                  <div style={{ fontWeight: 500, fontSize: 16 }}>Customer</div>
                  <div>
                    <div className="mt-3">
                      <Input
                        placeholder="Customer Name"
                        value={userName}
                        onChange={(value) => setUserName(value)}
                        size="medium"
                        className="w-100"
                      />
                    </div>
                    <div className="mt-3">
                      <Input
                        placeholder="customer number"
                        value={phone}
                        onChange={(value) => setPhone(value)}
                        size="medium"
                        className="w-100"
                        numberOnly
                      />
                    </div>
                  </div>
                </div>
              </Paper>
            )}
            <Paper color={theme.palette.text.tertiary} elevation={2}>
              <div className="d-flex align-items-center justify-content-between px-5 pt-5 pb-4">
                <div style={{ fontWeight: 500 }}>Factor abstract</div>
              </div>
              {adminOrder?.total_price === adminOrderInvoice?.total_price ? (
                <div
                  className="px-5 pb-4"
                  style={{ color: pollution, fontSize: 13 }}
                >
                  No change has been made..
                </div>
              ) : (
                <div>
                  <div
                    style={{ color: night }}
                    className={minWidth768 ? "py-4 px-5" : "mt-3 py-4 px-5"}
                  >
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div>The new total</div>
                      <div
                        style={{ flex: 2 }}
                        className="text-left d-flex align-items-center justify-content-end"
                      >
                        {loading || adminDealsLoading ? (
                          <ThreeDotsBounceLoading
                            color={graphite}
                            size={8}
                            className="ml-1"
                            nameOfComponent="newFinalPriceThreeDots"
                          />
                        ) : (
                          priceFormatter(order?.total_price)
                        )}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div>Customer Payment Price</div>
                      <div style={{ flex: 2 }} className="text-left">
                        {priceFormatter(order?.paid_price)}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      border: "none",
                      borderBottom: "1px solid #EDEDED",
                    }}
                  />
                  <div>
                    {order?.total_price === order?.paid_price && (
                      <div className="d-flex justify-content-between align-items-center pb-5 pt-4 px-5">
                        <div className="d-flex">
                          No need to pay or receive money from the customer.{" "}
                        </div>
                      </div>
                    )}
                    {order?.total_price > order?.paid_price && (
                      <div className="d-flex justify-content-between align-items-center pb-5 pt-4 px-5">
                        <div className="d-flex">
                          The amount required to receive from the customer
                        </div>
                        <div
                          style={{ flex: 2 }}
                          className="text-left d-flex align-items-center justify-content-end"
                        >
                          {loading ? (
                            <ThreeDotsBounceLoading
                              color={graphite}
                              nameOfComponent="getFromCustomerThreeDots"
                              size={8}
                              className="ml-1"
                            />
                          ) : (
                            priceFormatter(
                              order?.total_price - order?.paid_price
                            )
                          )}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    )}
                    {order?.total_price < order?.paid_price && (
                      <div className="d-flex justify-content-between align-items-center pb-5 pt-4 px-5">
                        <div className="d-flex">
                          The amount required to pay to the customer
                        </div>
                        <div
                          style={{ flex: 2 }}
                          className="text-left d-flex align-items-center justify-content-end"
                        >
                          {loading ? (
                            <ThreeDotsBounceLoading
                              color={graphite}
                              nameOfComponent="giveToCustomerThreeDots"
                              size={8}
                            />
                          ) : (
                            priceFormatter(
                              order?.paid_price - order?.total_price
                            )
                          )}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <Divider />
              <div
                className="px-5 pb-5 pt-4"
                style={{ color: pollution, fontSize: 13 }}
              >
                <Button
                  variant="contained"
                  className="w-100"
                  color="primary"
                  disableElevation={loading}
                  onClick={() => {
                    const callback = () => {
                      router.push(
                        `${urlPrefix}${pluginUrl}/orders/${router.query.id}?is_edited=true`
                      );
                    };
                    const _newOrderItems = orderItems.data.map((item) => {
                      return {
                        product_id: item.product_id,
                        variation_id: item.variation_id,
                        amount: item.amount,
                        modifiers: item.modifiers,
                      };
                    });
                    const obj = {
                      id: order.id,
                      order_items: _newOrderItems.filter(
                        (orderItem) => orderItem.amount
                      ),
                      delivery_price: deliveryPrice
                        ? +persianToEnglishNumber(deliveryPrice)
                        : undefined,
                      order_packaging_price: totalPackagingPrice
                        ? +persianToEnglishNumber(totalPackagingPrice)
                        : undefined,
                      custom_discount_amount: customDiscountAmount
                        ? +persianToEnglishNumber(customDiscountAmount)
                        : undefined,
                      discount_amount_used: discountAmountUsed
                        ? +persianToEnglishNumber(discountAmountUsed)
                        : undefined,
                      coupon_discount_amount: couponDiscountAmount
                        ? +persianToEnglishNumber(couponDiscountAmount)
                        : undefined,
                      user_name: userName?.length ? userName : undefined,
                      user_phone: phone?.length ? phone : undefined,
                    };
                    if (isTaxingPriceEdited) {
                      obj.taxing_price = +persianToEnglishNumber(taxingPrice);
                      obj.taxing_type = "C";
                    }
                    Object.keys(obj).forEach((key) => {
                      if (obj[key] == null || typeof obj[key] === "undefined") {
                        delete obj[key];
                      }
                    });
                    if (
                      order?.order_status === NEW_ORDER_STATUS_CART &&
                      (!obj.user_name || !obj.user_phone)
                    ) {
                      _setSnackBarMessage(
                        "Name and phone number fields should be completed.",
                        "fail"
                      );
                    } else {
                      _editOrder(obj, callback);
                    }
                  }}
                >
                  {loading || adminDealsLoading ? (
                    <ThreeDotsBounceLoading
                      color="white"
                      nameOfComponent="buttonThreeDots"
                      size={8}
                    />
                  ) : order?.order_status === NEW_ORDER_STATUS_CART ? (
                    "Order"
                  ) : (
                    "Updating order"
                  )}
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  adminOrder: makeSelectShoppingAdminOrder(),
  loading: makeSelectLoading(),
  adminDealsLoading: makeSelectLoading(DEALS_BY_ID),
  urlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  pluginsData: makeSelectPlugins(),
  adminDeals: makeSelectAdminProducts(),
  adminDealsByIds: makeSelectDealsByIds(),
  adminOrderInvoice: makeSelectShoppingAdminOrderInvoice(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminOrder: (id) => dispatch(getShoppingAdminOrder(id)),
    _getAdminProducts: (data) => dispatch(getAdminProducts(data)),
    _getAdminProductsByIds: (slug, ids) =>
      dispatch(getAdminProductsByIds(slug, ids, false)),
    _editOrder: (data, callback) =>
      dispatch(editShoppingAdminOrder(data, callback)),
    _getAdminOrderInvoice: (id, data) =>
      dispatch(getShoppingAdminOrderInvoice(id, data)),
    _emptyAdminOrderInvoice: (data) =>
      dispatch(setShoppingAdminOrderInvoice(data)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminEditOrder);
