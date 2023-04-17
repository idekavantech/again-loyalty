/* eslint-disable no-underscore-dangle */
// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import {
  ADD_ORDER_ITEM_TO_CART,
  DECREMENT_ORDER_ITEM,
  DECREMENT_ORDER_ITEM_BY_ORDER_ID,
  DELETE_ORDER_ITEM,
  EMPTY_CART,
  GET_BUSINESS_TOP_SELLING_DEALS,
  GET_CATEGORY_DEALS,
  GET_DELIVERY_INFO_BY_USER_ADDRESS,
  GET_ORDER,
  GET_RECOMMENDED_DEALS,
  GET_SHOPPING_ORDER_INVOICE,
  GET_USER_ORDERS,
  INCREMENT_ORDER_ITEM_BY_ORDER_ID,
  ORDER_SUBMITTER_STORAGE,
  PATCH_ORDER,
  SET_DELIVERY_INTERVAL,
  SHOPPING_ORDER_INVOICE_DTO,
  SUBMIT_ORDER_ADMIN,
  SUBMIT_ORDER_END_USER,
  UPDATE_MULTI_ORDERS_ITEMS,
  UPDATE_ORDER_ITEM,
} from "./constants";
import { startLoading, stopLoading } from "@saas/stores/global/actions";
import {
  BUSINESS_ORDER_ITEMS_INVOICE_API,
  BUSINESS_TOP_SELLING_DEALS_API,
  CATEGORY_RESOURCE_API,
  DELIVERY_PRICE_API,
  ORDER_DELIVERY_INTERVAL_API,
  ORDERS_ADMIN_API,
  ORDERS_END_USER_API,
  RECOMMENDED_DEALS_API,
  USER_ORDERS_API,
  USER_ORDERS_ITEMS_API,
} from "@saas/utils/api";
import request from "@saas/utils/request";
import {
  orderSubmitted,
  setBusinessTopSellingDeals,
  setCategoryDeals,
  setDeliveryInfoByUserAddress,
  setDiscountError,
  setOrder,
  setRecommendedDeals,
  setUserOrders,
} from "./actions";
import {
  HEADER_ICONS_WIDGET,
  SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
} from "@saas/stores/plugins/constants";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  makeSelectBusiness,
  makeSelectBusinessSiteDomain,
  makeSelectBusinessSlug,
} from "@saas/stores/business/selector";
import {
  makeSelectNewOrders,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import Router from "next/router";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import {
  setPluginWidgetItemAmounts,
  updateOrdersBySiteDomain,
} from "@saas/stores/plugins/actions";
import {
  BUSINESS_TOP_SELLING_DEALS,
  CATEGORY_DEALS,
  DELIVERY_INFO_LOADING,
  RECOMMENDED_DEALS,
} from "@saas/stores/global/constants";
import {
  addOrderItemToCart,
  decrementOrderItem,
  decrementOrderItemByOrderId,
  deleteOrderFromOrders,
  incrementOrderItemByOrderId,
  updateOrderItem,
  updateOrdersItems,
} from "./helper";
import { setAuthorization } from "@saas/stores/user/actions";
import {
  AUTHORIZED,
  NOT_AUTHORIZED,
  NOT_LOGGED_IN,
} from "@saas/stores/user/constants";

// cart
export function* incrementOrderItemByOrderIdSaga(action) {
  const business = yield select(makeSelectBusiness());

  const newOrder = yield select(makeSelectNewOrders());
  let newOrderItems = newOrder[business.site_domain];
  newOrderItems = incrementOrderItemByOrderId(action.data, newOrderItems);
  const newOrderDic = { ...newOrder, [business.site_domain]: newOrderItems };

  yield put(updateOrdersBySiteDomain(newOrderDic));
  localStorage.setItem(
    SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
    JSON.stringify(newOrderDic)
  );
  const updatedItemsAmount = newOrderDic[business.site_domain].reduce(
    (sum, orderItem) => sum + orderItem.count,
    0
  );
  yield put(
    setPluginWidgetItemAmounts(
      SHOPPING_PLUGIN,
      HEADER_ICONS_WIDGET,
      updatedItemsAmount,
      business
    )
  );
}

export function* addOrderItemToCartSaga(action) {
  const business = yield select(makeSelectBusiness());

  const newOrder = yield select(makeSelectNewOrders());
  let newOrderItems = newOrder[business.site_domain];
  newOrderItems = addOrderItemToCart(action.data, newOrderItems);
  const newOrderDic = { ...newOrder, [business.site_domain]: newOrderItems };
  yield put(updateOrdersBySiteDomain(newOrderDic));
  localStorage.setItem(
    SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
    JSON.stringify(newOrderDic)
  );
  const updatedItemsAmount = newOrderDic[business.site_domain].reduce(
    (sum, orderItem) => sum + orderItem.count,
    0
  );
  yield put(
    setPluginWidgetItemAmounts(
      SHOPPING_PLUGIN,
      HEADER_ICONS_WIDGET,
      updatedItemsAmount,
      business
    )
  );
}

export function* decrementOrderItemByOrderIdSaga(action) {
  const business = yield select(makeSelectBusiness());

  const newOrder = yield select(makeSelectNewOrders());
  let newOrderItems = newOrder[business.site_domain];
  newOrderItems = decrementOrderItemByOrderId(
    action.data.order_id,
    newOrderItems
  );
  const newOrderDic = { ...newOrder, [business.site_domain]: newOrderItems };
  yield put(updateOrdersBySiteDomain(newOrderDic));
  localStorage.setItem(
    SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
    JSON.stringify(newOrderDic)
  );
  const updatedItemsAmount = newOrderDic[business.site_domain].reduce(
    (sum, orderItem) => sum + orderItem.count,
    0
  );
  yield put(
    setPluginWidgetItemAmounts(
      SHOPPING_PLUGIN,
      HEADER_ICONS_WIDGET,
      updatedItemsAmount,
      business
    )
  );
}

export function* decrementOrderItemSaga(action) {
  const business = yield select(makeSelectBusiness());

  const newOrder = yield select(makeSelectNewOrders());
  let newOrderItems = newOrder[business.site_domain];
  newOrderItems = decrementOrderItem(action.data.product_id, newOrderItems);
  const newOrderDic = { ...newOrder, [business.site_domain]: newOrderItems };
  yield put(updateOrdersBySiteDomain(newOrderDic));
  localStorage.setItem(
    SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
    JSON.stringify(newOrderDic)
  );
  const updatedItemsAmount = newOrderDic[business.site_domain].reduce(
    (sum, orderItem) => sum + orderItem.count,
    0
  );
  yield put(
    setPluginWidgetItemAmounts(
      SHOPPING_PLUGIN,
      HEADER_ICONS_WIDGET,
      updatedItemsAmount,
      business
    )
  );
}
export function* updateOrderItemSaga(action) {
  try {
    const business = yield select(makeSelectBusiness());

    const newOrder = yield select(makeSelectNewOrders());
    let newOrderItems = newOrder[business.site_domain];
    newOrderItems = updateOrderItem(
      newOrderItems,
      action.data.id,
      action.data.data
    );
    const newOrderDic = { ...newOrder, [business.site_domain]: newOrderItems };
    yield put(updateOrdersBySiteDomain(newOrderDic));
    localStorage.setItem(
      SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
      JSON.stringify(newOrderDic)
    );
    const updatedItemsAmount = newOrderDic[business.site_domain].reduce(
      (sum, orderItem) => sum + orderItem.count,
      0
    );
    yield put(
      setPluginWidgetItemAmounts(
        SHOPPING_PLUGIN,
        HEADER_ICONS_WIDGET,
        updatedItemsAmount,
        business
      )
    );
  } catch (error) {
    console.log(error);
  }
}

export function* updateMultipleOrdersItemsSaga(action) {
  try {
    const business = yield select(makeSelectBusiness());
    const ordersItemsObject = action.data.data;

    const newOrder = yield select(makeSelectNewOrders());
    let newOrderItems = newOrder[business.site_domain];
    newOrderItems = updateOrdersItems(newOrderItems, ordersItemsObject);
    const newOrderDic = { ...newOrder, [business.site_domain]: newOrderItems };
    yield put(updateOrdersBySiteDomain(newOrderDic));
    localStorage.setItem(
      SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
      JSON.stringify(newOrderDic)
    );
    const updatedItemsAmount = newOrderDic[business.site_domain].reduce(
      (sum, orderItem) => sum + orderItem.count,
      0
    );
    yield put(
      setPluginWidgetItemAmounts(
        SHOPPING_PLUGIN,
        HEADER_ICONS_WIDGET,
        updatedItemsAmount,
        business
      )
    );
  } catch (error) {
    console.log(error);
  }
}

export function* deleteOrderItemSaga(action) {
  try {
    const business = yield select(makeSelectBusiness());
    const newOrder = yield select(makeSelectNewOrders());
    let newOrderItems = newOrder[business.site_domain];
    newOrderItems = deleteOrderFromOrders(newOrderItems, action.data.id);
    const newOrderDic = { ...newOrder, [business.site_domain]: newOrderItems };
    yield put(updateOrdersBySiteDomain(newOrderDic));
    localStorage.setItem(
      SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
      JSON.stringify(newOrderDic)
    );
    const updatedItemsAmount = newOrderDic[business.site_domain].reduce(
      (sum, orderItem) => sum + orderItem.count,
      0
    );
    yield put(
      setPluginWidgetItemAmounts(
        SHOPPING_PLUGIN,
        HEADER_ICONS_WIDGET,
        updatedItemsAmount,
        business
      )
    );
  } catch (error) {
    console.log(error);
  }
}

export function* emptyCartSaga() {
  const business = yield select(makeSelectBusiness());
  const newOrder = yield select(makeSelectNewOrders());
  delete newOrder[business.site_domain];
  localStorage.setItem(
    SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
    JSON.stringify(newOrder)
  );
  localStorage.removeItem(ORDER_SUBMITTER_STORAGE);
  localStorage.removeItem("order_id");
  yield put(updateOrdersBySiteDomain({ ...newOrder }));
  const updatedItemsAmount = 0;
  yield put(
    setPluginWidgetItemAmounts(
      SHOPPING_PLUGIN,
      HEADER_ICONS_WIDGET,
      updatedItemsAmount,
      business
    )
  );
}

// Order
export function* getShoppingOrderInvoiceSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      BUSINESS_ORDER_ITEMS_INVOICE_API(action.id, SHOPPING_PLUGIN),
      action.data,
      "POST"
    );
    if (data) {
      localStorage.setItem(ORDER_SUBMITTER_STORAGE, JSON.stringify(data));
      yield put(orderSubmitted(data));
      if (typeof action.callback === "function") {
        yield call(action.callback, data.id);
      }
    }
    if (action.data.discount_code) {
      if (meta && meta.status_code >= 200 && meta.status_code <= 300) {
        yield put(orderSubmitted(data));
        yield put(setDiscountError("The discount code was successfully applied."));
      }
      if (meta && meta.status_code === 404) {
        yield put(setDiscountError("The code entered is incorrect.."));
        const dto = sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
          ? JSON.parse(sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO))
          : {};
        delete dto.discount_code;
        sessionStorage.setItem(SHOPPING_ORDER_INVOICE_DTO, JSON.stringify(dto));
      }
      if (meta && meta.status_code === 400) {
        if (meta.detail?.global_error_messages)
          yield put(setDiscountError(meta.detail?.global_error_messages[0]));
        else if (meta.detail?.discount_code)
          yield put(setDiscountError(meta.detail?.discount_code[0]));
      }
    } else if (meta?.detail?.global_error_messages?.[0]) {
      yield put(
        setSnackBarMessage(meta.detail.global_error_messages[0], "fail")
      );
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
export function* removeGiftRequest(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;
    if (!id) return;
    const {
      response: { data, meta },
    } = yield call(
      request,
      REMOVE_ORDER_GIFT_API(id, SHOPPING_PLUGIN),
      {},
      "PATCH"
    );
    if (meta && meta.status_code >= 200 && meta.status_code <= 300)
      yield put(orderSubmitted(data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
// Order
export function* submitOrderEndUserSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      ORDERS_END_USER_API(SHOPPING_PLUGIN),
      action.data,
      "POST"
    );
    if (data) {
      localStorage.setItem(ORDER_SUBMITTER_STORAGE, JSON.stringify(data));
      yield put(orderSubmitted(data));
      if (typeof action.callback === "function") {
        yield call(action.callback, data.id);
      }
    }
    if (meta?.detail?.global_error_messages?.[0])
      yield put(
        setSnackBarMessage(meta.detail.global_error_messages[0], "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
export function* submitOrderAdminSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      ORDERS_ADMIN_API(SHOPPING_PLUGIN),
      action.data,
      "POST"
    );
    if (data) {
      if (typeof action.callback === "function") {
        yield call(action.callback, data.id);
      }
    }
    if (meta?.detail?.global_error_messages?.[0])
      yield put(
        setSnackBarMessage(meta.detail.global_error_messages[0], "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* patchOrderSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
      status,
    } = yield call(
      request,
      USER_ORDERS_ITEMS_API(action.id, SHOPPING_PLUGIN),
      action.data,
      "PATCH"
    );

    if (status >= 400)
      yield put(setSnackBarMessage("An error has occurred!", "fail"));
    if (data) {
      const prevData = JSON.parse(
        localStorage.getItem(ORDER_SUBMITTER_STORAGE)
      );
      const newData = { ...data, delivery_options: prevData.delivery_options };
      yield put(orderSubmitted(newData));
      localStorage.setItem(ORDER_SUBMITTER_STORAGE, JSON.stringify(newData));
      if (typeof action.callback === "function") {
        action.callback(data);
      }
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
export function* getOrderForBehtarinoTraffic(action) {
  try {
    yield put(setAuthorization(""));
    const business = yield select(makeSelectBusiness());
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      USER_ORDERS_ITEMS_API(action.data.id, SHOPPING_PLUGIN),
      {},
      "GET"
    );
    if (meta && meta.status_code === 200) {
      const { items } = data;
      const orders = items.map((item) => {
        return {
          count: item.amount,
          id: item.id,
          variation_id: item.variation_id,
          modifiers: item.modifiers.map((m) => ({
            ...m,
            title: m.modifier_title,
          })),
          product: {
            id: item.product_id,
            description: item.description,
            title: item.product_title,
            sku: item.product_sku,
            labels: item.labels.map((i) => i.label_id),
            variations: [
              {
                id: item.variation_id,
                main_image_thumbnail_url: item.main_image_thumbnail_url,
                discounted_price: item.discounted_price,
                initial_price: item.initial_price,
              },
            ],
          },
        };
      });
      const otherOrdersData = JSON.parse(
        localStorage.getItem(SHOPPING_CART_STORAGE_BY_SITE_DOMAIN)
      );
      let finalOrderData = {
        ...otherOrdersData,
        [business.site_domain]: orders,
      };
      localStorage.setItem(
        SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
        JSON.stringify(finalOrderData)
      );
      yield put(setAuthorization(AUTHORIZED));
      yield put(updateOrdersBySiteDomain(finalOrderData));
      yield put(setOrder(data));
    }
    if (meta && meta.status_code === 403) {
      yield put(setAuthorization(NOT_AUTHORIZED));
    }
    if (meta && meta.status_code === 401) {
      const urlPrefix = yield select(makeSelectUrlPrefix());
      Router.push(`${urlPrefix}/login`);
      yield put(setAuthorization(NOT_LOGGED_IN));
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* getOrder(action) {
  try {
    yield put(setAuthorization(""));
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      USER_ORDERS_ITEMS_API(action.data.id, SHOPPING_PLUGIN),
      {},
      "GET"
    );
    if (meta && meta.status_code === 200) {
      yield put(setAuthorization(AUTHORIZED));
      yield put(setOrder(data));
    }
    if (meta && meta.status_code === 403) {
      yield put(setAuthorization(NOT_AUTHORIZED));
    }
    if (meta && meta.status_code === 401) {
      const urlPrefix = yield select(makeSelectUrlPrefix());
      Router.push(`${urlPrefix}/login`);
      yield put(setAuthorization(NOT_LOGGED_IN));
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* getUserOrders(action) {
  try {
    yield put(startLoading());
    const _domain = yield select(makeSelectBusinessSiteDomain());
    const domain = action.data.site_domain || _domain;
    const {
      response: {
        data,
        pagination: { count },
      },
    } = yield call(
      request,
      USER_ORDERS_API(SHOPPING_PLUGIN, action.data.page, action.data.pageSize),
      { domain },
      "GET"
    );
    if (data) yield put(setUserOrders(data, count));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* setDeliveryInterval(action) {
  try {
    yield put(startLoading());
    const { id, interval = {} } = action.data;
    if (!id) return;
    const {
      response: { data, meta },
    } = yield call(
      request,
      ORDER_DELIVERY_INTERVAL_API(id, SHOPPING_PLUGIN),
      { ...interval },
      "PATCH"
    );
    if (meta && meta.status_code >= 200 && meta.status_code <= 300)
      yield put(orderSubmitted(data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getCategoryDealsSaga() {
  const slug = yield select(makeSelectBusinessSlug());

  try {
    yield put(startLoading(CATEGORY_DEALS));
    const {
      response: { data },
    } = yield call(request, CATEGORY_RESOURCE_API(slug), {}, "GET");
    if (data) {
      yield put(setCategoryDeals(data));
      yield put(stopLoading(CATEGORY_DEALS));
    }
  } catch (err) {
    yield put(stopLoading(CATEGORY_DEALS));
  }
}

export function* getRecommendedDealsSaga(action) {
  const crmMembershipId = action.data;

  try {
    yield put(startLoading(RECOMMENDED_DEALS));
    const {
      response: { data },
    } = yield call(request, RECOMMENDED_DEALS_API(crmMembershipId), {}, "GET");

    if (data) {
      yield put(setRecommendedDeals(data));
      yield put(stopLoading(RECOMMENDED_DEALS));
    }
  } catch (err) {
    yield put(stopLoading(RECOMMENDED_DEALS));
  }
}

export function* getBusinessTopSellingDealsSaga(action) {
  const { from, to, count } = action.data;
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading(BUSINESS_TOP_SELLING_DEALS));
    const {
      response: { data },
    } = yield call(
      request,
      BUSINESS_TOP_SELLING_DEALS_API(from, to, slug, count),
      {},
      "GET"
    );

    if (data) {
      yield put(setBusinessTopSellingDeals(data));
      yield put(stopLoading(BUSINESS_TOP_SELLING_DEALS));
    }
  } catch (err) {
    yield put(stopLoading(BUSINESS_TOP_SELLING_DEALS));
  }
}

export function* getDeliveryInfoByUserAddressSaga(action) {
  const { lat, lng } = action.data;
  try {
    yield put(startLoading(DELIVERY_INFO_LOADING));
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, DELIVERY_PRICE_API(slug, lat, lng), {}, "GET");
    if (data) {
      yield put(setDeliveryInfoByUserAddress(data));
      yield put(stopLoading(DELIVERY_INFO_LOADING));
    }
  } catch (error) {
    yield put(stopLoading(DELIVERY_INFO_LOADING));
    console.log(error);
  }
}

const sagas = [
  takeLatest(GET_SHOPPING_ORDER_INVOICE, getShoppingOrderInvoiceSaga),
  takeLatest(SUBMIT_ORDER_END_USER, submitOrderEndUserSaga),
  takeLatest(SUBMIT_ORDER_ADMIN, submitOrderAdminSaga),
  takeLatest(PATCH_ORDER, patchOrderSaga),
  takeLatest(GET_ORDER, getOrder),
  takeLatest(GET_USER_ORDERS, getUserOrders),
  takeLatest(SET_DELIVERY_INTERVAL, setDeliveryInterval),
  takeLatest(INCREMENT_ORDER_ITEM_BY_ORDER_ID, incrementOrderItemByOrderIdSaga),
  takeLatest(ADD_ORDER_ITEM_TO_CART, addOrderItemToCartSaga),
  takeLatest(DECREMENT_ORDER_ITEM_BY_ORDER_ID, decrementOrderItemByOrderIdSaga),
  takeLatest(DECREMENT_ORDER_ITEM, decrementOrderItemSaga),
  takeLatest(UPDATE_ORDER_ITEM, updateOrderItemSaga),
  takeLatest(UPDATE_MULTI_ORDERS_ITEMS, updateMultipleOrdersItemsSaga),
  takeLatest(DELETE_ORDER_ITEM, deleteOrderItemSaga),
  takeLatest(EMPTY_CART, emptyCartSaga),
  takeLatest(GET_CATEGORY_DEALS, getCategoryDealsSaga),
  takeLatest(GET_RECOMMENDED_DEALS, getRecommendedDealsSaga),
  takeLatest(GET_BUSINESS_TOP_SELLING_DEALS, getBusinessTopSellingDealsSaga),
  takeEvery(
    GET_DELIVERY_INFO_BY_USER_ADDRESS,
    getDeliveryInfoByUserAddressSaga
  ),
];
export default sagas;
