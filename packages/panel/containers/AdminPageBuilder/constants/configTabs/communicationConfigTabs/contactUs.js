import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_CONTACT_US } from "@saas/utils/constants/sections";

const contactUs = [
  // تماس با ما
  {
    ...sectionsConfigTabsRepeatedParts["customization"],
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value: sectionsLayout[SECTION_CONTACT_US][0].value,
            options: sectionsLayout[SECTION_CONTACT_US],
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

export default contactUs;
