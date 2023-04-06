/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import produce from "immer";
import {
  SET_ORDER,
  ORDER_SUBMITTED,
  SET_DISCOUNT_ERROR,
  SET_USER_ORDERS,
  UPDATE_ORDER,
  SET_CATEGORY_DEALS,
  SET_RECOMMENDED_DEALS,
  SET_BUSINESS_TOP_SELLING_DEALS,
  SET_DELIVERY_INFO_BY_USER_ADDRESS,
} from "./constants";
import { SHOPPING_CART_STORAGE } from "@saas/stores/plugins/constants";
export const initialState = {
  orderItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(SHOPPING_CART_STORAGE)) || []
      : [],

  orderInfo: {
    order_id: "",
    delivery_price: "",
    user_address: { name: "", address: "", phone: "" },
    description: "",
    final_price: "",
    total_initial_price: "",
    total_discount: "",
    total_packaging_price: "",
  },
  userOrders: null,
  countOfUserOrders: 0,
  userOrder: null,
  authorization: "",
  discountLoading: false,
  discountError: "",
  categoriesDeals: [],
  recommendedDeals: [],
  businessTopSellingDeals: [],
  deliveryInfoByUserAddress: {},
};

/* eslint-disable default-case, no-param-reassign */
const shoppingPluginContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_ORDER:
        draft.orderItems = action.data;
        break;
      case ORDER_SUBMITTED:
        draft.orderInfo = action.data;
        break;
      case SET_DELIVERY_INFO_BY_USER_ADDRESS:
        draft.deliveryInfoByUserAddress = action.data;
        break;

      case SET_USER_ORDERS:
        draft.userOrders = action.data;
        draft.countOfUserOrders = action.count
        break;


      case SET_ORDER:
        draft.userOrder = action.data
          ? { ...draft.userOrder, ...action.data }
          : null;
        break;


      case SET_DISCOUNT_ERROR:
        draft.discountError = action.data;
        break;
      case SET_CATEGORY_DEALS:
        draft.categoriesDeals = action.data;
        break;
      case SET_RECOMMENDED_DEALS:
        draft.recommendedDeals = action.data;
        break;
      case SET_BUSINESS_TOP_SELLING_DEALS:
        draft.businessTopSellingDeals = action.data;
        break;
    }
  });

export default shoppingPluginContainerReducer;
