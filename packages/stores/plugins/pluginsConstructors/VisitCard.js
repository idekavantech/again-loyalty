import Plugin from "./Plugin";
import {
  DEFAULT_VISIT_CARD_STATS,
  VISIT_CARD_PLUGIN_MAIN_COMPONENT,
} from "../constants";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

import {
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default class VisitCardPlugin extends Plugin {
  constructor(pluginConfig, business, incomingUrl, incomingHost) {
    super(pluginConfig, business, incomingUrl, incomingHost);
    this.name = CRM_PLUGIN;
    this.hasCard = false;
    this.price = 100000;
    this.baseUrl = {
      name: this.name,
      url: `${this.urlPrefix}/visit_card`,
      component: VISIT_CARD_PLUGIN_MAIN_COMPONENT,
    };
    this.adminMenuLinks = [
      {
        text: "سیستم افزایش فروش",
        isSubLinksOpen: false,
        subLinks: [
          {
            text: "اتوماسیون مارکتینگ",
            subLinks: [],
            url: `crm/automation`,
          },
          {
            text: "روند خودکار",
            subLinks: [],
            url: `crm/automated_processes`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "برچسب‌ها",
            subLinks: [],
            url: `crm/labels`,
          },
          {
            text: "سطوح مشتریان",
            subLinks: [],
            url: `crm/customer_levels`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "بخش‌بندی مشتریان ",
            subLinks: [],
            url: `crm/segments`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "نظرسنجی",
            subLinks: [],
            url: `crm/survey`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "لیست مشتریان باشگاه",
            subLinks: [],
            url: `crm/customers`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [
              DOBARE_WEBAPP_CONSTANT,
              DARAMAD_WEBAPP_CONSTANT,
            ],
          },
          {
            text: "گزارش باشگاه مشتریان",
            subLinks: [],
            url: `crm/customer_reports`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "کد تخفیف",
            subLinks: [],
            url: `crm/customer_discount`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
        ],
        url: "",
        icon: "TrendingUpRoundedIcon",
        priority: -1,
      },
    ];
    this.stats = DEFAULT_VISIT_CARD_STATS;
    this.customersCount = 0;
  }
}
