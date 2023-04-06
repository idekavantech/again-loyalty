import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_BANNER_WITH_ANIMATED_TEXT } from "@saas/utils/constants/sections";
import uniqueId from "lodash/uniqueId";

const bannerWithAnimatedText = [
  // Banner
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1", "type_3"] },
          },
        ],
        id: uniqueid(),
        label: "Picture",
        key: "image",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Upload a Photo",
            default_value: `${CDN_BASE_URL}mock43.png`,
            key: "value",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Title",
        key: "title",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Title",
            default_value: "Title",
            key: "value",
            type: "text",
            multiline: true,
          },

          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_1", "type_3"] },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "Title color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Sour",
        key: "subtitle",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1", "type_3"] },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "Underwent",
            default_value: "Sour",
            key: "value",
            type: "text",
            multiline: true,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_1", "type_3"] },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "Color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_3"] },
          },
        ],
        id: uniqueid(),
        label: "Price",
        key: "price",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Price",
            default_value: "123123123",
            key: "value",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Price color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
          {
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_3"] },
          },
        ],
        id: uniqueid(),
        label: "Unit",
        key: "unit_count",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "One",
            default_value: "Toman",
            key: "value",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Unit color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Unit size",
            key: "font_size",
            default_value: "medium",
            type: "select",
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1", "type_3"] },
          },
        ],
        id: uniqueid(),
        label: "Description",
        key: "description",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Description",
            default_value: "How much will your sale be?",
            key: "value",
            type: "text",
            multiline: true,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_1", "type_3"] },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "Color Description",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Moving Text",
        key: "animation",
        element_id: null,
        description: "Click to add the next moving sentence",
        fields: [
          {
            id: uniqueid(),
            label: "Moving Text",
            default_value: "Your ideas\nFor your business\nWith online sale",
            key: "value",
            type: "text",
            multiline: true,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_1", "type_3"] },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "Moving text color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_2", "type_3"] },
          },
        ],
        id: uniqueid(),
        label: "Animation",
        key: "background_animation",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Animation background color",
            default_value: "rgba(32, 197, 186, 1)",
            key: "color",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_3"] },
              },
            ],
            id: uniqueid(),
            label: "The color of the patient",
            default_value: "rgba(255, 255, 255, 0.2)",
            key: "square_color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "buttons",
        key: "buttons",
        element_id: "theme_1_buttons",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 2,
        min_items: 1,
        add_new_item_text: "Add new button",
        items_fields: [
          {
            id: uniqueid(),
            label: "Button link",
            default_value: "link",
            key: "slide_link_type",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "link",
                value: "link",
              },
              {
                id: uniqueid(),
                label: "‌phone number",
                value: "phone_num",
              },
            ],
          },
          {
            dependencies: [
              {
                fields: { slide_link_type: ["link"] },
              },
            ],
            id: uniqueid(),
            label: "Button text",
            default_value: "Button text",
            type: "text",
            key: "text",
          },
          {
            dependencies: [
              {
                fields: { slide_link_type: ["phone_num"] },
              },
            ],
            id: uniqueid(),
            label: "Button text",
            default_value: "Contact",
            type: "text",
            key: "num",
          },
          {
            dependencies: [
              {
                fields: { slide_link_type: ["link"] },
              },
            ],
            id: uniqueid(),
            label: "Button link",
            default_value: "/",
            type: "text",
            key: "link",
            className: "direction-ltr",
          },
          {
            dependencies: [
              {
                fields: { slide_link_type: ["phone_num"] },
              },
            ],
            id: uniqueid(),
            label: "‌phone number",
            default_value: "",
            type: "text",
            inputType: "number",
            key: "phone_num",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "Button type",
            default_value: "contained",
            type: "select",
            key: "variant",
            options: [
              {
                id: uniqueid(),
                label: "So on",
                value: "contained",
              },
              {
                id: uniqueid(),
                label: "You are empty",
                value: "outlined",
              },
              {
                id: uniqueid(),
                label: "Text",
                value: "text",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "Button shape",
            default_value: "normal",
            type: "select",
            key: "button_shape",
            options: [
              {
                id: uniqueid(),
                label: "Oval",
                value: "rounded",
              },
              {
                id: uniqueid(),
                label: "Rectangle",
                value: "normal",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "The use of theme color",
            type: "checkbox",
            key: "use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  variant: "contained",
                  use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "Background button",
            type: "color",
            key: "background_color",
          },
          {
            dependencies: [
              {
                fields: {
                  variant: "outlined",
                  use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "The color of the button round",
            type: "color",
            key: "border_color",
          },
          {
            dependencies: [
              {
                fields: {
                  use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "The color of the button text",
            type: "color",
            key: "color",
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "The use of default buttons",
            type: "switch",
            key: "use_default_buttons",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "Button size",
            default_value: "small",
            key: "button_size",
            type: "select",
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
        ],
      },
    ],
  },
  {
    label: "Personalization",
    key: "customization",
    id: uniqueid(),
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value:
              sectionsLayout[SECTION_BANNER_WITH_ANIMATED_TEXT][0].value,
            options: sectionsLayout[SECTION_BANNER_WITH_ANIMATED_TEXT],
          },
        ],
      },

      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1", "type_3"] },
          },
        ],
        id: uniqueid(),
        label: "Shows",
        key: "showcases",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Show title",
            default_value: true,
            type: "switch",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "View under the title",
            default_value: true,
            type: "switch",
            key: "subtitle",
          },
          {
            id: uniqueid(),
            label: "Show Description",
            default_value: true,
            type: "switch",
            key: "description",
          },
          {
            id: uniqueid(),
            label: "Price display",
            default_value: true,
            type: "switch",
            key: "price",
          },
          {
            id: uniqueid(),
            label: "Unit display",
            default_value: false,
            type: "switch",
            key: "unit_count",
          },
          {
            id: uniqueid(),
            label: "View photo",
            default_value: true,
            type: "switch",
            key: "background_image",
          },
          {
            id: uniqueid(),
            label: "View animated text",
            default_value: true,
            type: "switch",
            key: "animation",
          },
          {
            id: uniqueid(),
            label: "Buttons display",
            default_value: true,
            type: "switch",
            key: "buttons",
          },
        ],
      },

      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1"] },
          },
        ],
        id: uniqueid(),
        label: "back ground",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "The background color",
            default_value: "#ffffff",
            key: "color",
            type: "color",
          },
        ],
      },
    ],
  },
];

export default bannerWithAnimatedText;
