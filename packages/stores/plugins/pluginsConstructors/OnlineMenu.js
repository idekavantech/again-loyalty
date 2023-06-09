import Plugin from "./Plugin";
import { ONLINE_MENU_PLUGIN_MENU_PAGE } from "../constants";
import { ONLINE_MENU_PLUGIN } from "@saas/utils/constants/plugins";

import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { SECTION_MENU } from "@saas/utils/constants/sections";

const defaultPages = (business) => {
  const sections_skeleton = [
    {
      id: uniqueid(),
      name: SECTION_MENU,
      is_active: true,
      content: {
        categories: {
          items: [],
        },
      },
      customization: {
        colors: {
          header_background_color: "#868f87",
          body_background_color: "#162841",
        },
        layout: {
          type: "type_1",
        },
      },
    },
  ];

  return {
    [ONLINE_MENU_PLUGIN_MENU_PAGE]: {
      id: ONLINE_MENU_PLUGIN_MENU_PAGE,
      plugin: ONLINE_MENU_PLUGIN,
      isStatic: true,
      data: {
        name: "Online menu",
        slug: "menu",
        previewLink: "/menu",
        seo_title: `Online shopping with the highest% Discounts from${business.revised_title}`,
        meta_description: `Online shopping from${business.revised_title} With the most% Discount`,
        sections_skeleton,
      },
    },
  };
};
export default class OnlineMenu extends Plugin {
  constructor(pluginConfig, business, incomingUrl, incomingHost) {
    super(pluginConfig, business, incomingUrl, incomingHost);
    this.name = ONLINE_MENU_PLUGIN;
    this.pages = {
      [ONLINE_MENU_PLUGIN_MENU_PAGE]:
        (pluginConfig.data &&
          pluginConfig.data.pages &&
          pluginConfig.data.pages[ONLINE_MENU_PLUGIN_MENU_PAGE]) ||
        defaultPages(business)[ONLINE_MENU_PLUGIN_MENU_PAGE],
    };
    this.pagesLabel = "Edit the online menu";
  }
}
