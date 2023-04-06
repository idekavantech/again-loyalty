import {
  SET_PLUGINS,
  SET_PLUGIN_WIDGET_ITEMS_AMOUNT,
  SET_PLUGIN_DATA,
  UPDATE_PLUGIN_DATA,
  SET_PRODUCT_GROUP_DISCOUNT,
  SET_SHELVES,
  SET_PLUGIN_ADMIN_ORDERS_WIDGET_DATA,
  SET_PLUGIN_PAYMENT_DATA,
  UPDATE_PLUGIN_PAYMENT_DATA,
  SET_VISIT_CARD_STATS,
  UPDATE_VISIT_CARD_STATS,
  GET_PLUGIN_ORDER,
  GET_PLUGIN_ORDERS,
  SET_PLUGIN_ORDER,
  SET_PLUGIN_ORDERS,
  GET_CUSTOMERS_COUNT,
  SET_CUSTOMERS_COUNT,
  GET_PLUGINS_INTERNAL_LINKS,
  SET_PLUGINS_INTERNAL_LINKS,
  GET_DELIVERY_TYPES,
  SET_DELIVERY_TYPES,
  UPDATE_DELIVERY_TYPE,
  GET_DELIVERY_RULES,
  SET_DELIVERY_RULES,
  GET_DELIVERY_TYPE,
  SET_DELIVERY_TYPE,
  DELETE_DELIVERY_TYPE,
  CREATE_DELIVERY_TYPE,
  UPDATE_DELIVERY_RULE,
  DELETE_DELIVERY_RULE,
  GET_DELIVERY_RULE,
  SET_DELIVERY_RULE,
  GET_DELIVERY_TYPES_WITHOUT_PAGINATION,
  SET_DELIVERY_TYPES_WITHOUT_PAGINATION,
  GET_SEARCH_CITY,
  SET_SEARCH_CITY,
  GET_SEARCH_NEIGHBORHOOD,
  SET_SEARCH_NEIGHBORHOOD,
  CREATE_DELIVERY_RULE,
  GET_NEIGHBOURHOODS_BY_IDS,
  SET_NEIGHBOURHOODS_BY_IDS,
  GET_CITIES_BY_IDS,
  SET_CITIES_BY_IDS,
  HEADER_ICONS_WIDGET,
  GET_WALLET_BALANCE,
  SET_WALLET_BALANCE,
  GET_TREASURY_BALANCE,
  SET_TREASURY_BALANCE,
  GET_WALLET_TRANSACTIONS,
  SET_WALLET_TRANSACTIONS,
  CREATE_WALLET_TRANSACTION,
  GET_USERS_WALLET_TRANSACTIONS,
  SET_USERS_WALLET_TRANSACTIONS,
  GET_CUSTOMER_ADDRESSES,
  SET_CUSTOMER_ADDRESSES,
  CREATE_CASHBACK_TRANSACTION,
  VALIDATE_CASHBACK_CODE,
  UPDATE_ORDER_BY_SITE_DOMAIN,
  BOOKING_REQUEST_CALL,
  SET_ADMIN_MENU_LINKS,
} from "./constants";

export function setAdminMenuLinks(plugin, data) {
  return {
    type: SET_ADMIN_MENU_LINKS,
    plugin,
    data,
  };
}
export function updateOrdersBySiteDomain(orders) {
  return {
    type: UPDATE_ORDER_BY_SITE_DOMAIN,
    data: orders,
  };
}
export function setPlugins(business, incomingUrl, incomingHost, userInfo) {
  return {
    type: SET_PLUGINS,
    data: { business, incomingUrl, incomingHost, userInfo },
  };
}

export function setPluginWidgetItemAmounts(
  pluginName,
  widget = HEADER_ICONS_WIDGET,
  itemsAmount,
  business
) {
  return {
    type: SET_PLUGIN_WIDGET_ITEMS_AMOUNT,
    data: { pluginName, widget, itemsAmount, business },
  };
}

export function setPluginData(pluginName, data, callback, slug) {
  return {
    type: SET_PLUGIN_DATA,
    data: {
      plugin: pluginName,
      slug,
      data,
    },
    callback,
  };
}

export function getDeliveryTypes(pluginName, page, slug) {
  return {
    type: GET_DELIVERY_TYPES,
    data: {
      plugin: pluginName,
      page,
      slug,
    },
  };
}

export function getDeliveryTypesWithoutPagination(pluginName, slug) {
  return {
    type: GET_DELIVERY_TYPES_WITHOUT_PAGINATION,
    data: {
      plugin: pluginName,
      slug,
    },
  };
}

export function setDeliveryTypes(pluginName, data, pagination) {
  return {
    type: SET_DELIVERY_TYPES,
    data,
    plugin: pluginName,
    pagination,
  };
}

export function setDeliveryTypesWithoutPagination(pluginName, data) {
  return {
    type: SET_DELIVERY_TYPES_WITHOUT_PAGINATION,
    data,
    plugin: pluginName,
  };
}

export function updateDeliveryType(data) {
  return {
    type: UPDATE_DELIVERY_TYPE,
    data,
  };
}

export function deleteDeliveryType(data) {
  return {
    type: DELETE_DELIVERY_TYPE,
    data,
  };
}

export function createDeliveryType(data) {
  return {
    type: CREATE_DELIVERY_TYPE,
    data,
  };
}

export function getDeliveryType(pluginName, id) {
  return {
    type: GET_DELIVERY_TYPE,
    data: {
      plugin: pluginName,
      id,
    },
  };
}

export function setDeliveryType(pluginName, data) {
  return {
    type: SET_DELIVERY_TYPE,
    data,
    plugin: pluginName,
  };
}

export function getNeighbourhoodsByIds(ids) {
  return {
    type: GET_NEIGHBOURHOODS_BY_IDS,
    data: {
      ids,
    },
  };
}

export function setNeighbourhoodsByIds(data) {
  return {
    type: SET_NEIGHBOURHOODS_BY_IDS,
    data,
  };
}

export function getCitiesByIds(ids) {
  return {
    type: GET_CITIES_BY_IDS,
    data: {
      ids,
    },
  };
}

export function setCitiesByIds(data) {
  return {
    type: SET_CITIES_BY_IDS,
    data,
  };
}

export function getDeliveryRules(pluginName, slug) {
  return {
    type: GET_DELIVERY_RULES,
    data: {
      plugin: pluginName,
      slug,
    },
  };
}

export function setDeliveryRules(pluginName, data) {
  return {
    type: SET_DELIVERY_RULES,
    data,
    plugin: pluginName,
  };
}

export function updateDeliveryRule(data, id, pluginName, noLoading = false) {
  return {
    type: UPDATE_DELIVERY_RULE,
    data,
    id,
    plugin: pluginName,
    noLoading,
  };
}

export function createDeliveryRule(data, pluginName) {
  return {
    type: CREATE_DELIVERY_RULE,
    data,
    plugin: pluginName,
  };
}

export function deleteDeliveryRule(data) {
  return {
    type: DELETE_DELIVERY_RULE,
    data,
  };
}

export function getDeliveryRule(pluginName, id) {
  return {
    type: GET_DELIVERY_RULE,
    data: {
      plugin: pluginName,
      id,
    },
  };
}

export function setDeliveryRule(pluginName, data) {
  return {
    type: SET_DELIVERY_RULE,
    data,
    plugin: pluginName,
  };
}

export function getSearchCitySearch(pluginName, data) {
  return {
    type: GET_SEARCH_CITY,
    data,
    plugin: pluginName,
  };
}

export function setSearchCitySearch(pluginName, data) {
  return {
    type: SET_SEARCH_CITY,
    data,
    plugin: pluginName,
  };
}

export function getSearchNeighborhoodSearch(pluginName, data) {
  return {
    type: GET_SEARCH_NEIGHBORHOOD,
    data,
    plugin: pluginName,
  };
}

export function setSearchNeighborhoodSearch(pluginName, data) {
  return {
    type: SET_SEARCH_NEIGHBORHOOD,
    data,
    plugin: pluginName,
  };
}

export function getPluginsInternalLinks() {
  return {
    type: GET_PLUGINS_INTERNAL_LINKS,
  };
}
export function setPluginsInternalLinks(data) {
  return {
    type: SET_PLUGINS_INTERNAL_LINKS,
    data,
  };
}

export function updatePluginData(pluginName, data) {
  return {
    type: UPDATE_PLUGIN_DATA,
    pluginName,
    data,
  };
}

export function groupDiscountOnProducts(data) {
  return {
    type: SET_PRODUCT_GROUP_DISCOUNT,
    data,
  };
}

export function setShelves(shelves) {
  return {
    type: SET_SHELVES,
    data: shelves,
  };
}

export function setPluginAdminOrdersWidgetData(pluginName, orders) {
  return {
    type: SET_PLUGIN_ADMIN_ORDERS_WIDGET_DATA,
    data: { pluginName, orders },
  };
}

export function setPluginShoppingPaymentData(data) {
  return {
    type: SET_PLUGIN_PAYMENT_DATA,
    data,
  };
}

export function updatePluginPaymentData(pluginName, data) {
  return {
    type: UPDATE_PLUGIN_PAYMENT_DATA,
    pluginName,
    data,
  };
}

export function setVisitCardStats() {
  return {
    type: SET_VISIT_CARD_STATS,
  };
}

export function updateVisitCardStats(data) {
  return {
    type: UPDATE_VISIT_CARD_STATS,
    data,
  };
}

export function getCustomersCount() {
  return {
    type: GET_CUSTOMERS_COUNT,
  };
}

export function setCustomersCount(data) {
  return {
    type: SET_CUSTOMERS_COUNT,
    data,
  };
}

export function getPluginOrders(data) {
  return {
    type: GET_PLUGIN_ORDERS,
    data,
  };
}

export function setPluginOrders(plugin, data) {
  return {
    type: SET_PLUGIN_ORDERS,
    plugin,
    data,
  };
}

export function getPluginOrder(data) {
  return {
    type: GET_PLUGIN_ORDER,
    data,
  };
}

export function setPluginOrder(plugin, data) {
  return {
    type: SET_PLUGIN_ORDER,
    plugin,
    data,
  };
}

export function getWalletBalance(data) {
  return {
    type: GET_WALLET_BALANCE,
    data,
  };
}

export function setWalletBalance(data) {
  return {
    type: SET_WALLET_BALANCE,
    data,
  };
}

export function getTreasuryBalance(data) {
  return {
    type: GET_TREASURY_BALANCE,
    data,
  };
}

export function setTreasuryBalance(data) {
  return {
    type: SET_TREASURY_BALANCE,
    data,
  };
}

export function getWalletTransactions(data) {
  return {
    type: GET_WALLET_TRANSACTIONS,
    data,
  };
}

export function setWalletTransactions(data) {
  return {
    type: SET_WALLET_TRANSACTIONS,
    data,
  };
}

export function createWalletTransaction(data, callback) {
  return {
    type: CREATE_WALLET_TRANSACTION,
    data,
    callback,
  };
}

export function getUsersWalletTransactions(data) {
  return {
    type: GET_USERS_WALLET_TRANSACTIONS,
    data,
  };
}

export function setUsersWalletTransactions(data) {
  return {
    type: SET_USERS_WALLET_TRANSACTIONS,
    data,
  };
}

export function getCustomerAddresses(data) {
  return {
    type: GET_CUSTOMER_ADDRESSES,
    data,
  };
}
export function setCustomerAddresses(data) {
  return {
    type: SET_CUSTOMER_ADDRESSES,
    data,
  };
}

export function createCashbackTransaction(amount, code) {
  return {
    type: CREATE_CASHBACK_TRANSACTION,
    data: { amount, code },
  };
}
export function validateCashbackCode(code, callback) {
  return {
    type: VALIDATE_CASHBACK_CODE,
    data: { code },
    callback,
  };
}

export function callRequest(data, callback) {
  return {
    type: BOOKING_REQUEST_CALL,
    data,
    callback,
  };
}
