/* eslint-disable no-restricted-syntax */

import {
  PERSONAL_SITE_DOMAIN_PLUGIN,
  CRM_PLUGIN,
  PWA_PLUGIN,
  LANDING_PLUGIN,
  SHOPPING_PLUGIN,
  BRANCHES_PLUGIN,
  ONLINE_SUPPORT_PLUGIN,
  WHITE_LABEL_PLUGIN,
  ONLINE_MENU_PLUGIN,
  BASE_PLUGIN,
  POS_PLUGIN,
  CASH_BACK_PLUGIN,
} from "@saas/utils/constants/plugins";
import PersonalSiteDomainPlugin from "./pluginsConstructors/PersonalSiteDomain";
import VisitCardPlugin from "./pluginsConstructors/VisitCard";
import PwaPlugin from "./pluginsConstructors/Pwa";
import LandingPlugin from "./pluginsConstructors/Landing";
import ShoppingPlugin from "./pluginsConstructors/Shopping";
import BranchesPlugin from "./pluginsConstructors/Branches";
import OnlineSupport from "./pluginsConstructors/OnlineSupport";
import WhiteLabel from "./pluginsConstructors/WhiteLabel";
import OnlineMenu from "./pluginsConstructors/OnlineMenu";
import BasePlugin from "./pluginsConstructors/Base";
import POSPlugin from "../plugins/pluginsConstructors/POS";
import CashBackPlugin from "../plugins/pluginsConstructors/CashBack";

export function pluginsSerializer(
  business,
  incomingUrl,
  incomingHost,
  userInfo
) {
  return {
    [LANDING_PLUGIN]: new LandingPlugin(
      business.theme_config || {},
      business,
      incomingUrl,
      incomingHost
    ),

    [PERSONAL_SITE_DOMAIN_PLUGIN]: new PersonalSiteDomainPlugin(
      business.plugins_config[PERSONAL_SITE_DOMAIN_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost
    ),
    [SHOPPING_PLUGIN]: new ShoppingPlugin(
      business.plugins_config[SHOPPING_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost,
      userInfo
    ),
    [CRM_PLUGIN]: new VisitCardPlugin(
      business.plugins_config[CRM_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost
    ),
    [PWA_PLUGIN]: new PwaPlugin(
      business.plugins_config[PWA_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost
    ),
    [BRANCHES_PLUGIN]: new BranchesPlugin(
      business.plugins_config[BRANCHES_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost,
      userInfo
    ),
    [ONLINE_SUPPORT_PLUGIN]: new OnlineSupport(
      business.plugins_config[ONLINE_SUPPORT_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost
    ),
    [WHITE_LABEL_PLUGIN]: new WhiteLabel(
      business.plugins_config[WHITE_LABEL_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost
    ),
    [ONLINE_MENU_PLUGIN]: new OnlineMenu(
      business.plugins_config[ONLINE_MENU_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost
    ),
    [BASE_PLUGIN]: new BasePlugin(
      business.plugins_config[BASE_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost
    ),
    [POS_PLUGIN]: new POSPlugin(
      business.plugins_config[POS_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost,
      userInfo
    ),
    [CASH_BACK_PLUGIN]: new CashBackPlugin(
      business.plugins_config[CASH_BACK_PLUGIN] || {},
      business,
      incomingUrl,
      incomingHost,
      userInfo
    ),
  };
}
