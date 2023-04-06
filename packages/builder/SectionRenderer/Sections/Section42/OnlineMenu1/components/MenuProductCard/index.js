/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/**
 *
 * ProductPage
 *
 */

import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  makeSelectHierarchy,
  makeSelectBusinessWorkingHours,
  makeSelectBusiness,
} from "@saas/stores/business/selector";

import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";
import ProductSection from "@saas/plugins/Shopping/containers/modals/ProductModal/ProductSection2";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import {
  addOrderItemToCart,
  decrementOrderItem,
  decrementOrderItemByOrderId,
  deleteOrderItem,
  incrementOrderItemByOrderId,
  updateMultipleOrdersItems,
  updateOrderItem,
} from "@saas/plugins/Shopping/actions";
export function MenuProductCard({
  product,
  orders,
  pluginData,
  _addOrderItemToCart,
  _decrementOrderItem,
  _incrementOrderItemByOrderId,
  _decrementOrderItemByOrderId,
  _updateOrderItemByOrderId,
  _updateMultipleOrdersItems,
  _deleteOrderItem,
  customizedOrderItems,
  orderItem,
  workingHours,
  backgroundColor,
  textsColor,
  useThemeColor,
  customThemeColor,
  business,
  couldShop,
}) {
  const [selectedVariant, selectVariant] = useState(null);
  const isDisabled =
    pluginData.data.is_open === false ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);
  const image =
    (selectedVariant && selectedVariant.image_url) || product.main_image_url;

  if (!product) {
    return <LoadingIndicator />;
  }

  const isMobile = true;

  return (
    <div className={isMobile ? "col-12 px-0 my-2" : "col-lg-6 px-lg-2 my-2"}>
      <div
        className="p-2 d-flex flex-wrap"
        style={{
          background: backgroundColor,
          borderRadius: 5,
        }}
      >
        <div className="px-0" style={{ height: 136, width: 120 }}>
          <img
            alt=""
            className="w-100 h-100"
            style={{
              borderRadius: 5,
              objectFit: "cover",
            }}
            src={image}
          />
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .texts-color{
            color: ${textsColor} !important;
          }
          #menu-card .MuiSelect-icon{
            color: ${textsColor}
          }
          #menu-card .MuiOutlinedInput-notchedOutline {
            border-color: ${textsColor};
          }
          #menu-card .MuiInputBase-root{
            color: ${textsColor}
          }
        `,
          }}
        ></style>
        <div className="texts-color mr-3" style={{ flex: 1 }} id="menu-card">
          <ProductSection
            addOrderItemToCart={_addOrderItemToCart}
            decrementOrderItem={_decrementOrderItem}
            incrementOrderItemByOrderId={_incrementOrderItemByOrderId}
            decrementOrderItemByOrderId={_decrementOrderItemByOrderId}
            updateOrderItemByOrderId={_updateOrderItemByOrderId}
            updateMultipleOrdersItems={_updateMultipleOrdersItems}
            deleteOrderItem={_deleteOrderItem}
            isDisabled={isDisabled}
            product={product}
            orders={orders}
            selectVariant={selectVariant}
            lessPadding
            noStickyButton
            secondary
            showPrices
            customThemeColor={customThemeColor}
            useThemeColor={useThemeColor}
            customizedOrderItems={customizedOrderItems}
            orderItem={orderItem}
            couldShop={couldShop}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  hierarchy: makeSelectHierarchy(),
  loading: makeSelectLoading(),
  orders: makeSelectOrdersBySiteDomain(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  workingHours: makeSelectBusinessWorkingHours(),
  business: makeSelectBusiness(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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

export default compose(withConnect, memo)(MenuProductCard);
