/**
 *
 * Category
 *
 */
/* eslint-disable no-nested-ternary */

import React, { memo, useEffect, useMemo, useRef, useState } from "react";

import CategoriesNavigation from "../../../../containers/CategoriesNavigation";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import {
  makeSelectOrdersBySiteDomain,
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  makeSelectCategoriesDeals,
  makeSelectRecommendedDeals,
} from "../../../../selectors";

import CategoriesProductsList from "../../../../containers/CategoriesProductsList";
import {
  addOrderItemToCart,
  decrementOrderItem,
  decrementOrderItemByOrderId,
  deleteOrderItem,
  getCategoryDeals,
  getRecommendedDeals,
  incrementOrderItemByOrderId,
  updateMultipleOrdersItems,
  updateOrderItem,
} from "../../../../actions";
import { makeSelectUser } from "@saas/stores/user/selector";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import AddedProductRow from "../../../../containers/modals/ProductModal/AddedProductRow";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useRouter } from "next/router";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { isCurrentTimeAvailable } from "@saas/utils/helpers/isCurrentTimeAvailable";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import LazyHydrate from "react-lazy-hydration";
import {
  makeSelectBusiness,
  makeSelectBusinessSlug,
  makeSelectBusinessWorkingHours,
} from "@saas/stores/business/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

let timeoutId = null;
function FlatShoppingProductList2({
  pluginData,
  orders,
  urlPrefix,
  _addOrderItemToCart,
  _decrementOrderItem,
  _getCategoriesDeals,
  _getRecommendedDeals,
  _updateOrderItemByOrderId,
  _updateMultipleOrdersItems,
  categoriesDeals,
  recommendedDeals,
  user,
  customization,
  _incrementOrderItemByOrderId,
  _decrementOrderItemByOrderId,
  _deleteOrderItem,
  isEditMode,
  shoppingPluginData,
  workingHours,
  business,
  businessSlug,
}) {
  const isDisabled =
    shoppingPluginData?.data?.is_open === false ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);
  const router = useRouter();
  const orderCount = orders?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0
  );
  const reducerFunc = (accumulator, currentValue) =>
    accumulator + currentValue.count;
  const { maxWidth768 } = useResponsive();
  const [anchorEl, setAnchorEl] = useState();
  const [open, setOpen] = useState(false);
  const timeout = useRef(null);

  const { category: { has_category_image = false } = {} } = customization;
  useEffect(() => {
    setTimeout(() => {
      _getCategoriesDeals();
      user?.crm_membership_id && _getRecommendedDeals(user?.crm_membership_id);
    }, 0);
  }, [businessSlug, user?.crm_membership_id]);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, toggleLoading] = useState(false);

  const categoriesItem = useMemo(() => {
    return categoriesDeals
      ?.filter(
        (category) =>
          category.products.length &&
          (isEditMode ||
            !category.extra_data ||
            !category.extra_data.shifts ||
            isCurrentTimeAvailable(category.extra_data.shifts))
      )
      .map((category) => ({
        id: category.id,
        title: category.title,
        image: category.extra_data.icon_image_url,
      }));
  }, [categoriesDeals, recommendedDeals]);

  useEffect(() => {
    clearTimeout(timeoutId);
    toggleLoading(true);
    timeoutId = setTimeout(() => {
      const _categories = categoriesDeals
        ?.filter(
          (category) =>
            category.products.filter(
              (product) =>
                product?.title?.search(searchValue) > -1 ||
                product?.description?.search(searchValue) > -1
            ).length
        )
        .map((category) => ({
          ...category,
          products: category.products.filter(
            (deal) =>
              deal.title?.search(searchValue) > -1 ||
              deal.description?.search(searchValue) > -1
          ),
        }))
        .filter(
          (category) =>
            isEditMode ||
            !category?.extra_data ||
            !category?.extra_data?.shifts ||
            isCurrentTimeAvailable(category?.extra_data?.shifts)
        );
      toggleLoading(false);
      setCategories(_categories);
    }, 500);
  }, [categoriesDeals, searchValue]);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const allItemsPrice = useMemo(
    () =>
      orders
        ?.map((order) => {
          const hasVariation = order?.variation_id;
          const initial_price =
            hasVariation && order?.product?.variations
              ? order?.product?.variations?.variations_table?.[
                  order.variation_id
                ]?.initial_price
              : order?.product?.initial_price;
          return (
            order?.count *
            (initial_price +
              (order?.modifiers
                ? order?.modifiers?.reduce(
                    (pre, modifier) => pre + modifier?.price,
                    0
                  )
                : 0))
          );
        })
        .reduce(reducer, 0),
    [orders]
  );
  const allItemsDiscounts = useMemo(
    () =>
      orders
        ?.map((order) => {
          const hasVariation = order.variation_id;
          const initial_price =
            hasVariation && order?.product?.variations
              ? order?.product?.variations?.variations_table?.[
                  order?.variation_id
                ]?.initial_price
              : order?.product?.initial_price;
          const discounted_price =
            hasVariation && order?.product?.variations
              ? order?.product?.variations?.variations_table?.[
                  order?.variation_id
                ]?.discounted_price
              : order?.product?.discounted_price;
          return order?.count * (initial_price - discounted_price);
        })
        .reduce(reducer, 0),
    [orders]
  );

  const finalPrice = useMemo(
    () => allItemsPrice - allItemsDiscounts,
    [orders, allItemsPrice, allItemsDiscounts]
  );
  const { minWidth768 } = useResponsive();
  useEffect(() => {
    setAnchorEl(
      minWidth768 ? document.getElementById("shopping-cart") : document.body
    );
  }, [minWidth768]);

  const prevOrders = useRef(orderCount);
  useEffect(() => {
    if (orderCount > prevOrders.current) {
      setOpen(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
    prevOrders.current = orderCount;
  }, [orderCount]);
  return (
    <Grid
      id="shopping-products-list"
      className="container-fluid"
      style={{ backgroundColor: "#F6F6F7" }}
    >
      <CategoriesNavigation
        hasCategoriesImage={has_category_image}
        categories={categoriesItem}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        urlPrefix={urlPrefix}
      />
      <CategoriesProductsList
        orders={orders}
        categoriesProducts={categories}
        addOrderItemToCart={_addOrderItemToCart}
        decrementOrderItem={_decrementOrderItem}
        incrementOrderItemByOrderId={_incrementOrderItemByOrderId}
        decrementOrderItemByOrderId={_decrementOrderItemByOrderId}
        updateOrderItemByOrderId={_updateOrderItemByOrderId}
        updateMultipleOrdersItems={_updateMultipleOrdersItems}
        deleteOrderItem={_deleteOrderItem}
        finalPrice={finalPrice}
        isLoading={isLoading}
        couldShop={!isDisabled}
        urlPrefix={urlPrefix}
      />
      {!maxWidth768 ? (
        <Popover
          open={open}
          anchorEl={anchorEl}
          PaperProps={{
            elevation: 3,
            style: { width: minWidth768 ? 360 : "100%", marginTop: 10 },
          }}
          onClose={() => setOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: minWidth768 ? "left" : "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: minWidth768 ? "left" : "center",
          }}
        >
          <div className="p-2">
            <div className="d-flex mb-2 align-items-center u-fontWeightBold">
              آیتم افزوده شده سبد خرید
              <ShoppingCartIcon fontSize="small" className="mr-1" />
            </div>
            {orders &&
              orders.map((order) => (
                <AddedProductRow
                  resetTimeout={() => {
                    clearTimeout(timeout.current);
                    timeout.current = setTimeout(() => {
                      setOpen(false);
                    }, 5000);
                  }}
                  key={`op-${order.id}`}
                  order={order}
                  orders={orders}
                />
              ))}
            <div className="d-flex mt-3">
              <Button
                color="secondary"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                بستن
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="flex-1"
                onClick={() => {
                  setOpen(false);
                  router.push(`${urlPrefix}/checkout/cart`);
                }}
              >
                دیدن سبد خرید
              </Button>
            </div>
          </div>
        </Popover>
      ) : null}
      {!isEditMode && (
        <LazyHydrate whenVisible style={{ display: "block" }}>
          <div
            style={{
              padding: 20,
              zIndex: 1300,
              transition: "all .5s ease-in-out .5s",
            }}
            className={`py-3 fixed-order-ct d-flex flex-column ${
              orders?.length > 0 &&
              router.asPath !== `${pluginData.baseUrl.url}/search` &&
              !router.asPath.includes("/orders")
                ? "slide-up"
                : "slide-down"
            }`}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                router.push(`${urlPrefix}/checkout/cart`);
              }}
              id="finalizeOrderButton"
              style={{ fontSize: 16, fontWeight: 500 }}
            >
              تکمیل خرید
              <span className="mr-1">
                ({englishNumberToPersianNumber(orders?.reduce(reducerFunc, 0))})
              </span>
            </Button>
          </div>
        </LazyHydrate>
      )}
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  urlPrefix: makeSelectUrlPrefix(),
  orders: makeSelectOrdersBySiteDomain(),
  categoriesDeals: makeSelectCategoriesDeals(),
  recommendedDeals: makeSelectRecommendedDeals(),
  user: makeSelectUser(),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  workingHours: makeSelectBusinessWorkingHours(),
  business: makeSelectBusiness(),
  businessSlug: makeSelectBusinessSlug(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCategoriesDeals: () => dispatch(getCategoryDeals()),
    _getRecommendedDeals: (crm_membership_id) =>
      dispatch(getRecommendedDeals(crm_membership_id)),
    _addOrderItemToCart: (product, modifires, variation_id, count = 1) =>
      dispatch(addOrderItemToCart(product, modifires, variation_id, count)),
    _decrementOrderItem: (product_id) =>
      dispatch(decrementOrderItem(product_id)),
    _incrementOrderItemByOrderId: (product, modifires, variation_id) =>
      dispatch(incrementOrderItemByOrderId(product, modifires, variation_id)),
    _decrementOrderItemByOrderId: (product_id) =>
      dispatch(decrementOrderItemByOrderId(product_id)),
    _updateOrderItemByOrderId: (orderId, orderItemData) =>
      dispatch(updateOrderItem(orderId, orderItemData)),
    _updateMultipleOrdersItems: (ordersItems) =>
      dispatch(updateMultipleOrdersItems(ordersItems)),
    _deleteOrderItem: (orderId, orderItemData) =>
      dispatch(deleteOrderItem(orderId, orderItemData)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(FlatShoppingProductList2);
