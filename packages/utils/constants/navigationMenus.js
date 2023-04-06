import { uniqueid } from "../helpers/uniqueid";

export const MAIN_HEADER_NAVIGATION_MENU = "MAIN_HEADER_NAVIGATION_MENU";
export const MAIN_FOOTER_NAVIGATION_MENU = "MAIN_FOOTER_NAVIGATION_MENU";
export const TOP_PAGE_HEADER_MENU = "TOP_PAGE_HEADER_MENU";
export const defaultNavigationMenus = (urlPrefix) => ({
  [MAIN_HEADER_NAVIGATION_MENU]: {
    id: 1,
    name: "The main menu of the site(Waste)",
    links: [
      {
        id: uniqueid(),
        title: "Home",
        link: `${urlPrefix}/`,
      },
      {
        id: uniqueid(),
        title: "online order",
        link: `${urlPrefix}/s`,
      },
    ],
  },
  [MAIN_FOOTER_NAVIGATION_MENU]: {
    id: 2,
    name: "Footer menu",
    links: [],
  },
  [TOP_PAGE_HEADER_MENU]: {
    id: 3,
    name: "The header menu above the screen",
    links: [],
  },
});
