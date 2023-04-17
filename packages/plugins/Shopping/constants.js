/*
 *
 * ShoppingPage constants
 *
 */
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

// Cart
export const ADD_ORDER_ITEM_TO_CART = "app/ShoppingPage/ADD_ORDER_ITEM_TO_CART";
export const INCREMENT_ORDER_ITEM_BY_ORDER_ID =
  "app/ShoppingPage/INCREMENT_ORDER_ITEM_BY_ORDER_ID";
export const DECREMENT_ORDER_ITEM_BY_ORDER_ID =
  "app/ShoppingPage/DECREMENT_ORDER_ITEM_BY_ORDER_ID";
export const DECREMENT_ORDER_ITEM = "app/ShoppingPage/DECREMENT_ORDER_ITEM";
export const UPDATE_ORDER_ITEM = "app/ShoppingPage/UPDATE_ORDER_ITEM";
export const EMPTY_CART = "app/ShoppingPage/EMPTY_CART";
export const UPDATE_MULTI_ORDERS_ITEMS =
  "app/ShoppingPage/UPDATE_MULTI_ORDERS_ITEMS";
export const DELETE_ORDER_ITEM = "app/ShoppingPage/DELETE_ORDER_ITEM";

// Discount
export const SET_DISCOUNT_ERROR = "app/ShoppingPage/SET_DISCOUNT_ERROR";

// Orders
export const SUBMIT_ORDER_END_USER = "app/ShoppingPage/SUBMIT_ORDER_END_USER";
export const SUBMIT_ORDER_ADMIN = "app/ShoppingPage/SUBMIT_ORDER_ADMIN";

export const PATCH_ORDER = "app/ShoppingPage/PATCH_ORDER";
export const ORDER_SUBMITTED = "app/ShoppingPage/ORDER_SUBMITTED";
export const GET_ORDER = "app/ShoppingPage/GET_ORDER";
export const SET_ORDER = "app/ShoppingPage/SET_ORDER";
export const GET_USER_ORDERS = "app/ShoppingPage/GET_USER_ORDERS";
export const SET_USER_ORDERS = "app/ShoppingPage/SET_USER_ORDERS";
export const SET_DELIVERY_INTERVAL = "app/ShoppingPage/SET_DELIVERY_INTERVAL";
export const UPDATE_ORDER = "app/ShoppingPage/UPDATE_ORDER";
export const UPDATE_ORDER_BY_SITE_DOMAIN =
  "app/ShoppingPage/UPDATE_ORDER_BY_SITE_DOMAIN";
export const GET_SHOPPING_ORDER_INVOICE =
  "app/ShoppingPage/GET_SHOPPING_ORDER_INVOICE";

export const APP_SHOPPINGPAGE_PRODUCT_MODAL = "APP_SHOPPINGPAGE_PRODUCT_MODAL";
export const APP_SHOPPINGPAGE_SEARCH_MODAL = "APP_SHOPPINGPAGE_SEARCH_MODAL";
export const APP_SHOPPINGPAGE_MODIFIERS_MODAL =
  "APP_SHOPPINGPAGE_MODIFIERS_MODAL";
export const APP_SHOPPINGPAGE_FILTER_MODAL = "APP_SHOPPINGPAGE_FILTER_MODAL";
export const CHARGE_WALLET_MODAL = "CHARGE_WALLET_MODAL";

export const REMINDING = -1;
export const NEW_ORDER_STATUS_CART = 0;
export const NEW_ORDER_STATUS_OPEN_TAB = 10;
export const NEW_ORDER_STATUS_VOID = 20;
export const NEW_ORDER_STATUS_COMP = 30;
export const NEW_ORDER_STATUS_NEW = 40;
export const NEW_ORDER_STATUS_ACCEPTED = 50;
export const NEW_ORDER_STATUS_READY_TO_DELIVER = 60;
export const NEW_ORDER_STATUS_COURIER_ASSIGNED = 70;
export const NEW_ORDER_STATUS_COURIER_PICKED_UP = 80;
export const NEW_ORDER_STATUS_DELIVERED = 90;
export const NEW_ORDER_STATUS_COMPLETED = 100;

export const orderStatus = {
  [NEW_ORDER_STATUS_CART]: {
    label: "Pending",
    progress: "0%",
    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
    backgroundColor:
      "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
  },
  [NEW_ORDER_STATUS_OPEN_TAB]: {
    label: "Open",
    progress: "0%",
    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
    backgroundColor:
      "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
  },
  [NEW_ORDER_STATUS_VOID]: {
    label: "Cancelled by returning to Anbar",
    progress: "50%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COMP]: {
    label: "Cancellation without returning to the warehouse",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_NEW]: {
    label: "New",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_ACCEPTED]: {
    label: "Accepted",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_READY_TO_DELIVER]: {
    label: "Ready to send",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COURIER_ASSIGNED]: {
    label: "Packaged",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COURIER_PICKED_UP]: {
    label: "Courier delivery",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_DELIVERED]: {
    label: "Posted",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COMPLETED]: {
    label: "Closed",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
};

export const messageText = {
  [NEW_ORDER_STATUS_CART]: {
    label: "Your order is being reviewed..",
    progress: "0%",
    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
    backgroundColor:
      "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
  },
  [NEW_ORDER_STATUS_OPEN_TAB]: {
    label: "Your order is in the open fever.",
    progress: "0%",
    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
    backgroundColor:
      "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
  },
  [NEW_ORDER_STATUS_VOID]: {
    label: "Your order has been canceled and has been refunded to the warehouse.",
    progress: "50%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COMP]: {
    label: "Your order has been canceled.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_NEW]: {
    label: "Your order is in the new mode.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_ACCEPTED]: {
    label: "Your order has been approved..",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_READY_TO_DELIVER]: {
    label: "Your order is ready to send.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COURIER_ASSIGNED]: {
    label: "The courier has been assigned to your order.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COURIER_PICKED_UP]: {
    label: "Our order has been delivered to the courier.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_DELIVERED]: {
    label: "Your order has been sent.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COMPLETED]: {
    label: "Your order is in the closed mode.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
};
export const subMessageText = {
  [NEW_ORDER_STATUS_CART]: {
    label: "Your order is being reviewed..",
    progress: "0%",
    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
    backgroundColor:
      "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
  },
  [NEW_ORDER_STATUS_OPEN_TAB]: {
    label: "Your order is in the open fever.",
    progress: "0%",
    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
    backgroundColor:
      "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
  },
  [NEW_ORDER_STATUS_VOID]: {
    label: "Your order has been canceled and has been refunded to the warehouse.",
    progress: "50%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COMP]: {
    label: "Your order has been canceled.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_NEW]: {
    label: "Your order is in the new mode.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_ACCEPTED]: {
    label: "Your order has been approved..",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_READY_TO_DELIVER]: {
    label: "Your order is ready to send.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COURIER_ASSIGNED]: {
    label: "The courier has been assigned to your order.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COURIER_PICKED_UP]: {
    label: "Our order has been delivered to the courier.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_DELIVERED]: {
    label: "Your order has been sent.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COMPLETED]: {
    label: "Your order is in the closed mode.",
    progress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
};
export const icons = {
  [NEW_ORDER_STATUS_CART]: DoneAllRoundedIcon,
  [NEW_ORDER_STATUS_OPEN_TAB]: DoneAllRoundedIcon,
  [NEW_ORDER_STATUS_VOID]: CancelRoundedIcon,
  [NEW_ORDER_STATUS_COMP]: CancelRoundedIcon,
  [NEW_ORDER_STATUS_NEW]: DoneAllRoundedIcon,
  [NEW_ORDER_STATUS_ACCEPTED]: DoneAllRoundedIcon,
  [NEW_ORDER_STATUS_READY_TO_DELIVER]: DoneAllRoundedIcon,
  [NEW_ORDER_STATUS_COURIER_ASSIGNED]: DoneAllRoundedIcon,
  [NEW_ORDER_STATUS_COURIER_PICKED_UP]: DoneAllRoundedIcon,
  [NEW_ORDER_STATUS_DELIVERED]: DoneAllRoundedIcon,
  [NEW_ORDER_STATUS_COMPLETED]: DoneAllRoundedIcon,
};
export const iconColors = {
  [NEW_ORDER_STATUS_CART]: "primary",
  [NEW_ORDER_STATUS_OPEN_TAB]: "primary",
  [NEW_ORDER_STATUS_VOID]: "error",
  [NEW_ORDER_STATUS_COMP]: "error",
  [NEW_ORDER_STATUS_NEW]: "primary",
  [NEW_ORDER_STATUS_ACCEPTED]: "primary",
  [NEW_ORDER_STATUS_READY_TO_DELIVER]: "primary",
  [NEW_ORDER_STATUS_COURIER_ASSIGNED]: "primary",
  [NEW_ORDER_STATUS_COURIER_PICKED_UP]: "primary",
  [NEW_ORDER_STATUS_DELIVERED]: "primary",
  [NEW_ORDER_STATUS_COMPLETED]: "primary",
};

export const FULFILLMENT_ON_BUSINESS_SITE = "DELIVERY_ON_BUSINESS_SITE";
export const FULFILLMENT_ON_USER_SITE = "DELIVERY_ON_USER_SITE";
export const FULFILLMENT_CARRY_OUT = "CARRY_OUT";
export const FULFILLMENT_ON_CAR = "DELIVERY_ON_CAR";
export const FULFILLMENT_ON_WEBSITE = "DELIVERY_ON_WEB_SITE";

export const MAP_DETAIL_ACCURACY_IS_ADDRESS = "address";

export const CLOSING_TYPE_MANUAL = "manual";
export const CLOSING_TYPE_AUTOMATIC = "automatic";
export const CLOSING_TYPE_HOUR = "hour";

export const MINUTE = "minute";
export const HOUR = "hour";
export const DAY = "day";

export const UNIT_ADDRESS_DETAIL_FIELD = "unit";
export const NUMBER_ADDRESS_DETAIL_FIELD = "number";
export const POSTAL_CODE_ADDRESS_DETAIL_FIELD = "postal_code";
export const NATIONAL_ID_ADDRESS_DETAIL_FIELD = "national_id";
export const CITY_ADDRESS_DETAIL_FIELD = "city";

export const addressDetailsRequirementsFieldsLabels = {
  [POSTAL_CODE_ADDRESS_DETAIL_FIELD]: "Postal code",
  [NUMBER_ADDRESS_DETAIL_FIELD]: "Plaque",
  [UNIT_ADDRESS_DETAIL_FIELD]: "One",
  [NATIONAL_ID_ADDRESS_DETAIL_FIELD]: "National Code",
  [CITY_ADDRESS_DETAIL_FIELD]: "City",
};
export const addressDetailsRequirementsFieldsMaximumLength = {
  [POSTAL_CODE_ADDRESS_DETAIL_FIELD]: {
    max: 10,
    textError: "Postcode cannot be more than 2 digits.",
  },
  [NUMBER_ADDRESS_DETAIL_FIELD]: {
    max: 5,
    textError: "The license plate number cannot be more than 2 digits.",
  },
  [UNIT_ADDRESS_DETAIL_FIELD]: {
    max: 5,
    textError: "The unit number cannot be more than 2 digits.",
  },
  [NATIONAL_ID_ADDRESS_DETAIL_FIELD]: {
    max: 10,
    textError: "Code cannot be more than 2 digits.",
  },
  [CITY_ADDRESS_DETAIL_FIELD]: {
    max: 10,
    textError: "The city cannot be more than10 Word.",
  },
};
export const addressDetailsRequirementsFieldsClasses = {
  [POSTAL_CODE_ADDRESS_DETAIL_FIELD]: "col-6 col-md-3",
  [NUMBER_ADDRESS_DETAIL_FIELD]: "col-6 col-md-3",
  [UNIT_ADDRESS_DETAIL_FIELD]: "col-6 col-md-3",
  [NATIONAL_ID_ADDRESS_DETAIL_FIELD]: "col-6 col-md-3",
  [CITY_ADDRESS_DETAIL_FIELD]: "col-6 col-md-3",
};
export const defaultAddressDetailsRequirements = [
  POSTAL_CODE_ADDRESS_DETAIL_FIELD,
  NUMBER_ADDRESS_DETAIL_FIELD,
  UNIT_ADDRESS_DETAIL_FIELD,
  NATIONAL_ID_ADDRESS_DETAIL_FIELD,
  CITY_ADDRESS_DETAIL_FIELD,
];

export const DISCOUNT_CODE = "discountCode";
export const WALLET_CREDIT = "wallet";
export const GIFT_CREDIT = "gift";

export const PRE_ORDER_NORMAL = "normal";
export const PRE_ORDER_DELAYED = "delayed";
export const PRE_ORDER_ACTIVE = "active";
export const PRE_ORDER_INACTIVE = "inactive";

export const DELIVERY_TYPE_FAST = "fast";
export const DELIVERY_TYPE_CUSTOM = "custom";
export const DELIVERY_TYPE_SCHEDULED = "scheduled";

export const deliveryTypePersianNames = {
  [DELIVERY_TYPE_FAST]: "Fast",
  [DELIVERY_TYPE_CUSTOM]: "Manual",
  [DELIVERY_TYPE_SCHEDULED]: "Scheduled",
};

export const timesTypes = {
  [MINUTE]: "Minutes",
  [HOUR]: "the watch",
  [DAY]: "Day",
};

export const PRICING_RATE_BY_WEIGHT = "rate_by_weight";
export const PRICING_RATE_BY_PRICE = "rate_by_price";
export const PRICING_RATE_FREE = "free";
export const PRICING_RATE_FIXED = "fixed_price";

export const ORDERING_POPUP_DEFAULT_TEXT = (
  nextDay
) => `We are currently out of work hours. Start Receive the order from
${englishNumberToPersianNumber(nextDay?.dayName)} the watch
${englishNumberToPersianNumber(nextDay?.openingTime)}`;

export const DELIVERY_PREORDER_ALERT_DEFAULT_TEXT = `We are now updating our site and the possibility of receiving an order
We have no new.`;

export const NO_CONDITION_POP_UP = "NO_CONDITION_POP_UP";
export const DEFAULT_POPUP = "DEFAULT_POPUP";
export const NO_POP_UP = "NO_POP_UP";

export const DEFAULT_POP_UP_TEXT_METHOD = "DEFAULT_POP_UP_TEXT_METHOD";
export const CUSTOM_POP_UP_TEXT_METHOD = "CUSTOM_POP_UP_TEXT_METHOD";
export const NONE_POP_UP_TEXT_METHOD = "NONE_POP_UP_TEXT_METHOD";

export const CUSTOM_DELIVERY_PREORDER_ALERT_TEXT_METHOD =
  "CUSTOM_DELIVERY_PREORDER_ALERT_TEXT_METHOD";
export const NONE_DELIVERY_PREORDER_ALERT_TEXT_METHOD =
  "NONE_DELIVERY_PREORDER_ALERT_TEXT_METHOD";

export const IN_THE_WORKING_HOURS = "IN_THE_WORKING_HOURS";
export const OUT_OF_THE_WORKING_HOURS = "OUT_OF_THE_WORKING_HOURS";

export const SELECT_ADDRESS_DRAWER = "SELECT_ADDRESS_DRAWER";
export const SELECT_DELIVERY_TYPE_DRAWER = "SELECT_DELIVERY_TYPE_DRAWER";
export const SELECT_ADDRESS_DROPDOWN = "SELECT_ADDRESS_DROPDOWN";
export const DELETE_ADDRESS_MODAL = "DELETE_ADDRESS_MODAL";

export const GET_CATEGORY_DEALS = "GET_CATEGORY_DEALS";
export const SET_CATEGORY_DEALS = "SET_CATEGORY_DEALS";

export const GET_RECOMMENDED_DEALS = "GET_RECOMMENDED_DEALS";
export const SET_RECOMMENDED_DEALS = "SET_RECOMMENDED_DEALS";

export const GET_BUSINESS_TOP_SELLING_DEALS = "GET_BUSINESS_TOP_SELLING_DEALS";
export const SET_BUSINESS_TOP_SELLING_DEALS = "SET_BUSINESS_TOP_SELLING_DEALS";

export const PRODUCT_TYPE_MODAL = "PRODUCT_TYPE_MODAL";
export const VARIATION_TYPE_MODAL = "VARIATION_TYPE_MODAL";
export const MODIFIERS_TYPE_MODAL = "MODIFIERS_TYPE_MODAL";
// localstorages constants
export const ORDER_SUBMITTER_STORAGE = "order_submitted";
export const SHOPPING_ORDER_INVOICE_DTO = "shoppingOrderInvoieDTO";

// Business Timing
export const NEXT_PERIOD = "NEXT_PERIOD";
export const RIGHT_NOW_PERIOD = "RIGHT_NOW_PERIOD";
export const NEXT_DAY = "NEXT_DAY";

//Delivery Company Type
export const MIARE = "miare";
export const ALO_PEYK = "alopeyk";
export const PERSONAL_PEYK = "self";
export const ALL_PEYK = "all";

export const GET_DELIVERY_INFO_BY_USER_ADDRESS =
  "panel/GET_DELIVERY_INFO_BY_USER_ADDRESS";
export const SET_DELIVERY_INFO_BY_USER_ADDRESS =
  "panel/SET_DELIVERY_INFO_BY_USER_ADDRESS";

//session storage

export const TABLE_NUMBER_SESSION_STORAGE = "tableNumber";
