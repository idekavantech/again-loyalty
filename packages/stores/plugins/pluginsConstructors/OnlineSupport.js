import Plugin from "./Plugin";
import { ONLINE_SUPPORT_PLUGIN_MAIN_COMPONENT } from "../constants";
import { ONLINE_SUPPORT_PLUGIN } from "@saas/utils/constants/plugins";

import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  VITRIN_WEBAPP_CONSTANT,
} from "@saas/utils/constants";
export default class OnlineSupport extends Plugin {
  constructor(data, business, incomingUrl, incomingHost) {
    super(data, business, incomingUrl, incomingHost);
    this.name = ONLINE_SUPPORT_PLUGIN;
    this.price = 200000;
  }
}
