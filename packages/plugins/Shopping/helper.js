import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { isObjectsEqual } from "@saas/utils/helpers/isObjectsEqual";

export function incrementOrderItemByOrderId(data, orders) {
  const { order_id } = data;
  const _orders = orders && orders.length ? [...orders] : [];
  const sameItemInOrdersIndex = _orders.findIndex(
    (order) => order.id === order_id
  );
  if (sameItemInOrdersIndex > -1) {
    _orders[sameItemInOrdersIndex].count += 1;
  }
  return _orders;
}
export function addOrderItemToCart(data, orders) {
  const { product, modifiers, variation_id: _variation_id, count } = data;
  const variation_id = _variation_id
    ? _variation_id
    : product.default_variation.id;
  const _orders = orders && orders.length ? [...orders] : [];
  const sameItemInOrdersIndex = _orders.findIndex((order) => {
    return (
      order.product?.id === product?.id &&
      isObjectsEqual(order.modifiers, modifiers) &&
      (order.variation_id === variation_id ||
        (!order.variation_id && !variation_id))
    );
  });

  if (sameItemInOrdersIndex > -1) {
    _orders[sameItemInOrdersIndex].count += count || 1;
  } else {
    const item = {
      count: count || 1,
      id: uniqueid(),
      product,
      modifiers,
      variation_id,
    };
    _orders.push(item);
  }
  return _orders;
}
export function decrementOrderItemByOrderId(order_id, orders) {
  const _orders = orders && orders.length ? [...orders] : [];
  const sameItemInOrdersIndex = _orders.findIndex(
    (item) => item.id === order_id
  );
  if (sameItemInOrdersIndex > -1) {
    _orders[sameItemInOrdersIndex].count -= 1;
    if (_orders[sameItemInOrdersIndex].count === 0) {
      _orders.splice(sameItemInOrdersIndex, 1);
    }
  }
  return _orders;
}
export function decrementOrderItem(product_id, orders) {
  const _orders = orders && orders.length ? [...orders] : [];
  const sameItemInOrdersIndex = _orders.findIndex(
    (item) => item?.product?.id === product_id
  );
  if (sameItemInOrdersIndex > -1) {
    _orders[sameItemInOrdersIndex].count -= 1;
    if (_orders[sameItemInOrdersIndex].count === 0) {
      _orders.splice(sameItemInOrdersIndex, 1);
    }
  }
  return _orders;
}

export function updateOrderItem(orders, id, data) {
  const _orders = orders && orders.length ? [...orders] : [];
  const orderItemIndex = _orders.findIndex((item) => item.id === id);
  if (orderItemIndex > -1) {
    _orders[orderItemIndex] = { ..._orders[orderItemIndex], ...data };
    if (_orders[orderItemIndex].count === 0) {
      _orders.splice(orderItemIndex, 1);
    }
  }
  return _orders;
}

export function updateOrdersItems(orders, newOrdersItems) {
  const _orders = orders && orders.length ? [...orders] : [];
  Object.values(newOrdersItems).map((newOrderItem) => {
    const orderItemIndex = _orders.findIndex(
      (item) => item.id === newOrderItem.id
    );
    if (orderItemIndex > -1) {
      _orders[orderItemIndex] = { ..._orders[orderItemIndex], ...newOrderItem };
      if (_orders[orderItemIndex].count === 0) {
        _orders.splice(orderItemIndex, 1);
      }
    } else {
      if (newOrderItem.count > 0) {
        const item = {
          count: newOrderItem.count,
          id: uniqueid(),
          product: newOrderItem.product,
          modifiers: newOrderItem.modifiers,
          variation_id: newOrderItem.variation_id,
        };
        _orders.push(item);
      }
    }
  });
  return _orders;
}

export function deleteOrderFromOrders(orders, orderId) {
  const _orders = orders && orders.length ? [...orders] : [];
  const orderItemIndex = _orders.findIndex((item) => item.id === orderId);
  if (orderItemIndex > -1) {
    _orders.splice(orderItemIndex, 1);
  }
  return _orders;
}
