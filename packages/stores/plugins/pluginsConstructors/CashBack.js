import Plugin from "./Plugin";

import {
  CASH_BACK_PLUGIN,
  CASH_BACK_PLUGIN_URL,
} from "@saas/utils/constants/plugins";

export default class CashBackPlugin extends Plugin {
  constructor(pluginConfig, business, incomingUrl, incomingHost, userInfo) {
    super(pluginConfig, business, incomingUrl, incomingHost, userInfo);
    this.name = CASH_BACK_PLUGIN;
    this.adminMenuLinks = [];
    this.adminReportLinks = [];
    this.plugin_url = CASH_BACK_PLUGIN_URL;
  }
}
