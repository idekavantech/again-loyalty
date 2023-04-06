import { DEFAULT_THEME_COLOR, FONT_1 } from "../themeConfig/constants";
import { correctWorkHoursFormat } from "./correctWorkHoursFormat";

export const businessSerializer = (_business) => {
  if (_business) {
    return {
      ..._business,
      posts: [],
      theme_config: {
        ..._business.theme_config,
        header: _business.theme_config.header || "transparent",
        font: _business.theme_config.font || FONT_1,
        theme_color: _business.theme_config.theme_color || DEFAULT_THEME_COLOR,
      },
      work_hours: correctWorkHoursFormat(_business.working_hours),
    };
  }
};
