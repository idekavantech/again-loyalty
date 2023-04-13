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
        text: "Sales increase system",
        isSubLinksOpen: false,
        subLinks: [
          {
            text: "Marketing automation",
            subLinks: [],
            url: `crm/automation`,
          },
          {
            text: "Automatic process",
            subLinks: [],
            url: `crm/automated_processes`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "Labels",
            subLinks: [],
            url: `crm/labels`,
          },
          {
            text: "Customer levels",
            subLinks: [],
            url: `crm/customer_levels`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "Customer segmentation",
            subLinks: [],
            url: `crm/segments`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "Survey",
            subLinks: [],
            url: `crm/survey`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "Club customer list",
            subLinks: [],
            url: `crm/customers`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [
              DOBARE_WEBAPP_CONSTANT,
              DARAMAD_WEBAPP_CONSTANT,
            ],
          },
          {
            text: "Customer Club Report",
            subLinks: [],
            url: `crm/customer_reports`,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
          },
          {
            text: "discount code",
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
