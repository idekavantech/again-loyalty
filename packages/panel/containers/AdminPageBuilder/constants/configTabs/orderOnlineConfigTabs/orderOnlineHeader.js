import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_ORDER_ONLINE_HEADER } from "@saas/utils/constants/sections";

const orderOnlineHeader = [
  // Online order header
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_1", "type_2"],
            },
          },
        ],
        id: uniqueid(),
        label: "Search bar",
        key: "search_bar",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Show search bar",
            type: "checkbox",
            default_value: true,
            key: "has_search_bar",
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_3"],
            },
          },
        ],
        id: uniqueid(),
        label: "Title",
        key: "title",
        element_id: "theme_1_title",

        fields: [
          {
            id: uniqueid(),
            label: "Title color",
            type: "color",
            key: "title_color",
            default_value: "#ffffff",
          },
        ],
      },

      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_1", "type_2"],
            },
          },
        ],
        id: uniqueid(),
        label: "People",
        key: "logo",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Logo Show",
            type: "checkbox",
            default_value: true,
            key: "has_logo",
          },
          {
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            default_value: null,
            key: "value",
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
            default_value: sectionsLayout[SECTION_ORDER_ONLINE_HEADER][0].value,
            options: sectionsLayout[SECTION_ORDER_ONLINE_HEADER],
          },
        ],
      },

      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_1", "type_2", "type_3"],
            },
          },
        ],
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
                fields: {
                  background_type: "image",
                },
              },
              {
                fields: {
                  should_upload_seperate_image_for_mobile: true,
                },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["image_uploader"],
            key: "mobile_background_image",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_1"],
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

export default orderOnlineHeader;
