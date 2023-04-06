/* eslint-disable camelcase */
/*
 *
 * ShoppingPage actions
 *
 */

import {
  ADD_ORDER_ITEM_TO_CART,
  DECREMENT_ORDER_ITEM_BY_ORDER_ID,
  EMPTY_CART,
  ORDER_SUBMITTED,
  SUBMIT_ORDER_END_USER,
  GET_ORDER,
  SET_ORDER,
  GET_USER_ORDERS,
  SET_USER_ORDERS,
  SET_DISCOUNT_ERROR,
  DECREMENT_ORDER_ITEM,
  INCREMENT_ORDER_ITEM_BY_ORDER_ID,
  SET_DELIVERY_INTERVAL,
  PATCH_ORDER,
  UPDATE_ORDER,
  SET_CATEGORY_DEALS,
  GET_CATEGORY_DEALS,
  GET_RECOMMENDED_DEALS,
  SET_RECOMMENDED_DEALS,
  GET_BUSINESS_TOP_SELLING_DEALS,
  SET_BUSINESS_TOP_SELLING_DEALS,
  UPDATE_ORDER_ITEM,
  UPDATE_MULTI_ORDERS_ITEMS,
  DELETE_ORDER_ITEM,
  GET_SHOPPING_ORDER_INVOICE,
  SUBMIT_ORDER_ADMIN,
  GET_DELIVERY_INFO_BY_USER_ADDRESS,
  SET_DELIVERY_INFO_BY_USER_ADDRESS,
} from "./constants";


// Cart
export function incrementOrderItemByOrderId(order_id, modifiers = []) {
  return {
    type: INCREMENT_ORDER_ITEM_BY_ORDER_ID,
    data: { order_id, modifiers },
  };
}
export function addOrderItemToCart(
  product,
  modifiers = [],
  variation_id,
  count = 1
) {
  return {
    type: ADD_ORDER_ITEM_TO_CART,
    data: { product, modifiers, variation_id, count },
  };
}
export function decrementOrderItemByOrderId(order_id) {
  return {
    type: DECREMENT_ORDER_ITEM_BY_ORDER_ID,
    data: { order_id },
  };
}
export function decrementOrderItem(product_id) {
  return {
    type: DECREMENT_ORDER_ITEM,
    data: { product_id },
  };
}
export function updateOrderItem(id, data) {
  return {
    type: UPDATE_ORDER_ITEM,
    data: { id, data },
  };
}

export function deleteOrderItem(id, data) {
  return {
    type: DELETE_ORDER_ITEM,
    data: { id, data },
  };
}

export function updateMultipleOrdersItems(data) {
  return {
    type: UPDATE_MULTI_ORDERS_ITEMS,
    data: { data },
  };
}

export function emptyCart() {
  return {
    type: EMPTY_CART,
    data: {},
  };
}

export function updateOrder(orders) {
  return {
    type: UPDATE_ORDER,
    data: orders,
  };
}

// Discount
export function setDiscountError(data) {
  return {
    type: SET_DISCOUNT_ERROR,
    data,
  };
}
// Order
export function getShoppingOrderInvoice(id , data, callback) {
  return {
    type: GET_SHOPPING_ORDER_INVOICE,
    id,
    data,
    callback,
  };
}
// Order
export function submitOrderEndUser(data, callback) {
  return {
    type: SUBMIT_ORDER_END_USER,
    data,
    callback,
  };
}
export function submitOrderAdmin(data, callback) {
  return {
    type: SUBMIT_ORDER_ADMIN,
    data,
    callback,
  };
}
export function patchOrder(id, data, callback) {
  return {
    type: PATCH_ORDER,
    id,
    data,
    callback,
  };
}
export function orderSubmitted(orderInfo) {
  return {
    type: ORDER_SUBMITTED,
    data: orderInfo,
  };
}
export function getOrder(data) {
  return {
    type: GET_ORDER,
    data
  };
}
export function setOrder(data) {
  return {
    type: SET_ORDER,
    data,
  };
}
export function getUserOrders(page, pageSize, isSuper) {
  return {
    type: GET_USER_ORDERS,
    data: { page, pageSize, isSuper },
  };
}
export function setUserOrders(data, count) {
  return {
    type: SET_USER_ORDERS,
    data,
    count
  };
}


export function setDeliveryInterval(data) {
  return {
    type: SET_DELIVERY_INTERVAL,
    data,
  };
}


export function getCategoryDeals(data) {
  return {
    type: GET_CATEGORY_DEALS,
    data,
  };
}

export function setCategoryDeals(data) {
  return {
    type: SET_CATEGORY_DEALS,
    data,
  };
}

export function getRecommendedDeals(data) {
  return {
    type: GET_RECOMMENDED_DEALS,
    data,
  };
}

export function setRecommendedDeals(data) {
  return {
    type: SET_RECOMMENDED_DEALS,
    data,
  };
}

export function getBusinessTopSellingDeals(from, to, count) {
  return {
    type: GET_BUSINESS_TOP_SELLING_DEALS,
    data: { from, to, count },
  };
}

export function setBusinessTopSellingDeals(data) {
  return {
    type: SET_BUSINESS_TOP_SELLING_DEALS,
    data: { data },
  };
}

export function getDeliveryInfoByUserAddress(lat, lng) {
  return {
    type: GET_DELIVERY_INFO_BY_USER_ADDRESS,
    data: { lat, lng },
  };
}

export function setDeliveryInfoByUserAddress(data) {
  return {
    type: SET_DELIVERY_INFO_BY_USER_ADDRESS,
    data,
  };
}
