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
    //   text: "کانال‌های فروش",
    //   subLinks: [],
    //   url: `saleschannel`,
    //   icon: "AppsIcon",
    //   needsShoppingSupport: false,
    //   priority: -1,
    // },
    // {
    //   text: "دستگاه‌ها",
    //   url: `${POS_PLUGIN_URL}`,
    //   icon: "TabletMacIcon",
    //   exact: true,
    //   priority: -1,
    // },
    // {
    //   text: "شورتکات منو",
    //   subLinks: [],
    //   url: `supermenu`,
    //   icon: "PostAddRoundedIcon",
    //   needsShoppingSupport: false,
    //   priority: -1,
    // },
    // {
    //   text: "اطلاعات اصلی",
    //   subLinks: [],
    //   url: "setting",
    //   icon: "BusinessCenterIcon",
    //   exact: true,
    //   priority: -1,
    // },
  ],
  [CRM_PLUGIN]: [
    // {
    //   text: "سیستم افزایش فروش",
    //   isSubLinksOpen: false,
    //   subLinks: [
    //     {
    //       text: "اتوماسیون مارکتینگ",
    //       subLinks: [],
    //       url: `crm/automation`,
    //     },
    //     {
    //       text: "روند خودکار",
    //       subLinks: [],
    //       url: `crm/automated_processes`,
    //     },
    //     {
    //       text: "برچسب‌ها",
    //       subLinks: [],
    //       url: `crm/labels`,
    //     },
    //     {
    //       text: "سطوح مشتریان",
    //       subLinks: [],
    //       url: `crm/customer_levels`,
    //     },
    //     {
    //       text: "بخش‌بندی مشتریان ",
    //       subLinks: [],
    //       url: `crm/segments`,
    //     },
    //     {
    //       text: "نظرسنجی",
    //       subLinks: [],
    //       url: `crm/survey`,
    //     },
    //     {
    //       text: "لیست مشتریان باشگاه",
    //       subLinks: [],
    //       url: `crm/customers`,
    //     },
    //     {
    //       text: "گزارش باشگاه مشتریان",
    //       subLinks: [],
    //       url: `crm/customer_reports`,
    //     },
    //     {
    //       text: "کد تخفیف",
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
