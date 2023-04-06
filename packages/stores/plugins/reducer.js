/* eslint-disable no-case-declarations */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import {
  SET_PLUGINS,
  SET_PLUGIN_WIDGET_ITEMS_AMOUNT,
  UPDATE_PLUGIN_DATA,
  SET_PLUGIN_ADMIN_ORDERS_WIDGET_DATA,
  ADMIN_ORDERS_WIDGET,
  UPDATE_PLUGIN_PAYMENT_DATA,
  UPDATE_VISIT_CARD_STATS,
  SET_PLUGIN_ORDERS,
  SET_PLUGIN_ORDER,
  SET_CUSTOMERS_COUNT,
  SET_PLUGINS_INTERNAL_LINKS,
  SET_DELIVERY_TYPES,
  SET_DELIVERY_RULES,
  SET_DELIVERY_TYPE,
  SET_DELIVERY_RULE,
  SET_DELIVERY_TYPES_WITHOUT_PAGINATION,
  SET_SEARCH_CITY,
  SET_SEARCH_NEIGHBORHOOD,
  SET_NEIGHBOURHOODS_BY_IDS,
  SET_CITIES_BY_IDS,
  SET_WALLET_BALANCE,
  SET_TREASURY_BALANCE,
  SET_WALLET_TRANSACTIONS,
  SET_USERS_WALLET_TRANSACTIONS,
  SET_CUSTOMER_ADDRESSES,
  UPDATE_ORDER_BY_SITE_DOMAIN,
  SET_ADMIN_MENU_LINKS,
} from "./constants";
import {
  getCallToActionFromPlugins,
  getDrawersFromPlugins,
  getModalsFromPlugins,
  getNavigationLinksFromPlugins,
  getWidgetsFromPlugins,
} from "./selectorHelper";
import { pluginsSerializer } from "./serializer";
import { initialState } from "./initialState";
import { HYDRATE } from "next-redux-wrapper";
import { getBranchBusinessSiteDomain } from "@saas/utils/helpers/getBranchBusinessSiteDomain";

import { getSiteDomain } from "@saas/utils/helpers/getSiteDomain";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

/* eslint-disable default-case, no-param-reassign */
/* eslint-disable no-restricted-syntax */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        // Attention! This will overwrite client state! Real apps should use proper reconciliation.
        return { ...state, ...action.payload.plugins };

      case SET_ADMIN_MENU_LINKS:
        draft.adminMenuLinks = {
          ...state.adminMenuLinks,
          [action.plugin]: action.data,
        };
        break;
      case UPDATE_ORDER_BY_SITE_DOMAIN:
        draft.newOrderItems = action.data;
        break;
      case SET_PLUGINS:
        const plugins = pluginsSerializer(
          action.data.business,
          action.data.incomingUrl,
          action.data.incomingHost,
          action.data.userInfo
        );
        draft.urlPrefix =
          action.data.business &&
          action.data.business.super_business &&
          getSiteDomain(action.data.incomingHost || window.location.host) ===
            action.data.business.super_business.site_domain
            ? `/branches/${getBranchBusinessSiteDomain(
                action.data.incomingUrl
              )}`
            : "";
        draft.adminUrlPrefix = action.data.incomingUrl.match(
          /\/admin\/([a-zA-Z0-9\-]*)\/branches\/([a-zA-Z0-9\-]*)/m
        )?.[0]
          ? `${
              action.data.incomingUrl.match(
                /\/admin\/([a-zA-Z0-9\-]*)\/branches\/([a-zA-Z0-9\-]*)/m
              )?.[0]
            }/`
          : `${
              action.data.incomingUrl.match(/\/admin\/([a-zA-Z0-9\-]*)/m)?.[0]
            }/`;
        draft.plugins = plugins;
        draft.callToActions = getCallToActionFromPlugins(plugins);
        draft.adminCallToActions = getCallToActionFromPlugins(plugins, true);
        draft.navigationLinks = getNavigationLinksFromPlugins(plugins);
        draft.adminNavigationLinks = getNavigationLinksFromPlugins(
          plugins,
          true
        );
        draft.widgets = getWidgetsFromPlugins(plugins, action.data.business);
        draft.modals = getModalsFromPlugins(plugins);
        draft.drawers = getDrawersFromPlugins(plugins);
        break;
      case SET_PLUGIN_WIDGET_ITEMS_AMOUNT:
        {
          const { widgets } = draft.plugins[action.data.pluginName];
          draft.plugins = {
            ...draft.plugins,
            [action.data.pluginName]: {
              ...draft.plugins[action.data.pluginName],
              widgets: {
                ...widgets,
                [action.data.widget]: widgets[action.data.widget].map(
                  (widget) => {
                    const newWidget = { ...widget };
                    if (widget.itemsAmount !== undefined)
                      newWidget.itemsAmount = action.data.itemsAmount;
                    return newWidget;
                  }
                ),
              },
            },
          };
          draft.widgets = getWidgetsFromPlugins(
            draft.plugins,
            action.data.business
          );
        }
        break;
      case SET_PLUGINS_INTERNAL_LINKS:
        draft.internal_links = action.data;
        break;
      case UPDATE_PLUGIN_DATA:
        draft.plugins[action.pluginName].data = action.data;
        break;

      case SET_PLUGIN_ADMIN_ORDERS_WIDGET_DATA:
        {
          const unseenOrders = action.data.orders.filter(
            (order) => order.order_status === 40
          );
          const { widgets } = draft.plugins[action.data.pluginName];
          draft.plugins = {
            ...draft.plugins,
            [action.data.pluginName]: {
              ...draft.plugins[action.data.pluginName],
              widgets: {
                ...widgets,
                [ADMIN_ORDERS_WIDGET]: {
                  ...widgets[ADMIN_ORDERS_WIDGET],
                  ordersAmount: unseenOrders.length,
                  orders: unseenOrders,
                },
              },
            },
          };
        }
        break;
      case UPDATE_PLUGIN_PAYMENT_DATA:
        draft.plugins[action.pluginName].payment_data = action.data;
        break;
      case UPDATE_VISIT_CARD_STATS:
        draft.plugins[CRM_PLUGIN].stats = action.data;
        break;
      case SET_PLUGIN_ORDERS:
        draft.plugins[action.plugin].orders = action.data;
        break;
      case SET_PLUGIN_ORDER:
        draft.plugins[action.plugin].currentOrder = action.data;
        break;
      case SET_DELIVERY_TYPES:
        draft.plugins[action.plugin].deliveryTypes = action.data;
        draft.plugins[action.plugin].deliveryTypesPagination =
          action.pagination;
        break;
      case SET_DELIVERY_TYPES_WITHOUT_PAGINATION:
        draft.plugins[action.plugin].deliveryTypesWithoutPagination =
          action.data;
        break;
      case SET_DELIVERY_TYPE:
        draft.plugins[action.plugin].deliveryType = action.data;
        break;
      case SET_DELIVERY_RULES:
        draft.plugins[action.plugin].deliveryRules = action.data;
        break;
      case SET_DELIVERY_RULE:
        draft.plugins[action.plugin].deliveryRule = action.data;
        break;
      case SET_SEARCH_CITY:
        draft.plugins[action.plugin].searchedCity = action.data;
        break;
      case SET_SEARCH_NEIGHBORHOOD:
        draft.plugins[action.plugin].searchedNeighborhood = action.data;
        break;

      case SET_NEIGHBOURHOODS_BY_IDS:
        draft.neighbourhoodsByIds = action.data;
        break;

      case SET_CITIES_BY_IDS:
        draft.citiesByIds = action.data;
        break;
      case SET_WALLET_BALANCE:
        draft.walletBalance = action.data;
        break;
      case SET_TREASURY_BALANCE:
        draft.treasuryBalance = action.data;
        break;
      case SET_WALLET_TRANSACTIONS:
        draft.walletTransactions = action.data;
      case SET_USERS_WALLET_TRANSACTIONS:
        draft.usersWalletTransactions = action.data;
        break;
      case SET_CUSTOMER_ADDRESSES:
        draft.customerAddresses = action.data;
        break;
      case SET_CUSTOMERS_COUNT:
        draft.plugins = {
          ...draft.plugins,
          [CRM_PLUGIN]: {
            ...draft.plugins[CRM_PLUGIN],
            customersCount: action.data,
          },
        };
        break;
    }
  });

export default appReducer;
