import { LANDING_PLUGIN_MAIN_COMPONENT } from "../constants";
import { LANDING_PLUGIN } from "@saas/utils/constants/plugins";
import Plugin from "./Plugin";
const defaultLandingDataInThemeConfig = {
  isActive: true,
  alternative: "",
};
export default class LandingPlugin extends Plugin {
  constructor(data, business, incomingUrl, incomingHost) {
    super(data, business, incomingUrl, incomingHost);
    this.name = LANDING_PLUGIN;
    this.title = "لندینگ";
    this.hasLandingPage = true;
    this.isActive = data.landing
      ? data.landing.isActive
      : defaultLandingDataInThemeConfig.isActive;
    this.alternative = data.landing
      ? data.landing.alternative
      : defaultLandingDataInThemeConfig.alternative;
    this.tabActions = [
      // {
      //   url: '/',
      //   text: 'خانه',
      //   icon: HOME_SMALL,
      // },
    ];
    this.adminTabActions = [
      {
        url: `${this.urlPrefix}/admin`,
        text: "ویرایش ویترین",
        icon: "HomeIcon",
      },
    ];
    this.baseUrl = {
      name: this.name,
      url: `${this.urlPrefix}/`,
      component: LANDING_PLUGIN_MAIN_COMPONENT,
      exact: true,
    };
  }
}
