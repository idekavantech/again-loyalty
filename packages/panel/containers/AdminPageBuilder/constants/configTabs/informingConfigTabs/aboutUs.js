import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_ABOUT_US } from "@saas/utils/constants/sections";

const aboutUs = [
  // درباره ما
  {
    ...sectionsConfigTabsRepeatedParts["customization"],
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value: sectionsLayout[SECTION_ABOUT_US][0].value,
            options: sectionsLayout[SECTION_ABOUT_US],
          },
        ],
      },
    ],
  },
];

export default aboutUs;
