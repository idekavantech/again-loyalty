import React, { memo, useEffect, useMemo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectBusiness,
  makeSelectBusinessWorkingHours,
} from "@saas/stores/business/selector";

import useTheme from "@material-ui/core/styles/useTheme";

import OnlineMenuHeader from "./components/OnlineMenuHeader";
import Logo from "./components/Logo";
import {
  addOrderItemToCart,
  decrementOrderItem,
  decrementOrderItemByOrderId,
  deleteOrderItem,
  getCategoryDeals,
  incrementOrderItemByOrderId,
  updateMultipleOrdersItems,
  updateOrderItem,
} from "@saas/plugins/Shopping/actions";
import { makeSelectCategoriesDeals } from "@saas/plugins/Shopping/selectors";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";

import CategoriesNavigation from "./CategoriesNavigation";
import { CATEGORY_DEALS } from "@saas/stores/global/constants";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import DealsPresentation from "./DealsPresentation";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { makeSelectUser } from "@saas/stores/user/selector";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { isCurrentTimeAvailable } from "@saas/utils/helpers/isCurrentTimeAvailable";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { TABLE_NUMBER_SESSION_STORAGE } from "@saas/plugins/Shopping/constants";

const OnlineMenu2 = ({
  business,
  isEditMode,
  _getCategoriesDeals,
  categoriesDeals,
  isCategoiesDealsLoading,
  _addOrderItemToCart,
  _decrementOrderItem,
  _incrementOrderItemByOrderId,
  _decrementOrderItemByOrderId,
  _updateOrderItemByOrderId,
  _updateMultipleOrdersItems,
  _deleteOrderItem,
  urlPrefix,
  orders,
  customization,
  shoppingPluginData,
  workingHours,
}) => {
  const router = useRouter();
  const isMobileMatch = true;
  const routerQueryTableNumber = router?.query?.table_number;
  useEffect(() => {
    if (routerQueryTableNumber) {
      sessionStorage.setItem(
        TABLE_NUMBER_SESSION_STORAGE,
        routerQueryTableNumber
      );
    }
  }, [routerQueryTableNumber]);
  const isDisabled =
    shoppingPluginData?.data?.is_open === false ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  const [selectedCategory, setSelectedCategory] = useState();
  const [heightStickyHeader, setHeightStickyHeader] = useState(0);
  const {
    colors: { body_background_color, use_theme_color, card_theme_color } = {},
  } = customization;

  useEffect(() => {
    const stickyHeaderElement = document.getElementById("stickyHeader");
    if (stickyHeaderElement) {
      const { height } = stickyHeaderElement.getBoundingClientRect();
      setHeightStickyHeader(parseInt(height));
    }

    setTimeout(() => {
      _getCategoriesDeals();
    }, 0);
  }, []);

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const allItemsCount = orders
    ?.map((order) => order?.count)
    ?.reduce(reducer, 0);

  const _categoriesDeals = useMemo(() => {
    return categoriesDeals?.filter(
      (category) =>
        category.products.length &&
        (isEditMode ||
          !category.extra_data ||
          !category.extra_data.shifts ||
          isCurrentTimeAvailable(category.extra_data.shifts))
    );
  }, [categoriesDeals, isEditMode]);

  const categoriesNameAndId = useMemo(
    () =>
      _categoriesDeals.map((category) => ({
        title: category.title,
        id: category.id,
      })),
    [_categoriesDeals]
  );

  useEffect(() => {
    if (isCategoiesDealsLoading === false) {
      setSelectedCategory(_categoriesDeals[0]?.id);
    }
  }, [isCategoiesDealsLoading, categoriesDeals, _categoriesDeals]);

  return (
    <div
      className="position-relative h-100 d-flex flex-1 align-items-center justify-content-start flex-column w-100"
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{
          maxWidth: 410,
          background: "white",
          border: `5px solid ${card_theme_color}`,
        }}
        className="d-flex flex-1 flex-column justify-content-between w-100 h-100 position-relative"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .swiper-container {
            width: 96%;
          }
      `,
          }}
        ></style>
        <section
          className="online-menu pt-3 pb-4 d-flex flex-column justify-content-center align-items-between"
          style={{
            minHeight: "100vh",
            backgroundColor: body_background_color || "#F6F6F7",
            paddingRight: isMobileMatch ? 16 : 32,
            paddingLeft: isMobileMatch ? 16 : 32,
          }}
        >
          <div
            id="stickyHeader"
            className="w-100 pt-3"
            style={{
              position: isEditMode ? "static" : "sticky",
              top: "0",
              left: "0",
              maxWidth: 410,
              backgroundColor: body_background_color || "#F6F6F7",
              zIndex: "20",
            }}
          >
            <OnlineMenuHeader
              urlPrefix={urlPrefix}
              orderAmount={allItemsCount}
              isMobile={isMobileMatch}
              customization={customization}
            />
            <div
              className="position-relative"
              style={{
                border: `2px solid ${
                  use_theme_color ? themeColor : card_theme_color
                }`,
                borderBottom: "none",
                borderRadius: "16px 16px 0 0",
                paddingRight: isMobileMatch ? 0 : 48,
                paddingLeft: isMobileMatch ? 0 : 48,
              }}
            >
              <Logo
                logo={business?.icon_image_url}
                body_background_color={body_background_color}
                isMobile={isMobileMatch}
              />
              <div className="w-100 ">
                <div
                  className="online-menu__navigation-wrapper w-100 "
                  style={{
                    position: "sticky",
                  }}
                >
                  <CategoriesNavigation
                    isEditMode={isEditMode}
                    themeColor={themeColor}
                    categories={categoriesNameAndId}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    isMobile={isMobileMatch}
                    customization={customization}
                    heightStickyHeader={heightStickyHeader}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            id={"online-menu-cards"}
            className="flex-1 online-menu__content position-relative d-flex align-items-center justify-content-start flex-column"
            style={{
              border: `2px solid ${
                use_theme_color ? themeColor : card_theme_color
              }`,
              borderTop: "none",
              paddingRight: isMobileMatch ? 5 : 48,
              paddingLeft: isMobileMatch ? 5 : 48,
              marginBottom: isMobileMatch ? null : "auto",
              paddingBottom: 4,
            }}
          >
            <div className="w-100">
              <DealsPresentation
                isEditMode={isEditMode}
                isLoading={isCategoiesDealsLoading}
                categories={_categoriesDeals}
                themeColor={themeColor}
                isMobile={isMobileMatch}
                orders={orders}
                addOrderItemToCart={_addOrderItemToCart}
                decrementOrderItem={_decrementOrderItem}
                incrementOrderItemByOrderId={_incrementOrderItemByOrderId}
                decrementOrderItemByOrderId={_decrementOrderItemByOrderId}
                updateOrderItemByOrderId={_updateOrderItemByOrderId}
                updateMultipleOrdersItems={_updateMultipleOrdersItems}
                deleteOrderItem={_deleteOrderItem}
                couldShop={!isDisabled}
                urlPrefix={urlPrefix}
                categoryId={selectedCategory?.id}
                selectedCategory={selectedCategory}
                customization={customization}
              />
            </div>
            {orders?.length &&
            categoriesDeals?.length &&
            !isCategoiesDealsLoading ? (
              <div
                className="w-100 p-3"
                style={{ position: "fixed", bottom: 0, left: 0 }}
              >
                <Button
                  color="secondary"
                  variant="contained"
                  className="w-100"
                  id="finalizeOrderButton"
                  style={{ fontSize: 16, fontWeight: 500 }}
                  onClick={() => {
                    router.push(`${urlPrefix}/checkout/cart`);
                  }}
                >
                  Complete the purchase
                </Button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  categoriesDeals: makeSelectCategoriesDeals(),
  isCategoiesDealsLoading: makeSelectLoading(CATEGORY_DEALS),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  urlPrefix: makeSelectUrlPrefix(),
  orders: makeSelectOrdersBySiteDomain(),
  user: makeSelectUser(),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  workingHours: makeSelectBusinessWorkingHours(),
});
const mapDispatchToProps = (dispatch) => {
  return {
    _getCategoriesDeals: () => dispatch(getCategoryDeals()),
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
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(OnlineMenu2);
