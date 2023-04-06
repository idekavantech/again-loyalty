import {
  FULFILLMENT_CARRY_OUT,
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_CAR,
  FULFILLMENT_ON_USER_SITE,
  FULFILLMENT_ON_WEBSITE,
  DISCOUNT_CODE,
  GIFT_CREDIT,
} from "@saas/plugins/Shopping/constants";
import {
  CARD_PAYMENT,
  OFFLINE_PAYMENT,
  ONLINE_PAYMENT,
} from "@saas/stores/plugins/constants";
import DeliveryType from "containers/Checkout/Invoice/containers/DeliveryType";
import NotDeliveryType from "containers/Checkout/Invoice/containers/NotDeliveryType";

const DELIVERY_COMPONENTS_TYPE = "DELIVERY_COMPONENTS_TYPE";
const NOT_DELIVERY_COMPONENTS_TYPE = "NOT_DELIVERY_COMPONENTS_TYPE";

export const fulfillmentTypeConstants = {
  [FULFILLMENT_ON_USER_SITE]: DELIVERY_COMPONENTS_TYPE,
  [FULFILLMENT_ON_CAR]: NOT_DELIVERY_COMPONENTS_TYPE,
  [FULFILLMENT_ON_BUSINESS_SITE]: NOT_DELIVERY_COMPONENTS_TYPE,
  [FULFILLMENT_CARRY_OUT]: NOT_DELIVERY_COMPONENTS_TYPE,
  [FULFILLMENT_ON_WEBSITE]: NOT_DELIVERY_COMPONENTS_TYPE,
};
export const fulfillmentComponents = {
  [DELIVERY_COMPONENTS_TYPE]: DeliveryType,
  [NOT_DELIVERY_COMPONENTS_TYPE]: NotDeliveryType,
};

export const paymentMethods = {
  [ONLINE_PAYMENT]: {
    id: 1,
    name: ONLINE_PAYMENT,
    title: "پرداخت اینترنتی",
    description: "پرداخت امن توسط درگاه شاپرک",
    Icon: `/images/credit.svg`,
  },
  [OFFLINE_PAYMENT]: {
    id: 2,
    name: OFFLINE_PAYMENT,
    title: "پرداخت نقدی",
    description: "پرداخت وجه توسط درگاه کارتخوان",
    Icon: `/images/offlinePayment.svg`,
  },
  [CARD_PAYMENT]: {
    id: 3,
    name: CARD_PAYMENT,
    title: "پرداخت کارت به کارت",
    description: "پرداخت وجه توسط شماره کارت",
    Icon: `/images/cardPayment.svg`,
  },
};

export const getDefaultPaymentMethod = (paymentTypes) => {
  if (paymentTypes.includes(ONLINE_PAYMENT))
    return paymentMethods[ONLINE_PAYMENT];
  else if (paymentTypes.includes(CARD_PAYMENT))
    return paymentMethods[CARD_PAYMENT];
  else if (paymentTypes.length === 1) return paymentMethods[paymentTypes[0]];
  else throw new Error("Invalid paymentTypes in getDefaultPaymentMethod");
};
export const discountMethods = {
  [DISCOUNT_CODE]: {
    id: 1,
    name: DISCOUNT_CODE,
    title: "کد تخفیف",
    selectableOptionTitle: "ثبت کد تخفیف",
    selectableOptionDescription: "دریافت تخفیف با ثبت کد",
    Icon: `/images/discount.svg`,
  },
  [GIFT_CREDIT]: {
    id: 2,
    name: GIFT_CREDIT,
    title: "اعتبار هدیه",
    selectableOptionTitle: "استفاده از اعتبار هدیه",
    selectableOptionDescription: "استفاده از اعتبار هدیه",
    Icon: `/images/wallet.svg`,
  },
};
const DISCOUNT_CODE_BUTTON_TEXT = "تغییر به  اعتبار هدیه";
const GIFT_CREDIT_BUTTON_TEXT = "تغییر به کد تخفیف";

export const discountPaymentMethodsSitchButtonText = {
  [DISCOUNT_CODE]: DISCOUNT_CODE_BUTTON_TEXT,
  [GIFT_CREDIT]: GIFT_CREDIT_BUTTON_TEXT,
};

export const fulfillmentTitleDictionary = {
  [DELIVERY_COMPONENTS_TYPE]: "اطلاعات ارسال",
  [NOT_DELIVERY_COMPONENTS_TYPE]: "اطلاعات دریافت",
};
export const reducer = (accumulator, currentValue) =>
  accumulator + currentValue;

export const initialCarObject = {
  firstPartOfTag: null,
  seccondPartOfTag: null,
  cityOfTag: null,
  model: null,
  color: null,
  letterOfTag: "الف",
};
