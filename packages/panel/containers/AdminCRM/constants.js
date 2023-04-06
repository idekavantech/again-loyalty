import SurveyIcon from "@saas/icons/surveyIcon";
import LoginIcon from "@saas/icons/loginIcon";
import OrderIcon from "@saas/icons/orderIcon";
import ProfileAccepted from "@saas/icons/profileAcceptedIcon";
// import ProfileAdd from "@saas/icons/profileAdd";
const PROFILE_COMPLETED_AUTOMATED_PROCESS = "profile_completed";
const SUBMIT_SHOPPING_ORDER_AUTOMATED_PROCESS = "shopping_order_accepted_event";
const JOIN_CUSTOMERS_CLUB_AUTOMATED_PROCESS = "gift_from_inviter_link_event";
const SURVEY_PARTICIPATION_AUTOMATED_PROCESS = "survey_participation";
export const AUTOMATED_PROCESSES_TYPES = [
  {
    id: 3,
    title: "To complete the profile",
    type: PROFILE_COMPLETED_AUTOMATED_PROCESS,
    image: (color) => (
      <ProfileAccepted color={color} width="100%" height="100%" />
    ),
  },
  {
    id: 2,
    title: "To register the order",
    type: SUBMIT_SHOPPING_ORDER_AUTOMATED_PROCESS,
    image: (color) => <OrderIcon color={color} width="100%" height="100%" />,
  },
  {
    id: 1,
    title: "To join the club",
    type: JOIN_CUSTOMERS_CLUB_AUTOMATED_PROCESS,
    image: (color) => <LoginIcon color={color} width="100%" height="100%" />,
  },
  {
    id: 0,
    title: "To participate in the survey",
    type: SURVEY_PARTICIPATION_AUTOMATED_PROCESS,
    image: (color) => <SurveyIcon color={color} width="100%" height="100%" />,
  },
  // {
  //   id: 5,
  //   title: "Registration through the introduction",
  //   type: "login_by_refer",
  //   image: (color) => <LoginIcon color={color} width="100%" height="100%" />,
  // },
  // {
  //   id: 4,
  //   title: "Introducing a new customer",
  //   type: "refer_customer",
  //   image: (color) => <ProfileAdd color={color} width="100%" height="100%" />,
  // },
];

export const initialAction = [
  {
    name: "New action",
    segment: "",
    event: "",
    action: {
      type: "point",
      amount: "",
      expiration: "",
    },
    delay: {
      type: "dynamic",
      duration: "days",
      value: 0,
    },
    pid: null,
  },
];

export const SMS = "sms";
export const REWARD = "reward";
export const POINT = "point";
export const CASHBACK = "cashback";
export const DISCOUNT_CODE = "discount-code";
export const CREDIT_EXPIRY_REMINDER = "credit-expiry-reminder";

export const SMS_ACTION = { name: "SMS", type: SMS };
export const REWARD_ACTION = { name: "Reward", type: REWARD };
export const POINT_ACTION = { name: "Point", type: POINT };
export const CASHBACK_ACTION = { name: "Cashback", type: CASHBACK };
export const DISCOUNT_CODE_ACTION = { name: "discount code", type: DISCOUNT_CODE };
export const CREDIT_EXPIRY_REMINDER_ACTION = {
  name: "Credit expiry reminder",
  type: CREDIT_EXPIRY_REMINDER,
};

export const automatedProcessesActionsType = [
  CASHBACK_ACTION,
  SMS_ACTION,
  REWARD_ACTION,
  POINT_ACTION,
  DISCOUNT_CODE_ACTION,
  CREDIT_EXPIRY_REMINDER_ACTION,
];

export const actionTypes = [
  SMS_ACTION,
  REWARD_ACTION,
  POINT_ACTION,
  DISCOUNT_CODE_ACTION,
  CREDIT_EXPIRY_REMINDER_ACTION,
];

export const campaignActionTypes = [
  SMS_ACTION,
  REWARD_ACTION,
  POINT_ACTION,
  DISCOUNT_CODE_ACTION,
  CREDIT_EXPIRY_REMINDER_ACTION,
];

export const automatedProcessesActionTypes = {
  [PROFILE_COMPLETED_AUTOMATED_PROCESS]: [
    SMS_ACTION,
    REWARD_ACTION,
    POINT_ACTION,
    DISCOUNT_CODE_ACTION,
  ],
  [SUBMIT_SHOPPING_ORDER_AUTOMATED_PROCESS]: [
    SMS_ACTION,
    REWARD_ACTION,
    POINT_ACTION,
    CASHBACK_ACTION,
    DISCOUNT_CODE_ACTION,
  ],
  [JOIN_CUSTOMERS_CLUB_AUTOMATED_PROCESS]: [
    SMS_ACTION,
    REWARD_ACTION,
    POINT_ACTION,
    DISCOUNT_CODE_ACTION,
  ],
  [SURVEY_PARTICIPATION_AUTOMATED_PROCESS]: [
    SMS_ACTION,
    REWARD_ACTION,
    POINT_ACTION,
    DISCOUNT_CODE_ACTION,
  ],
};

export const actionDelayTypes = [
  { name: "Minutes", type: "minute", factor: 1 },
  { name: "Hour", type: "hour", factor: 60 },
  { name: "Day", type: "day", factor: 60 * 24 },
];

export const SAVE_MODAL = "SAVE_MODAL";
export const CANCEL_MODAL = "CANCEL_MODAL";

export const deliveryTypesConstants = {
  carry_out: { id: 0, title: "Send to the customer" },
  delivery_on_user_site: { id: 1, title: "delivery at your location" },
  delivery_on_business_site: { id: 2, title: "Mill in the place" },
  delivery_on_car: { id: 3, title: "Delivery in the car" },
};
export const discountCodeValue = [
  {
    name: "Percent",
    type: "percent",
    placeHolder: "Entering a percentage",
    query: "discount_percent",
  },
  {
    name: "$",
    type: "price",
    placeHolder: "Enter the amount",
    query: "discount_price",
  },
];
export const PERCENT = "percent";
export const PRICE = "price";

export const BUSINESS_TITLE_KEYWORD = {
  name: "Business title",
  value: "BUSINESS_TITLE",
};

export const MEMBERSHIP_NAME_KEYWORD = {
  name: "Customer Name",
  value: "MEMBERSHIP_NAME",
};

export const AMOUNT_KEYWORD = {
  name: "The amount of credit",
  value: "AMOUNT",
};

export const EXPIRY_DATE_KEYWORD = {
  name: "The number of days to the end of credit",
  value: "EXPIRY",
};

export const CREDIT_AMOUNT_KEYWORD = {
  name: "The amount of credit left to expire",
  value: "CREDIT_AMOUNT",
};

export const MEMBERSHIP_TOTAL_GIFT_KEYWORD = {
  name: "Total Customer Gift Credits",
  value: "MEMBERSHIP_TOTAL_GIFT",
};

export const MEMBERSHIP_TOTAL_POINT_KEYWORD = {
  name: "Total Customer Points",
  value: "MEMBERSHIP_TOTAL_POINT",
};

export const DISCOUNT_CODE_KEYWORD = {
  name: "discount code",
  value: "DISCOUNT_CODE",
};

export const DISCOUNT_PERCENT_KEYWORD = {
  name: "discount percent",
  value: "DISCOUNT_PERCENT",
};

export const DISCOUNT_CEILING_KEYWORD = {
  name: "Maximum discount rate",
  value: "DISCOUNT_CEILING",
};

export const DISCOUNT_FLOOR_KEYWORD = {
  name: "Minimum purchase",
  value: "DISCOUNT_FLOOR",
};
