import { VITRIN_TOKEN } from "@saas/utils/constants";
import Cookies from "js-cookie";

import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { getPluginOrders } from "./actions";
import {
  MENU_CALL_ACTION,
  MENU_LOGIN_ACTION,
  MENU_LOGOUT_ACTION,
  SHOPPING_PLUGIN_GET_ORDERS_ACTION,
} from "./constants";
import router from "next/router";
import axios from "axios";
import { callPhoneNumber } from "@saas/utils/helpers/callPhoneNumber";

export const PLUGIN_ACTIONS = {
  [SHOPPING_PLUGIN_GET_ORDERS_ACTION]: () =>
    getPluginOrders({ plugin: SHOPPING_PLUGIN, status: 40 }),

  [MENU_CALL_ACTION]: ({ business }) => {
    callPhoneNumber(business.phone_zero_starts);
  },
  [MENU_LOGOUT_ACTION]: () => {
    delete axios.defaults.headers.common.Authorization;
    window.location = "/";
    localStorage.removeItem(VITRIN_TOKEN);
    Cookies.remove(VITRIN_TOKEN);
  },
  [MENU_LOGIN_ACTION]: ({ urlPrefix }) => {
    router.push(`${urlPrefix}/login?url=${router.asPath}`);
  },
};
