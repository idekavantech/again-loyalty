import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import uniqueId from "lodash/uniqueId";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_RECOMMENDED_LABEL } from "@saas/utils/constants/sections";

const recommendedLabel = [
  // Suggested label
  {
    ...sectionsConfigTabsRepeatedParts["content"],

    items: [
      {
        id: uniqueId(),
        label: "The segment of all products",
        key: "intro_card",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_2",
            },
          },
        ],
        fields: [
          {
            id: uniqueId(),
            label: "Picture",
            default_value: `https://www.digikala.com/static/files/b6c724a0.png`,
            key: "intro_image",
            type: "image_uploader",
          },
          {
            id: uniqueId(),
            label: "Button text(Under15 Word)",
            default_value: "View everyone",
            key: "value",
            type: "text",
          },
          {
            id: uniqueId(),
            label: "Button color",
            default_value: "#ffffff",
            key: "button_color",
            type: "color",
          },
          {
            id: uniqueId(),
            label: "Button link",
            default_value: "/",
            key: "link",
            type: "link",
          },
        ],
      },
      {
        id: uniqueId(),
        label: "Select the label",
        key: "category_id",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "Label",
            default_value: "",
            key: "value",
            type: "category_select",
          },
        ],
      },
      {
        id: uniqueId(),
        label: "The discount time",
        key: "discount_time",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_2",
            },
          },
        ],
        fields: [
          {
            id: uniqueId(),
            label: "Existence of time to end the discount",
            default_value: false,
            key: "has_deadline",
            type: "checkbox",
          },
          {
            id: uniqueId(),
            dependencies: [
              {
                fields: {
                  has_deadline: true,
                },
              },
            ],
            label: "Select the Date Date Discount",
            default_value: "",
            key: "value",
            type: "date_time_picker",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Tagity title",
        key: "title",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_1", "type_3"],
            },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "Title",
            type: "text",
            key: "value",
            default_value: "Title",
          },
          {
            id: uniqueid(),
            label: "Font size",
            key: "font_size",
            default_value: "medium",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "Very small",
                value: "extraSmall",
              },
              ...sectionsConfigTabsRepeatedParts["size_options"],
              {
                id: uniqueid(),
                label: " Very big",
                value: "extraLarge",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "The color of the title follows the theme color.",
            type: "checkbox",
            key: "color_use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  color_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "Title color",
            type: "color",
            key: "color",
            default_value: "#000000",
          },
          {
            id: uniqueid(),
            label: "The color of the line below the title follows the theme color.",
            type: "checkbox",
            key: "underline_color_use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  underline_color_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "The color of the line under the title",
            type: "color",
            key: "underline_color",
            default_value: "#000000",
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
            default_value: sectionsLayout[SECTION_RECOMMENDED_LABEL][0].value,
            options: sectionsLayout[SECTION_RECOMMENDED_LABEL],
          },
        ],
      },
      {
        id: uniqueId(),
        label: "Background color",
        key: "background_color",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_2",
            },
          },
        ],
        fields: [
          {
            id: uniqueId(),
            label: "Backdrop color",
            default_value: "#ef394e",
            key: "value",
            type: "color",
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_1", "type_3"],
            },
          },
        ],
        id: uniqueId(),
        label: "Slider Settings",
        key: "slider_setting",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "Automatic movement",
            default_value: false,
            key: "autoplay",
            type: "switch",
          },
          {
            dependencies: [
              {
                fields: {
                  autoplay: true,
                },
              },
            ],
            id: uniqueId(),
            label: "Automatic Movement of Products(To milliseconds) ",
            default_value: 3000,
            key: "timer",
            type: "number",
          },
          {
            id: uniqueId(),
            label: "The movements of the infinite",
            default_value: false,
            key: "infinite",
            type: "switch",
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_2",
            },
          },
        ],
        id: uniqueId(),
        label: "Slider Settings",
        key: "slider_setting",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "Automatic movement",
            default_value: false,
            key: "autoplay",
            type: "switch",
          },

          {
            id: uniqueId(),
            label: "Automatic Movement of Products(To milliseconds) ",
            default_value: 4000,
            key: "timer",
            type: "number",
          },
          {
            id: uniqueId(),
            label: "The movements of the infinite",
            default_value: false,
            key: "infinite",
            type: "switch",
          },
          {
            id: uniqueId(),
            label: "(To milliseconds) The speed of movement",
            default_value: 500,
            key: "speed",
            type: "number",
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_1", "type_3"],
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

export default recommendedLabel;
