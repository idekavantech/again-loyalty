import Plugin from "./Plugin";
import { MENU_LINKS_WIDGET, PWA_PLUGIN_MAIN_COMPONENT } from "../constants";
import { PWA_PLUGIN } from "@saas/utils/constants/plugins";

export default class PwaPlugin extends Plugin {
  constructor(pluginConfig, business, incomingUrl, incomingHost) {
    super(pluginConfig, business, incomingUrl, incomingHost);
    this.name = PWA_PLUGIN;
    this.price = 30000;
    this.widgets[MENU_LINKS_WIDGET] = [
      {
        text: "نصب اپلیکیشن",
        url: `/pwa/download`,
        icon: "AddToHomeScreenIcon",
        id: "pwa",
      },
    ];
    this.baseUrl = {
      name: this.name,
      url: `${this.urlPrefix}/pwa`,
      component: PWA_PLUGIN_MAIN_COMPONENT,
    };
    this.static_internal_links = [
      {
        label: "صفحه: دانلود اپلیکیشن",
        value: `${this.urlPrefix}/pwa/download`,
      },
    ];
  }
}
