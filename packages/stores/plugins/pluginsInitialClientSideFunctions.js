import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  setPluginWidgetItemAmounts,
  updateOrdersBySiteDomain,
} from "./actions";
import {
  HEADER_ICONS_WIDGET,
  SHOPPING_CART_STORAGE_BY_SITE_DOMAIN,
} from "./constants";
export const pluginsInitialClientSideFunctions = {
  [SHOPPING_PLUGIN]: (dispatch, store) => {
    const shoppingCartBySiteDomainStorage = localStorage.getItem(
      SHOPPING_CART_STORAGE_BY_SITE_DOMAIN
    );
    const newOrders = shoppingCartBySiteDomainStorage
      ? JSON.parse(shoppingCartBySiteDomainStorage)
      : {};
    const business = store.business.business;
    const updatedItemsAmount =
      newOrders?.[business.site_domain]?.reduce(
        (sum, orderItem) => sum + orderItem.count,
        0
      ) || 0;
    setTimeout(() => {
      dispatch(updateOrdersBySiteDomain(newOrders));
      dispatch(
        setPluginWidgetItemAmounts(
          SHOPPING_PLUGIN,
          HEADER_ICONS_WIDGET,
          updatedItemsAmount,
          business
        )
      );
    }, 0);
  },
};
