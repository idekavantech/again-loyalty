import {
  FULFILLMENT_CARRY_OUT,
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_CAR,
  FULFILLMENT_ON_USER_SITE,
  FULFILLMENT_ON_WEBSITE,
} from "@saas/plugins/Shopping/constants";
import ReceivingInformation from "containers/Checkout/Invoice/containers/NotDeliveryType/components/ReceivingInformation";
import VirtualReception from "containers/Checkout/Invoice/containers/NotDeliveryType/components/VirtualReception";

export const fulfillmentTypeOptions = {
  [FULFILLMENT_ON_BUSINESS_SITE]: "سرو در :‌",
  [FULFILLMENT_CARRY_OUT]: "دریافت از :‌",
  [FULFILLMENT_ON_CAR]: "دریافت در ماشین خود از‌:",
};

export const carTagIran = "/images/carTagIran.png";
export const carTagFlag = "/images/cartagflag.png";
export const alphabets = [
  "الف",
  "ب",
  "پ",
  "ت",
  "ث",
  "ج",
  "چ",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "ژ",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ک",
  "گ",
  "ل",
  "م",
  "ن",
  "و",
  "ه",
  "ی",
];

const RECEIVING_INFORMATION_COMPONENT = "RECEIVING_INFORMATION_COMPONENT";
const VIRTUAL_RECEPTION_COMPONENT = "VIRTUAL_RECEPTION_COMPONENT";

export const receivingInformationPart = {
  [FULFILLMENT_ON_BUSINESS_SITE]: RECEIVING_INFORMATION_COMPONENT,
  [FULFILLMENT_ON_USER_SITE]: RECEIVING_INFORMATION_COMPONENT,
  [FULFILLMENT_CARRY_OUT]: RECEIVING_INFORMATION_COMPONENT,
  [FULFILLMENT_ON_CAR]: RECEIVING_INFORMATION_COMPONENT,
  [FULFILLMENT_ON_WEBSITE]: VIRTUAL_RECEPTION_COMPONENT,
};

export const receivingInformationComponent = {
  [RECEIVING_INFORMATION_COMPONENT]: ReceivingInformation,
  [VIRTUAL_RECEPTION_COMPONENT]: VirtualReception,
};
