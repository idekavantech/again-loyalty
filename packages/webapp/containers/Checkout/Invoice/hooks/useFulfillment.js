import { FULFILLMENT_ON_USER_SITE } from "@saas/plugins/Shopping/constants";
import {
  fulfillmentTypeConstants,
  fulfillmentComponents,
  fulfillmentTitleDictionary,
} from "containers/Checkout/Invoice/constants";

export const useFulfillment = (orderInfo) => {
  const fulfillmentType = orderInfo?.delivery_site_type;
  const isOnUserSiteFulfillmentTypeSelected =
    fulfillmentType?.toUpperCase() === FULFILLMENT_ON_USER_SITE;
  const fulfillmentKey =
    fulfillmentType && fulfillmentTypeConstants[fulfillmentType?.toUpperCase()];
  const FulfillmentComponent =
    fulfillmentKey && fulfillmentComponents[fulfillmentKey];
  const fulfillmentTitle =
    fulfillmentKey && fulfillmentTitleDictionary[fulfillmentKey];
  return {
    fulfillmentType,
    isOnUserSiteFulfillmentTypeSelected,
    FulfillmentComponent,
    fulfillmentTitle,
  };
};
