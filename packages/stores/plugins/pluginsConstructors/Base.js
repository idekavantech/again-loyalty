import Plugin from "./Plugin";
import { PLUGIN_ACTIVE_STATUS, PLUGIN_TRIAL_STATUS } from "../constants";

import { BASE_PLUGIN } from "@saas/utils/constants/plugins";
import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  DARAMAD_WEBAPP_CONSTANT,
} from "@saas/utils/constants";
export default class BasePlugin extends Plugin {
  constructor(pluginConfig, data, business, incomingUrl, incomingHost) {
    super(pluginConfig, data, business, incomingUrl, incomingHost);
    const { status = PLUGIN_TRIAL_STATUS } = pluginConfig || {};
    this.status = status;
    this.isActive =
      status === PLUGIN_TRIAL_STATUS || status === PLUGIN_ACTIVE_STATUS;
    this.name = BASE_PLUGIN;
    this.salesChannels = pluginConfig?.sales_channels;
    this.adminMenuLinks = [
      {
        text: "Sales Channels",
        subLinks: [],
        url: `saleschannel`,
        icon: "AppsIcon",
        needsShoppingSupport: false,
        [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
        priority: -2,
      },
    ];
  }
}
