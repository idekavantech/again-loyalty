import {
  ONLINE_SUPPORT_PLUGIN,
  CASH_BACK_PLUGIN,
  POS_PLUGIN,
  BASE_PLUGIN,
  CRM_PLUGIN,
} from "@saas/utils/constants/plugins";
const DARAMAD = {
  [CASH_BACK_PLUGIN]: [],
  [ONLINE_SUPPORT_PLUGIN]: [],
  [BASE_PLUGIN]: [],
  [POS_PLUGIN]: [
    // {
    //   text: "Sales Channels",
    //   subLinks: [],
    //   url: `saleschannel`,
    //   icon: "AppsIcon",
    //   needsShoppingSupport: false,
    //   priority: -1,
    // },
    // {
    //   text: "Devices",
    //   url: `${POS_PLUGIN_URL}`,
    //   icon: "TabletMacIcon",
    //   exact: true,
    //   priority: -1,
    // },
    // {
    //   text: "My shorts",
    //   subLinks: [],
    //   url: `supermenu`,
    //   icon: "PostAddRoundedIcon",
    //   needsShoppingSupport: false,
    //   priority: -1,
    // },
    // {
    //   text: "Original information",
    //   subLinks: [],
    //   url: "setting",
    //   icon: "BusinessCenterIcon",
    //   exact: true,
    //   priority: -1,
    // },
  ],
  [CRM_PLUGIN]: [
    // {
    //   text: "Sales increase system",
    //   isSubLinksOpen: false,
    //   subLinks: [
    //     {
    //       text: "Marketing automation",
    //       subLinks: [],
    //       url: `crm/automation`,
    //     },
    //     {
    //       text: "Automatic process",
    //       subLinks: [],
    //       url: `crm/automated_processes`,
    //     },
    //     {
    //       text: "Labels",
    //       subLinks: [],
    //       url: `crm/labels`,
    //     },
    //     {
    //       text: "Customer levels",
    //       subLinks: [],
    //       url: `crm/customer_levels`,
    //     },
    //     {
    //       text: "Customer segmentation",
    //       subLinks: [],
    //       url: `crm/segments`,
    //     },
    //     {
    //       text: "Survey",
    //       subLinks: [],
    //       url: `crm/survey`,
    //     },
    //     {
    //       text: "Club customer list",
    //       subLinks: [],
    //       url: `crm/customers`,
    //     },
    //     {
    //       text: "Customer Club Report",
    //       subLinks: [],
    //       url: `crm/customer_reports`,
    //     },
    //     {
    //       text: "discount code",
    //       subLinks: [],
    //       url: `crm/customer_discount`,
    //     },
    //   ],
    //   url: "",
    //   icon: "TrendingUpRoundedIcon",
    //   priority: -1,
    // },
  ],
};
export default DARAMAD;
