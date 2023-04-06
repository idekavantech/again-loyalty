import Plugin from "./Plugin";
import { WHITE_LABEL_PLUGIN } from "@saas/utils/constants/plugins";

export default class WhiteLabel extends Plugin {
  constructor(pluginConfig, business, incomingUrl, incomingHost) {
    super(pluginConfig, business, incomingUrl, incomingHost);
    this.name = WHITE_LABEL_PLUGIN;
  }
}
