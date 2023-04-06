import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_WORKING_HOUR } from "@saas/utils/constants/sections";

const workingHour = [
  // ساعت کاری
  {
    is_not_prop: true,
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "تنظیمات",
        key: "setting",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "تغییر ساعت کاری",
            key: "button",
            type: "button",
            link: "setting#working_hours",
            variant: "contained",
            color: "primary",
            className: "w-100",
          },
        ],
      },
    ],
  },
  {
    ...sectionsConfigTabsRepeatedParts["customization"],
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value: sectionsLayout[SECTION_WORKING_HOUR][0].value,
            options: sectionsLayout[SECTION_WORKING_HOUR],
          },
        ],
      },
    ],
  },
];

export default workingHour;
