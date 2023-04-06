import headerConstants from "@saas/utils/constants/headerConstants";
import footerConstants from "@saas/utils/constants/footerConstants";
import navigationBarConstant from "@saas/utils/constants/navigationBarConstant";
import topPageHeaderConstant from "@saas/utils/constants/topPageHeaderConstant";
import { NORMAL_PAGE_TYPE } from "@saas/builder/SectionRenderer/constants";
import informingConfigTabs from "./informingConfigTabs";
import makeYourSitePrettyConfigTabs from "./makeYourSitePrettyConfigTabs";
import communicationConfigTabs from "./communicationConfigTabs";
import multiBranchingConfigTabs from "./multiBranchingConfigTabs";
import multiMediaConfigTabs from "./multiMediaConfigTabs";
import orderOnlineConfigTabs from "./orderOnlineConfigTabs";
import onlineMenuConfigTabs from "./onlineMenuConfigTabs";
import productPageConfigTabs from "./productPageConfigTabs";
import sellMoreConfigTabs from "./sellMoreConfigTabs";

export const sectionsConfigTabs = {
  [NORMAL_PAGE_TYPE]: {
    footer: footerConstants,
    header: headerConstants,
    navigationBar: navigationBarConstant,
    topPageHeader: topPageHeaderConstant,
    ...makeYourSitePrettyConfigTabs,
    ...informingConfigTabs,
    ...communicationConfigTabs,
    ...multiBranchingConfigTabs,
    ...multiMediaConfigTabs,
    ...orderOnlineConfigTabs,
    ...onlineMenuConfigTabs,
    ...productPageConfigTabs,
    ...sellMoreConfigTabs,
  },
};
