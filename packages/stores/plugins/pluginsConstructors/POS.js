import Plugin from "./Plugin";
import { POS_PLUGIN, POS_PLUGIN_URL } from "@saas/utils/constants/plugins";
import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
} from "@saas/utils/constants";
export default class POSPlugin extends Plugin {
  constructor(pluginConfig, business, incomingUrl, incomingHost, userInfo) {
    super(pluginConfig, business, incomingUrl, incomingHost, userInfo);
    this.name = POS_PLUGIN;

    this.adminMenuLinks = [
      {
        text: "دستگاه‌ها",
        url: `${POS_PLUGIN_URL}`,
        icon: "TabletMacIcon",
        priority: -1,
        exact: true,
        [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
      },
      {
        text: "شورتکات منو",
        subLinks: [],
        url: `supermenu`,
        icon: "PostAddRoundedIcon",
        needsShoppingSupport: false,
        [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
        priority: 2,
      },
    ];

    this.adminReportLinks = [
      {
        text: "گزارش صندوق‌ها",
        url: `${POS_PLUGIN_URL}/analytics/cash_drawers`,
        blank: true,
        [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
      },
    ];
    this.plugin_url = POS_PLUGIN_URL;
  }
}
