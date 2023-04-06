/* eslint-disable indent */
/* eslint-disable camelcase */
import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { makeSelectBusinessThemeColor } from "@saas/stores/business/selector";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";
import {
  decrementOrderItemByOrderId,
  incrementOrderItemByOrderId,
} from "../../../actions";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { pollution } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const AddedProductRow = ({
  order = {},
  increaseOrderItem,
  decreaseOrderItem,
  resetTimeout,
  orders,
}) => {
  const theme = useTheme();
  const modifiers_price =
    order && order.modifiers
      ? order.modifiers.reduce(
          (a, modifier) => a + +modifier.price * (modifier.amount || 1),
          0
        )
      : 0;
  const hasVariation = order.product.variations.length > 1;
  const variation_name =
    hasVariation &&
    order?.product?.variations?.find(
      (variant) => variant.id === order.variation_id
    )?.title;
  const variation_initial_price =
    hasVariation &&
    order?.product?.variations?.find(
      (variant) => variant.id === order.variation_id
    )?.initial_price;
  const variation_discounted_price =
    hasVariation &&
    order?.product?.variations?.find(
      (variant) => variant.id === order.variation_id
    )?.discounted_price;
  const variation_keep_selling =
    hasVariation &&
    order?.product?.variations?.find(
      (variant) => variant.id === order.variation_id
    )?.keep_selling;
  const variation_available =
    hasVariation &&
    order?.product?.variations?.find(
      (variant) => variant.id === order.variation_id
    )?.available;
  const [selectedOrderInventory, setSelectedOrderInventory] = useState(null);
  const [selectedOrderVariationInventory, setSelectedOrderVariationInventory] =
    useState(null);
  useEffect(() => {
    if (hasVariation) {
      setSelectedOrderVariationInventory(
        order?.product?.variations?.find(
          (variant) => variant.id === order.variation_id
        )?.inventory_count
      );
    } else if (!hasVariation) {
      const newArray = [];
      orders?.forEach((order) => {
        if (order?.product?.id === order?.product?.id) {
          newArray.push(order.count);
        }
      });
      setSelectedOrderInventory(newArray?.reduce(reducer, 0));
    } else {
      setSelectedOrderInventory(null);
    }
  }, [order && order.count, orders]);
  if (!order?.product && orders?.length) return null;
  return (
    <div className="my-2">
      <div className="flex-1 pl-2">
        <div>{order.product.title}</div>

        {hasVariation ? (
          <div
            style={{ color: theme.palette.text.disabled }}
            className="d-flex mt-1 u-font-semi-small justify-content-between align-items-center w-100"
          >
            {" "}
            نوع گوناگونی: {variation_name}
          </div>
        ) : null}
        {order?.modifiers?.map((item) => (
          <div
            key={item.id}
            style={{ color: theme.palette.text.disabled }}
            className="d-flex mt-1 u-font-semi-small justify-content-between align-items-center w-100"
          >
            {englishNumberToPersianNumber(item.amount || 1)} x {item.title}
          </div>
        ))}
      </div>
      <div
        className={`d-flex mt-2 flex-row justify-content-between position-relative ${
          order?.modifiers && Object.keys(order?.modifiers).length
            ? "align-items-start"
            : "align-items-center"
        }`}
      >
        <div>
          {hasVariation ? (
            <div
              className={
                variation_initial_price - variation_discounted_price
                  ? "u-font-semi-small u-text-darkest-grey u-text-line-through"
                  : "u-font-semi-small u-text-darkest-grey"
              }
            >
              {priceFormatter(
                (variation_initial_price + modifiers_price) * order.count
              )}
              {!(variation_initial_price - variation_discounted_price) ? (
                <span className=""> تومان </span>
              ) : null}
            </div>
          ) : (
            <div
              className={
                order.product.initial_price - order.product.discounted_price
                  ? "u-font-semi-small u-text-darkest-grey u-text-line-through"
                  : "u-font-semi-small u-text-darkest-grey"
              }
            >
              {priceFormatter(
                (order.product.initial_price + modifiers_price) * order.count
              )}
              {!(
                order.product.initial_price - order.product.discounted_price
              ) ? (
                <span className=""> تومان </span>
              ) : null}
            </div>
          )}
          {hasVariation ? (
            <div>
              {variation_initial_price - variation_discounted_price ? (
                <div className="u-textBlack u-font-semi-small d-flex ">
                  <span>
                    {priceFormatter(
                      (variation_discounted_price + modifiers_price) *
                        order.count
                    )}
                  </span>
                  <span className="mx-1"> تومان </span>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              {order.product.initial_price - order.product.discounted_price ? (
                <div className="u-textBlack u-font-semi-small d-flex ">
                  <span>
                    {priceFormatter(
                      (order.product.discounted_price + modifiers_price) *
                        order.count
                    )}
                  </span>
                  <span className="mx-1"> تومان </span>
                </div>
              ) : null}
            </div>
          )}
        </div>
        <div className="d-flex align-items-center">
          <div
            style={{ width: 100, height: 36 }}
            className="d-flex justify-content-between align-items-center"
          >
            <Button
              variant="contained"
              color="secondary"
              className="p-0"
              style={{
                minWidth: 30,
                minHeight: 30,
              }}
              onClick={(e) => {
                resetTimeout();
                e.stopPropagation();
                increaseOrderItem(order.id);
              }}
              disabled={
                (!hasVariation &&
                  (!order?.product?.available ||
                    (!order?.product?.default_variation.keep_selling &&
                      order?.product?.default_variation.inventory_count <=
                        selectedOrderInventory))) ||
                (hasVariation &&
                  (!variation_available ||
                    (!variation_keep_selling &&
                      selectedOrderVariationInventory <= order.count)))
              }
            >
              <AddRoundedIcon fontSize="small" />
            </Button>
            <div>{englishNumberToPersianNumber(order.count)}</div>
            <Button
              onKeyDown={() => {}}
              variant="outlined"
              className="p-0"
              style={{
                minWidth: 30,
                minHeight: 30,
                color: pollution,
              }}
              color="secondary"
              onClick={(e) => {
                resetTimeout();
                e.stopPropagation();
                decreaseOrderItem(order.id);
              }}
            >
              {order.count > 1 ? (
                <RemoveRoundedIcon fontSize="small" color="secondary" />
              ) : (
                <DeleteIcon fontSize="small" color="secondary" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  orders: makeSelectOrdersBySiteDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    increaseOrderItem: (order_id) =>
      dispatch(incrementOrderItemByOrderId(order_id)),
    decreaseOrderItem: (product) =>
      dispatch(decrementOrderItemByOrderId(product)),
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(AddedProductRow);
