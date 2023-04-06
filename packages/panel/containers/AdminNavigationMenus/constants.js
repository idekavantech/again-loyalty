import { uniqueid } from "@saas/utils/helpers/uniqueid";

export const MAIN_HEADER_NAVIGATION_MENU = "MAIN_HEADER_NAVIGATION_MENU";
export const MAIN_FOOTER_NAVIGATION_MENU = "MAIN_FOOTER_NAVIGATION_MENU";
export const TOP_PAGE_HEADER_MENU = "TOP_PAGE_HEADER_MENU";
export const defaultNavigationMenus = (urlPrefix) => ({
  [MAIN_HEADER_NAVIGATION_MENU]: {
    id: 1,
    name: "منوی اصلی سایت (هدر)",
    links: [
      {
        id: uniqueid(),
        title: "خانه",
        link: `${urlPrefix}/`,
      },
      {
        id: uniqueid(),
        title: "سفارش آنلاین",
        link: `${urlPrefix}/s`,
      },
    ],
  },
  [MAIN_FOOTER_NAVIGATION_MENU]: {
    id: 2,
    name: "منوی فوتر",
    links: [],
  },
  [TOP_PAGE_HEADER_MENU]: {
    id: 3,
    name: "منوی هدر بالای صفحه",
    links: [],
  },
});
