import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_TEXT } from "@saas/utils/constants/sections";

const text = [
  // Text
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "Text",
        key: "text",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Text",
            default_value: "Text",
            key: "value",
            type: "richtext",
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
            default_value: sectionsLayout[SECTION_TEXT][0].value,
            options: sectionsLayout[SECTION_TEXT],
          },
        ],
      },
      {
        ...sectionsConfigTabsRepeatedParts["background"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["background_select"],
          },
          {
            dependencies: [
              {
                fields: {
                  background_type: "image",
                },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["image_uploader"],
            key: "background_image",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: {
                  background_type: "image",
                },
              },
            ],

            ...sectionsConfigTabsRepeatedParts["slider_opacity"],
          },
          {
            dependencies: [
              {
                fields: {
                  background_type: "color",
                },
              },
            ],

            ...sectionsConfigTabsRepeatedParts["background_color"],
          },
        ],
      },
    ],
  },
];

export default text;
