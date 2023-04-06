import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_ADDRESS_WITH_MAP } from "@saas/utils/constants/sections";

const addressWithMap = [
  // آدرس با نقشه
  {
    ...sectionsConfigTabsRepeatedParts["customization"],
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value: sectionsLayout[SECTION_ADDRESS_WITH_MAP][0].value,
            options: sectionsLayout[SECTION_ADDRESS_WITH_MAP],
          },
        ],
      },
    ],
  },
];
export default addressWithMap;
