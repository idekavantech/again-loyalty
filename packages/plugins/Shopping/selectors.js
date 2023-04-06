import { createSelector } from "reselect";
import { selectBusiness } from "@saas/stores/business/selector";
import { initialState } from "./reducer";

const selectShoppingPageDomain = (state) => state.shopping || initialState;

const makeSelectShoppingPluginContainer = () =>
  createSelector(selectShoppingPageDomain, (substate) => substate);

const makeSelectOrders = () =>
  createSelector(
    selectShoppingPageDomain,
    selectBusiness,
    (shoppingState) => {
      return shoppingState.orderItems;
    }
  );

const makeSelectOrderInfo = () =>
  createSelector(selectShoppingPageDomain, (state) => state.orderInfo);
const makeSelectDiscountError = () =>
  createSelector(selectShoppingPageDomain, (state) => state.discountError);

const makeSelectUserOrder = () =>
  createSelector(selectShoppingPageDomain, (state) => state.userOrder);

const makeSelectUserOrders = () =>
  createSelector(selectShoppingPageDomain, (state) => state.userOrders);
const makeSelectCountOfUserOrders = () =>
  createSelector(selectShoppingPageDomain, (state) => state.countOfUserOrders);
const makeSelectAuthorization = () =>
  createSelector(selectShoppingPageDomain, (state) => state.authorization);
const makeSelectCategoriesDeals = () =>
  createSelector(selectShoppingPageDomain, (state) => state.categoriesDeals);
const makeSelectRecommendedDeals = () =>
  createSelector(selectShoppingPageDomain, (state) => state.recommendedDeals);
const makeSelectDeliveryInfoByUserAddress = () =>
  createSelector(
    selectShoppingPageDomain,
    (state) => state.deliveryInfoByUserAddress
  );

export default makeSelectShoppingPluginContainer;
export {
  makeSelectDeliveryInfoByUserAddress,
  makeSelectUserOrders,
  makeSelectCountOfUserOrders,
  makeSelectUserOrder,
  selectShoppingPageDomain,
  makeSelectOrders,
  makeSelectOrderInfo,
  makeSelectAuthorization,
  makeSelectDiscountError,
  makeSelectCategoriesDeals,
  makeSelectRecommendedDeals,
};
