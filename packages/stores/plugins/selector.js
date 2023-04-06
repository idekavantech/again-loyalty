/**
 * The global state selectors
 */

import { createSelector } from "reselect";
import {
  getAdminUrlsFromPlugins,
  getPluginsCard,
  getAdminMenuLinkFromPlugins,
  getAdminOrdersWidgetDataFromPlugins,
  checkHasActivePlugin,
  getLandingPagesNamesFromPlugins,
  getMainPluginSEO,
  getPluginSharedComponents,
  getStaticInternalLinksFromPlugins,
  getDynamicInternalLinksFromPlugins,
} from "./selectorHelper";
import { initialState } from "./initialState";
import { selectBusiness } from "../business/selector";

const selectPlugins = (state) =>
  ({ ...state.business, ...state.plugins } || initialState);

const makeSelectPlugins = () =>
  createSelector(selectPlugins, (state) => state.plugins);

const makeSelectLandingPagesNamesFromPlugins = () =>
  createSelector(selectPlugins, (state) =>
    getLandingPagesNamesFromPlugins(state.plugins)
  );

const makeSelectPluginsDrawers = () =>
  createSelector(selectPlugins, (state) => state.drawers);

const makeSelectPluginsModals = () =>
  createSelector(selectPlugins, (state) => state.modals);
const makeSelectUrlPrefix = () =>
  createSelector(selectPlugins, (state) => state.urlPrefix);

const makeSelectAdminUrlPrefix = () =>
  createSelector(selectPlugins, (state) => state.adminUrlPrefix);

const makeSelectPluginsCard = () =>
  createSelector(selectPlugins, (state) => getPluginsCard(state.plugins));
const makeSelectCallToActions = (isEditMode) =>
  createSelector(selectPlugins, (state) =>
    isEditMode ? state.adminCallToActions : state.callToActions
  );
const makeSelectNavigationLinks = (isEditMode) =>
  createSelector(selectPlugins, (state) =>
    isEditMode ? state.adminNavigationLinks : state.navigationLinks
  );

const makeSelectAdminMenuLinks = () =>
  createSelector(selectPlugins, (state) =>
    getAdminMenuLinkFromPlugins(state.plugins, state.adminUrlPrefix)
  );

const makeSelectAdminUrls = () =>
  createSelector(selectPlugins, (state) =>
    getAdminUrlsFromPlugins(state.plugins)
  );

const makeSelectHasActivePlugin = () =>
  createSelector(selectPlugins, (state) => checkHasActivePlugin(state.plugins));

const makeSelectPlugin = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins && state.plugins[pluginName]
  );

const makeSelectPluginBaseUrl = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].baseUrl.url
  );
const makeSelectMinimumOrder = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].data.minimum_order || 0
  );
const makeSelectPluginUrls = (pluginName) =>
  createSelector(selectPlugins, (state) => state.plugins[pluginName].urls);

const makeSelectPluginModals = (pluginName) =>
  createSelector(selectPlugins, (state) => state.plugins[pluginName].modals);
const makeSelectPluginCTAText = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].callToActionText
  );

const makeSelectWidgets = () =>
  createSelector(selectPlugins, (state) => state.widgets);

const makeSelectPluginsStaticInternalLinks = () =>
  createSelector(selectPlugins, (state) =>
    getStaticInternalLinksFromPlugins(state.plugins)
  );
const makeSelectPluginsDynamicInternalLinks = () =>
  createSelector(selectPlugins, (state) =>
    getDynamicInternalLinksFromPlugins(state.plugins)
  );

const makeSelectAdminOrdersWidget = () =>
  createSelector(selectPlugins, (state) =>
    getAdminOrdersWidgetDataFromPlugins(state.plugins)
  );

const makeSelectPluginOrders = (pluginName) =>
  createSelector(selectPlugins, (state) => state.plugins[pluginName].orders);

const makeSelectPluginCurrentOrder = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].currentOrder
  );

const makeSelectPluginSEO = () =>
  createSelector(selectPlugins, (state) => getMainPluginSEO(state.plugins));

const makeSelectPluginSharedComponent = () =>
  createSelector(selectPlugins, (state) =>
    getPluginSharedComponents(state.plugins)
  );

const makeSelectInternalLinks = () =>
  createSelector(selectPlugins, (state) => state.internal_links);

const makeSelectDeliveryTypes = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].deliveryTypes
  );

const makeSelectDeliveryTypesPagination = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].deliveryTypesPagination
  );

const makeSelectDeliveryTypesWithoutPagination = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].deliveryTypesWithoutPagination
  );

const makeSelectDeliveryType = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].deliveryType
  );

const makeSelectDeliveryRules = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].deliveryRules
  );

const makeSelectDeliveryRule = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].deliveryRule
  );

const makeSelectSearchedCity = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].searchedCity
  );

const makeSelectSearchedNeighborhood = (pluginName) =>
  createSelector(
    selectPlugins,
    (state) => state.plugins[pluginName].searchedNeighborhood
  );

const makeSelectNeighbourhoodsByIds = () =>
  createSelector(selectPlugins, (state) => state.neighbourhoodsByIds);

const makeSelectCitiesByIds = () =>
  createSelector(selectPlugins, (state) => state.citiesByIds);

const makeSelectWalletBalance = () =>
  createSelector(selectPlugins, (state) => state.walletBalance);
const makeSelectTreasuryBalance = () =>
  createSelector(selectPlugins, (state) => state.treasuryBalance);
const makeSelectWalletTransactions = () =>
  createSelector(selectPlugins, (state) => state.walletTransactions);
const makeSelectUsersWalletTransactions = () =>
  createSelector(selectPlugins, (state) => state.usersWalletTransactions);
const makeSelectCustomerAddresses = () =>
  createSelector(selectPlugins, (state) => state.customerAddresses);

const makeSelectPluginPages = () =>
  createSelector(selectPlugins, (state) => {
    return Object.fromEntries(
      Object.entries(state.plugins)
        .filter(([, value]) => value.isActive && value.pages)
        .map(([key, value]) => [
          key,
          {
            pages: value.pages,
            pagesLabel: value.pagesLabel,
            pageSetting: value.pageSetting,
            id: key,
          },
        ])
    );
  });
const makeSelectNewOrders = () =>
  createSelector(selectPlugins, (shoppingState) => {
    return shoppingState.newOrderItems;
  });
const makeSelectOrdersBySiteDomain = () =>
  createSelector(
    selectPlugins,
    selectBusiness,
    (shoppingState, businessState) => {
      return shoppingState.newOrderItems[businessState.business.site_domain];
    }
  );
export {
  makeSelectOrdersBySiteDomain,
  makeSelectNewOrders,
  makeSelectAdminUrlPrefix,
  makeSelectCitiesByIds,
  makeSelectNeighbourhoodsByIds,
  makeSelectPluginsDynamicInternalLinks,
  makeSelectPluginsStaticInternalLinks,
  makeSelectInternalLinks,
  makeSelectPluginSharedComponent,
  makeSelectPluginSEO,
  makeSelectPluginCTAText,
  makeSelectPluginModals,
  makeSelectPluginUrls,
  makeSelectPluginBaseUrl,
  makeSelectAdminOrdersWidget,
  makeSelectPluginsModals,
  makeSelectPluginsDrawers,
  makeSelectNavigationLinks,
  makeSelectAdminMenuLinks,
  makeSelectPluginsCard,
  makeSelectAdminUrls,
  makeSelectWidgets,
  makeSelectPlugins,
  makeSelectCallToActions,
  makeSelectPlugin,
  makeSelectHasActivePlugin,
  makeSelectPluginOrders,
  makeSelectPluginCurrentOrder,
  makeSelectLandingPagesNamesFromPlugins,
  makeSelectMinimumOrder,
  makeSelectUrlPrefix,
  makeSelectDeliveryTypes,
  makeSelectDeliveryType,
  makeSelectDeliveryRules,
  makeSelectDeliveryTypesPagination,
  makeSelectPluginPages,
  makeSelectDeliveryRule,
  makeSelectDeliveryTypesWithoutPagination,
  makeSelectSearchedCity,
  makeSelectSearchedNeighborhood,
  makeSelectWalletBalance,
  makeSelectTreasuryBalance,
  makeSelectWalletTransactions,
  makeSelectUsersWalletTransactions,
  makeSelectCustomerAddresses,
};
