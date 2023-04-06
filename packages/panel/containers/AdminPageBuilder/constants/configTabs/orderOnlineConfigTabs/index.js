import {
  SECTION_ONLINE_PRODUCTS_LIST,
  SECTION_ORDER_ONLINE_HEADER,
} from "@saas/utils/constants/sections";
import onlineProductsList from "./onlineProductsList";
import orderOnlineHeader from "./orderOnlineHeader";

const index = {
  [SECTION_ONLINE_PRODUCTS_LIST]: onlineProductsList,
  [SECTION_ORDER_ONLINE_HEADER]: orderOnlineHeader,
};

export default index;
