/* eslint-disable indent */
import Plugin from "./Plugin";
import { MENU_LINKS_WIDGET } from "../constants";
import {
  BRANCHES_PLUGIN,
  BRANCHES_PLUGIN_URL,
  SHOPPING_PLUGIN,
} from "@saas/utils/constants/plugins";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
export default class BranchesPlugin extends Plugin {
  constructor(pluginConfig, business, incomingUrl, incomingHost, userInfo) {
    super(pluginConfig, business, incomingUrl, incomingHost, userInfo);
    this.name = BRANCHES_PLUGIN;
    this.plugin_url = BRANCHES_PLUGIN_URL;
    this.hasShoppingSupport =
      pluginConfig?.data?.supported_plugins?.includes(SHOPPING_PLUGIN);
    this.adminMenuLinks = [
      {
        text: "Branches list",
        isSubLinksOpen: false,
        url: `${this.adminUrlPrefix}${BRANCHES_PLUGIN}/branches`,
        onClick: () => {},
        icon: "NewBranchesMenuIcon",
      },
    ];
    this.adminReportLinks = [
      {
        text: "Dashboard",
        url: `${BRANCHES_PLUGIN}/analytics/dashboard`,
        blank: true,
      },
      {
        text: "reports",
        url: `${BRANCHES_PLUGIN}/analytics/reports`,
        blank: true,
      },
      {
        text: "Joint wallet",
        url: `${BRANCHES_PLUGIN}/finance/sow`,
        blank: true,
      },
    ];
    this.hasOrdering = pluginConfig?.data?.has_ordering;

    this.widgets[MENU_LINKS_WIDGET] = [];

    if (this.hasOrdering !== false) {
      this.widgets[MENU_LINKS_WIDGET].push({
        text: `Tracking orders`,
        url: `/${BRANCHES_PLUGIN_URL}/orders`,
        icon: "ListAltIcon",
        needsAuth: true,
        subLinks: [],
        iconSize: 24,
      });
    }

    this.hasWalletAndgift = pluginConfig?.data?.has_shared_wallet;

    if (this.hasWalletAndgift && this.hasOrdering !== false) {
      this.widgets[MENU_LINKS_WIDGET].push(
        {
          id: "wallet",
          text: "Charging the wallet",
          query: `wallet_charge`,
          icon: "AccountBalanceWalletIcon",
          needsAuth: true,
          itemsAmount: `${priceFormatter(userInfo?.walletCredit)} Toman`,
        },
        {
          id: "wallet",
          text: "Gift credit",
          url: `/wallet`,
          icon: "CardGiftcardIcon",
          needsAuth: true,
          itemsAmount: `${priceFormatter(userInfo?.giftCredit)} Toman`,
        }
      );
    }
    this.sitemaps = this.branches
      ? this.branches.map(
          (branch) => `/branches/${branch.site_domain}/sitemap.xml`
        )
      : [];
  }
}
