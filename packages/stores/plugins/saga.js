import { call, put, takeLatest, select } from "@redux-saga/core/effects";
import { init, startLoading, stopLoading } from "../global/actions";
import request from "@saas/utils/request";
import {
  BUSINESS_CUSTOMERS_COUNT_API,
  BUSINESS_ORDERS_API,
  BUSINESS_VISIT_CARD_STATS_API,
  GET_BUSINESS_DELIVERY_RULES_API,
  GET_BUSINESS_DELIVERY_TYPES_API,
  GET_PAGES_API,
  GROUP_DISCOUNT_ON_DEALS_API,
  SET_PLUGIN_DATA_API,
  SET_PLUGIN_SHOPPING_PAYMENT_DATA_API,
  SITEMAP_PRODUCTS_API,
  DELIVERY_TYPES_ITEM_API,
  USER_ORDERS_ITEMS_API,
  DELIVERY_TYPES_API,
  DELIVERY_RULES_ITEM_API,
  GET_BUSINESS_DELIVERY_TYPES_WITHOUT_PAGINATION_API,
  NEIGHBORHOOD_SEARCH_API,
  CITY_SEARCH_API,
  DELIVERY_RULES_API,
  NEIGHBORHOOD_SEARCH_BY_IDS_API,
  CITY_SEARCH_BY_IDS_API,
  GET_WALLET_BALANCE_API,
  GET_WALLET_TRANSACTIONS_API,
  WALLET_TRANSACTIONS_API,
  GET_USERS_WALLET_TRANSACTIONS_API,
  CUSTOMER_USER_ADDRESS_API,
  CREATE_CASHBACK_TRANSACTION_API,
  CASHBACK_TRANSACTION_ZIBAL_API,
  VALIDATE_CASHBACK_CODE_API,
  REQUEST_CALLS_API,
} from "@saas/utils/api";
import {
  SET_PLUGIN_DATA,
  SET_PRODUCT_GROUP_DISCOUNT,
  SET_PLUGIN_PAYMENT_DATA,
  SET_VISIT_CARD_STATS,
  GET_PLUGIN_ORDERS,
  GET_PLUGIN_ORDER,
  GET_CUSTOMERS_COUNT,
  GET_PLUGINS_INTERNAL_LINKS,
  GET_DELIVERY_TYPES,
  UPDATE_DELIVERY_TYPE,
  GET_DELIVERY_RULES,
  GET_DELIVERY_TYPE,
  DELETE_DELIVERY_TYPE,
  CREATE_DELIVERY_TYPE,
  UPDATE_DELIVERY_RULE,
  DELETE_DELIVERY_RULE,
  GET_DELIVERY_RULE,
  GET_DELIVERY_TYPES_WITHOUT_PAGINATION,
  GET_SEARCH_CITY,
  GET_SEARCH_NEIGHBORHOOD,
  CREATE_DELIVERY_RULE,
  GET_NEIGHBOURHOODS_BY_IDS,
  GET_CITIES_BY_IDS,
  GET_WALLET_BALANCE,
  GET_TREASURY_BALANCE,
  GET_WALLET_TRANSACTIONS,
  CREATE_WALLET_TRANSACTION,
  GET_USERS_WALLET_TRANSACTIONS,
  GET_CUSTOMER_ADDRESSES,
  CREATE_CASHBACK_TRANSACTION,
  VALIDATE_CASHBACK_CODE,
  BOOKING_REQUEST_CALL,
} from "./constants";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import {
  makeSelectBranches,
  makeSelectBusiness,
  makeSelectBusinessSiteDomain,
  makeSelectBusinessSlug,
} from "../business/selector";
import { setSnackBarMessage } from "../ui/actions";
import {
  updatePluginData,
  updateVisitCardStats,
  setPluginAdminOrdersWidgetData,
  setPluginOrder,
  setPluginOrders,
  setCustomersCount,
  setPlugins,
  setPluginsInternalLinks,
  setDeliveryTypes,
  setDeliveryRules,
  setDeliveryType,
  setDeliveryRule,
  setDeliveryTypesWithoutPagination,
  setSearchCitySearch,
  setSearchNeighborhoodSearch,
  setNeighbourhoodsByIds,
  setCitiesByIds,
  setWalletBalance,
  setTreasuryBalance,
  setWalletTransactions,
  setUsersWalletTransactions,
  setCustomerAddresses,
} from "./actions";
import {
  makeSelectPluginsStaticInternalLinks,
  makeSelectPluginsDynamicInternalLinks,
  makeSelectUrlPrefix,
  makeSelectDeliveryRules,
} from "./selector";

import { getAllItemsFromMenu } from "@saas/utils/helpers/getAllItemsFromMenu";

import { getPages } from "@saas/utils/services/getPages";

import { setBusiness } from "../business/actions";
import axios from "axios";
import Router from "next/router";
const ADMIN_ORDERS_PAGE_SIZE = 20;

export function* setPluginData(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      SET_PLUGIN_DATA_API(action.data.slug || slug),
      action.data,
      "PATCH"
    );
    if (data) {
      yield put(updatePluginData(action.data.plugin, action.data.data));
      yield put(setSnackBarMessage("تنظیمات با موفقیت ذخیره شد.", "success"));
    }
    yield put(stopLoading());
    if (action.callback) yield call(action.callback);
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* groupDiscountOnProducts(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    yield call(
      request,
      GROUP_DISCOUNT_ON_DEALS_API(slug),
      action.data,
      "PATCH"
    );
    const subdomain = yield select(makeSelectBusinessSiteDomain());

    yield put(init(subdomain));
    yield put(setSnackBarMessage("تغییرات با موفقیت ذخیره شد.", "success"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("لطفا دوباره تلاش نمایید.", "fail"));
    yield put(stopLoading());
  }
}

export function* setPluginShoppingPaymentDataSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      SET_PLUGIN_SHOPPING_PAYMENT_DATA_API(action.data.slug || slug),
      action.data,
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("تنظیمات با موفقیت ذخیره شد.", "success"));
      yield put(setBusiness({ business: data, subdomain: data?.site_domain }));
      yield put(
        setPlugins(data, window.location.pathname, window.location.host)
      );
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* setVisitCardStats() {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, BUSINESS_VISIT_CARD_STATS_API(slug), {}, "GET");
    if (data) yield put(updateVisitCardStats(data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getPluginOrdersFunc(action) {
  try {
    yield put(startLoading("adminOrders"));
    const domain = yield select(makeSelectBusinessSiteDomain());
    const {
      response: { data },
    } = yield call(
      request,
      BUSINESS_ORDERS_API(action.data.plugin, 1, ADMIN_ORDERS_PAGE_SIZE, false),
      { domain, status: action.data.status },
      "GET"
    );
    if (data) {
      yield put(setPluginOrders(action.data.plugin, data));
      yield put(setPluginAdminOrdersWidgetData(action.data.plugin, data));
    }
    yield put(stopLoading("adminOrders"));
  } catch (err) {
    yield put(stopLoading("adminOrders"));
  }
}

export function* getPluginOrder(action) {
  try {
    const {
      response: { data },
    } = yield call(
      request,
      USER_ORDERS_ITEMS_API(action.data.id, action.data.plugin),
      {},
      "GET"
    );
    if (data) yield put(setPluginOrder(action.data.plugin, data));
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getCustomersCount() {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, BUSINESS_CUSTOMERS_COUNT_API(slug), {}, "GET");
    if (data) yield put(setCustomersCount(data.customers_count));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

const dynamic_internal_links_funcs = {
  deals: async (slug, urlPrefix) => {
    const {
      data: { data: products },
    } = await axios.get(SITEMAP_PRODUCTS_API(slug));
    return products.map((product) => ({
      label: `محصول: ${product.title}`,
      value: `${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${product.id}`,
    }));
  },
  categories: async (slug, urlPrefix, business) => {
    return business.resource_labels.map((category) => ({
      label: `برچسب: ${category.title}`,
      value: `${urlPrefix}/${SHOPPING_PLUGIN_URL}/l/${category.id}`,
    }));
  },
  menuItems: async (slug, urlPrefix, business) => {
    return getAllItemsFromMenu(business.menu).map((item) => ({
      label: `دسته‌بندی: ${item.name}`,
      value: `${urlPrefix}/${SHOPPING_PLUGIN_URL}/c/${item.id}`,
    }));
  },
};
export function* getPluginsInternalLinksSaga() {
  const urlPrefix = yield select(makeSelectUrlPrefix());
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const branches = yield select(makeSelectBranches());
    const links = [
      { label: "صفحه اصلی", value: "/" },
      { label: "صفحه درباره ما", value: "/about" },
    ];
    links.push(
      ...branches?.map((branch) => ({
        label: `شعبه: ${branch.title}`,
        value: `/branches/${branch.site_domain}/s/`,
      }))
    );
    const pages = yield call(getPages, GET_PAGES_API(slug));
    const blogs = yield call(getPages, GET_PAGES_API(slug, 1, true));
    links.push(
      ...pages.map((page) => ({
        label: `صفحه: ${page.data.name}`,
        value: `${urlPrefix}/${page.id}`,
      })),
      ...blogs.map((page) => ({
        label: `پست: ${page.data.name}`,
        value: `${urlPrefix}/blog/${page.id}`,
      }))
    );
    const business = yield select(makeSelectBusiness());
    const staticLinks = yield select(makeSelectPluginsStaticInternalLinks());

    const dynamicLinksName = yield select(
      makeSelectPluginsDynamicInternalLinks()
    );
    for (const item of dynamicLinksName) {
      const _links = yield call(
        dynamic_internal_links_funcs[item],
        slug,
        urlPrefix,
        business
      );
      links.push(..._links);
    }

    links.push(...staticLinks);
    yield put(setPluginsInternalLinks(links));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getDeliveryTypesSaga(action) {
  try {
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data, pagination, meta },
    } = yield call(
      request,
      GET_BUSINESS_DELIVERY_TYPES_API(
        action.data.slug || slug,
        action.data.page
      ),
      {},
      "GET"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setDeliveryTypes(action.data.plugin, data, pagination));
    }
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getDeliveryTypesWithoutPaginationSaga(action) {
  try {
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data, meta },
    } = yield call(
      request,
      GET_BUSINESS_DELIVERY_TYPES_WITHOUT_PAGINATION_API(
        action.data.slug || slug
      ),
      {},
      "GET"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setDeliveryTypesWithoutPagination(action.data.plugin, data));
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateDeliveryTypeSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;
    delete action.data.business;
    const {
      response: { meta },
    } = yield call(request, DELIVERY_TYPES_ITEM_API(id), action.data, "PATCH");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("تغییرات شما با موفقیت ثبت شد.", "success"));
    } else {
      yield put(setSnackBarMessage("خظایی رخ داده‌است.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* deleteDeliveryTypeSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, DELIVERY_TYPES_ITEM_API(action.data), {}, "DELETE");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("روش ارسال با موفقیت حذف شد.", "success"));
      yield call(Router.back);
    } else {
      yield put(setSnackBarMessage("خظایی رخ داده‌است.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createDeliveryTypeSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, DELIVERY_TYPES_API, action.data, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("روش ارسال با موفقیت ساخته شد.", "success"));
      yield call(Router.back);
    } else {
      yield put(setSnackBarMessage("خظایی رخ داده‌است.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getDeliveryTypeSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, DELIVERY_TYPES_ITEM_API(action.data.id), {}, "GET");
    if (data) yield put(setDeliveryType(action.data.plugin, data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getDeliveryRulesSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      GET_BUSINESS_DELIVERY_RULES_API(action.data.slug || slug),
      {},
      "GET"
    );
    if (data) yield put(setDeliveryRules(action.data.plugin, data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateDeliveryRuleSaga(action) {
  try {
    if (!action.noLoading) {
      yield put(startLoading());
    }
    delete action.data.business;
    const {
      response: { meta, data },
    } = yield call(
      request,
      DELIVERY_RULES_ITEM_API(action.id),
      action.data,
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      const newArray = yield select(makeSelectDeliveryRules(action.plugin));
      if (newArray !== undefined) {
        const selectedItemIndex = newArray.findIndex(
          (item) => item.id === action.id
        );
        newArray[selectedItemIndex] = data;
        yield put(setDeliveryRules(action.plugin, [...newArray]));
      }
      yield put(setDeliveryRule(action.plugin, data));
      yield put(setSnackBarMessage("تغییرات شما با موفقیت ثبت شد.", "success"));
    } else {
      yield put(setSnackBarMessage("خظایی رخ داده‌است.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log("err", err);
    yield put(stopLoading());
  }
}

export function* createDeliveryRuleSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta, data },
    } = yield call(request, DELIVERY_RULES_API, action.data, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield call(getDeliveryRulesSaga, { data: { plugin: action.plugin } });
      yield put(setDeliveryRule(action.plugin, data));
      yield call(Router.back);
      yield put(
        setSnackBarMessage("محدوده ارسال شما با موفقیت ساخته شد.", "success")
      );
    } else {
      yield put(setSnackBarMessage("خظایی رخ داده‌است.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log("err", err);
    yield put(stopLoading());
  }
}

export function* deleteDeliveryRuleSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, DELIVERY_RULES_ITEM_API(action.data), {}, "DELETE");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("محدوده سرویس‌دهی با موفقیت حذف شد.", "success")
      );
      yield call(Router.back);
    } else {
      yield put(setSnackBarMessage("خظایی رخ داده‌است.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getDeliveryRuleSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, DELIVERY_RULES_ITEM_API(action.data.id), {}, "GET");
    if (data) yield put(setDeliveryRule(action.data.plugin, data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getSearchCitySaga(action) {
  try {
    const {
      response: { data },
    } = yield call(request, CITY_SEARCH_API(action.data), {}, "GET");
    if (data) {
      yield put(setSearchCitySearch(action.plugin, data));
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getSearchNeighborhoodSaga(action) {
  try {
    const {
      response: { data },
    } = yield call(request, NEIGHBORHOOD_SEARCH_API(action.data), {}, "GET");
    if (data) {
      yield put(setSearchNeighborhoodSearch(action.plugin, data));
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getNeighbourhoodsByIdsSaga(action) {
  try {
    const {
      response: { data },
    } = yield call(
      request,
      NEIGHBORHOOD_SEARCH_BY_IDS_API(action.data.ids),
      {},
      "GET"
    );
    if (data) {
      yield put(setNeighbourhoodsByIds(data));
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
export function* getCitiesByIdsSaga(action) {
  try {
    const {
      response: { data },
    } = yield call(request, CITY_SEARCH_BY_IDS_API(action.data.ids), {}, "GET");
    if (data) {
      yield put(setCitiesByIds(data));
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getWalletBalanceSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      GET_WALLET_BALANCE_API,
      { business_id: action.data.businessId, branch_id: action.data.branchId },
      "GET"
    );
    if (data) {
      yield put(setWalletBalance(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getTreasuryBalanceSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      GET_WALLET_BALANCE_API,
      { business_id: action.data.businessId },
      "GET"
    );
    if (data) {
      yield put(setTreasuryBalance(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getWalletTransactionsSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      GET_WALLET_TRANSACTIONS_API,
      {
        business_id: action.data.businessId,
        branch_id: action.data.branchId,
        page: action.data.page,
        is_open: action.data.is_open,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        description: action.data.description,
      },
      "GET"
    );
    if (data) {
      yield put(setWalletTransactions(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createWalletTransactionSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      WALLET_TRANSACTIONS_API,
      {
        business_id: action.data.business_id,
        branch_id: action.data.branch_id,
        amount: action.data.amount,
        description: action.data.description,
        user_description: action.data.user_description,
      },
      "POST"
    );
    yield put(stopLoading());
    if (typeof action.callback === "function" && data) {
      yield call(action.callback);
    }
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getUsersWalletTransactionSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      GET_USERS_WALLET_TRANSACTIONS_API,
      {
        business_id: action.data.businessId,
        branch_id: action.data.branchId,
        page: action.data.page,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        description: action.data.description,
      },
      "GET"
    );
    if (data) {
      yield put(setUsersWalletTransactions(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* getCustomerAddressesSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      CUSTOMER_USER_ADDRESS_API(action.data.id),
      {},
      "GET"
    );
    if (data) {
      yield put(setCustomerAddresses(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
export function* createCashbackTransactionSaga(action) {
  try {
    yield put(startLoading());
    const business = yield select(makeSelectBusinessSlug());
    const dto = { amount: action.data.amount };
    if (action.data.code) dto.cashback_code = action.data.code;
    const {
      response: {
        data: { transaction_id: transactionID },
      },
    } = yield call(
      request,
      CREATE_CASHBACK_TRANSACTION_API(business),
      dto,
      "POST"
    );

    const {
      response: {
        data: { url },
      },
    } = yield call(
      request,
      CASHBACK_TRANSACTION_ZIBAL_API(transactionID),
      {},
      "GET"
    );
    window.location.href = url;
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
export function* validateCashbackCodeSaga(action) {
  try {
    yield put(startLoading());
    const business = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      VALIDATE_CASHBACK_CODE_API(business),
      { cashback_code: action.data.code },
      "POST"
    );
    if (action.callback) yield call(action.callback, data?.verified);
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
export function* requestCallSaga(action) {
  try {
    let { callback } = action;
    const slug = yield select(makeSelectBusinessSlug());
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      REQUEST_CALLS_API,
      { business_slug: slug, source: "vitrin", type: action.data.type },
      "POST"
    );
    if (data) {
      if (callback) {
        yield call(callback);
      }
      yield put(stopLoading());
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
const sagaFunctions = [
  takeLatest(SET_PLUGIN_DATA, setPluginData),
  takeLatest(SET_PRODUCT_GROUP_DISCOUNT, groupDiscountOnProducts),
  takeLatest(SET_PLUGIN_PAYMENT_DATA, setPluginShoppingPaymentDataSaga),
  takeLatest(SET_VISIT_CARD_STATS, setVisitCardStats),
  takeLatest(GET_CUSTOMERS_COUNT, getCustomersCount),
  takeLatest(GET_PLUGIN_ORDERS, getPluginOrdersFunc),
  takeLatest(GET_PLUGIN_ORDER, getPluginOrder),
  takeLatest(GET_PLUGINS_INTERNAL_LINKS, getPluginsInternalLinksSaga),
  takeLatest(GET_DELIVERY_TYPES, getDeliveryTypesSaga),
  takeLatest(
    GET_DELIVERY_TYPES_WITHOUT_PAGINATION,
    getDeliveryTypesWithoutPaginationSaga
  ),
  takeLatest(UPDATE_DELIVERY_TYPE, updateDeliveryTypeSaga),
  takeLatest(DELETE_DELIVERY_TYPE, deleteDeliveryTypeSaga),
  takeLatest(CREATE_DELIVERY_TYPE, createDeliveryTypeSaga),
  takeLatest(GET_DELIVERY_TYPE, getDeliveryTypeSaga),
  takeLatest(GET_DELIVERY_RULES, getDeliveryRulesSaga),
  takeLatest(UPDATE_DELIVERY_RULE, updateDeliveryRuleSaga),
  takeLatest(CREATE_DELIVERY_RULE, createDeliveryRuleSaga),
  takeLatest(DELETE_DELIVERY_RULE, deleteDeliveryRuleSaga),
  takeLatest(GET_DELIVERY_RULE, getDeliveryRuleSaga),
  takeLatest(GET_SEARCH_CITY, getSearchCitySaga),
  takeLatest(GET_SEARCH_NEIGHBORHOOD, getSearchNeighborhoodSaga),
  takeLatest(GET_NEIGHBOURHOODS_BY_IDS, getNeighbourhoodsByIdsSaga),
  takeLatest(GET_CITIES_BY_IDS, getCitiesByIdsSaga),
  takeLatest(GET_WALLET_BALANCE, getWalletBalanceSaga),
  takeLatest(GET_TREASURY_BALANCE, getTreasuryBalanceSaga),
  takeLatest(GET_WALLET_TRANSACTIONS, getWalletTransactionsSaga),
  takeLatest(CREATE_WALLET_TRANSACTION, createWalletTransactionSaga),
  takeLatest(GET_USERS_WALLET_TRANSACTIONS, getUsersWalletTransactionSaga),
  takeLatest(GET_CUSTOMER_ADDRESSES, getCustomerAddressesSaga),
  takeLatest(CREATE_CASHBACK_TRANSACTION, createCashbackTransactionSaga),
  takeLatest(VALIDATE_CASHBACK_CODE, validateCashbackCodeSaga),
  takeLatest(BOOKING_REQUEST_CALL, requestCallSaga),
];
export default sagaFunctions;
