import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_SOUND } from "@saas/utils/constants/sections";

const sound = [
  // voice
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "voice",
        key: "sound",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "sound URL",
            type: "text",
            key: "value",
            multiline: true,
            InputProps: { style: { height: "unset" } },
            style: { direction: "ltr" },
            default_value: "",
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
            default_value: sectionsLayout[SECTION_SOUND][0].value,
            options: sectionsLayout[SECTION_SOUND],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "an offer",
        key: "width",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Use the desired width",
            type: "checkbox",
            key: "isCustomValue",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: {
                  isCustomValue: true,
                },
              },
            ],
            id: uniqueid(),
            label: "an offer",
            type: "slider",
            key: "value",
            min: 350,
            max: 1200,
            default_value: "1140",
          },
        ],
      },
    ],
  },
];

export default sound;
