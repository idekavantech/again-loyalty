import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_SPECIAL_BANNER } from "@saas/utils/constants/sections";
import uniqueId from "lodash/uniqueId";
import { LOREM_IPSUM_SHORT } from "../sharedConstants";

const specialBanner = [
  // Special banner
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "Title",
        key: "title",
        element_id: "theme_1_title",
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Title text",
            default_value: "Title",
            key: "value",
            type: "text",
            rowsMax: 4,
            multiline: true,
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
                label: "Little",
                value: "small",
                // value: ["2vw", "7.5vw", "1.6vw"],
              },
              {
                id: uniqueid(),
                label: "medium",
                value: "medium",
                // value: ["3vw", "9vw", "2.4vw"],
              },
              {
                id: uniqueid(),
                label: "big",
                value: "large",
                // value: ["4vw", "16vw", "4vw"],
              },
            ],
          },
          {
            id: uniqueid(),
            label: "Use the color of the site theme.",
            default_value: true,
            key: "use_theme_color",
            type: "switch",
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
            label: "Title color",
            key: "color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Sub-headings",
        key: "slogan",
        element_id: "theme_1_slogan",
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Sub-headings",
            default_value: "Sub-headings",
            key: "value",
            type: "text",
            rowsMax: 8,
            multiline: true,
          },
          {
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "Use the color of the site theme.",
            key: "use_theme_color",
            default_value: true,
            type: "switch",
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
            key: "color",
            label: "Color under the title",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Description",
        key: "description_text",
        element_id: "theme_1_description",
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Text of Description",
            default_value: LOREM_IPSUM_SHORT,
            key: "value",
            type: "text",
            multiline: true,
          },
          {
            id: uniqueid(),
            label: "Font size",
            default_value: "medium",
            key: "font_size",
            type: "select",
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "Use the color of the site theme.",
            key: "use_theme_color",
            default_value: true,
            type: "switch",
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
            key: "color",
            label: "Color Description",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "back ground Photo",
        key: "background_image",
        element_id: null,
        // description: "The size of the photo below is 1 megabyte",
        fields: [
          {
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            default_value: `${CDN_BASE_URL}mock8.jpg`,
            key: "value",
            tooltip: "340 X 600",
          },
          {
            id: uniqueid(),
            label: "Upload Separate Photo for Mobile",
            type: "switch",
            key: "has_banner_image_for_mobile",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: {
                  has_banner_image_for_mobile: true,
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock8.jpg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "The colored layer on the photo",
            type: "switch",
            default_value: true,
            key: "has_overlay",
          },
          {
            id: uniqueid(),
            label: "Parallex image.",
            default_value: false,
            key: "parallax",
            type: "switch",
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
        min_items: 1,
        max_items: 8,
        add_new_item_text: "Add new button",
        items_fields: [
          {
            id: uniqueid(),
            label: "Button link",
            default_value: "link",
            key: "link_type",
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
                fields: {
                  link_type: "link",
                },
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
                fields: {
                  link_type: "phone_num",
                },
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
                fields: {
                  link_type: "link",
                },
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
                fields: {
                  link_type: "phone_num",
                },
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
            default_value: "__medium",
            key: "button_size",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "Little",
                value: "__small",
              },
              {
                id: uniqueid(),
                label: "medium",
                value: "__medium",
              },
              {
                id: uniqueid(),
                label: "big",
                value: "__large",
              },
            ],
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
            default_value: sectionsLayout[SECTION_SPECIAL_BANNER][0].value,
            options: sectionsLayout[SECTION_SPECIAL_BANNER],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Its height",
        key: "heights",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Convenient",
            type: "switch",
            key: "use_ratio_height_in_mobile",
            default_value: false,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "heights",
                fields: { use_ratio_height_in_mobile: false },
              },
            ],
            id: uniqueid(),
            label: "The height of the sequel to the mobile",
            default_value: "60vh",
            type: "select",
            key: "mobile_height",
            options: [
              {
                id: uniqueid(),
                label: "Too short",
                value: "20vh",
              },
              {
                id: uniqueid(),
                label: "Short",
                value: "30vh",
              },
              {
                id: uniqueid(),
                label: "medium",
                value: "40vh",
              },
              {
                id: uniqueid(),
                label: "Tall",
                value: "50vh",
              },
              {
                id: uniqueid(),
                label: "very tall",
                value: "60vh",
              },
            ],
          },

          {
            dependencies: [
              {
                fields: { use_ratio_height_in_mobile: true },
              },
            ],
            id: uniqueid(),
            label: "Ratio",
            default_value: "16:9",
            type: "select",
            key: "mobile_ratio",
            options: [
              {
                id: uniqueid(),
                label: "9:16 (600 * 340)",
                value: "9:16",
              },
              {
                id: uniqueid(),
                label: "3:4 (600 * 450)",
                value: "3:4",
              },
              {
                id: uniqueid(),
                label: "1:1 (600 * 600)",
                value: "1:1",
              },
              {
                id: uniqueid(),
                label: "5:4 (480 * 600)",
                value: "5:4",
              },
              {
                id: uniqueid(),
                label: "4:3 (450 * 600)",
                value: "4:3",
              },
              {
                id: uniqueid(),
                label: "3:2 (400 * 600)",
                value: "3:2",
              },
              {
                id: uniqueid(),
                label: "16:10 (375 * 800)",
                value: "16:10",
              },
              {
                id: uniqueid(),
                label: "16:9 (340 * 600)",
                value: "16:9",
              },
              {
                id: uniqueid(),
                label: "2:1 (300 * 600)",
                value: "2:1",
              },
              {
                id: uniqueid(),
                label: "3:1 (200 * 600)",
                value: "3:1",
              },
              {
                id: uniqueid(),
                label: "6:1 (100 * 600)",
                value: "6:1",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "Desktop",
            type: "switch",
            key: "use_ratio_height_in_desktop",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: { use_ratio_height_in_desktop: false },
              },
            ],
            id: uniqueid(),
            label: "Sequel height on the desktop",
            default_value: "80vh",
            type: "select",
            key: "desktop_height",
            options: [
              {
                id: uniqueid(),
                label: "Too short",
                value: "40vh",
              },
              {
                id: uniqueid(),
                label: "Short",
                value: "50vh",
              },
              {
                id: uniqueid(),
                label: "medium",
                value: "60vh",
              },
              {
                id: uniqueid(),
                label: "Tall",
                value: "70vh",
              },
              {
                id: uniqueid(),
                label: "very tall",
                value: "80vh",
              },
            ],
          },
          {
            dependencies: [
              {
                fields: { use_ratio_height_in_desktop: true },
              },
            ],
            id: uniqueid(),
            label: "The ratio of width to the height of the sequel in the desktop",
            default_value: "16:9",
            type: "select",
            key: "desktop_ratio",
            options: [
              {
                id: uniqueid(),
                label: "9:16 (1200 * 675)",
                value: "9:16",
              },
              {
                id: uniqueid(),
                label: "3:4 (1200 * 900)",
                value: "3:4",
              },
              {
                id: uniqueid(),
                label: "1:1 (1200 * 1200)",
                value: "1:1",
              },
              {
                id: uniqueid(),
                label: "5:4 (960 * 1200)",
                value: "5:4",
              },
              {
                id: uniqueid(),
                label: "3:2 (800 * 1200)",
                value: "3:2",
              },
              {
                id: uniqueid(),
                label: "16:10 (750 * 1200)",
                value: "16:10",
              },
              {
                id: uniqueid(),
                label: "16:9 (675 * 1200)",
                value: "16:9",
              },
              {
                id: uniqueid(),
                label: "2:1 (600 * 1200)",
                value: "2:1",
              },
              {
                id: uniqueid(),
                label: "3:1 (400 * 1200)",
                value: "3:1",
              },
              {
                id: uniqueid(),
                label: "6:1 (200 * 1200)",
                value: "6:1",
              },
            ],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "back ground",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "The choice of background type",
            default_value: "image",
            key: "background_type",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "Picture",
                value: "image",
              },
              {
                id: uniqueId(),
                label: "Color",
                value: "color",
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  background_type: "image",
                },
              },
            ],

            id: uniqueId(),
            label: "Photo resolution",
            default_value: "80",
            key: "opacity",
            type: "slider",
          },
          {
            dependencies: [
              {
                fields: {
                  background_type: "color",
                },
              },
            ],

            id: uniqueId(),
            label: "The background color",
            default_value: "#f2e9ea",
            key: "color",
            type: "color",
          },
        ],
      },
      {
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
            key: "slogan",
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
            label: "Buttons display",
            default_value: true,
            type: "switch",
            key: "buttons",
          },
        ],
      },

      {
        id: uniqueid(),
        label: "Section size",
        key: "section_size",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Request",
            default_value: "w-100",
            type: "select",
            key: "main_width",
            options: [
              {
                id: uniqueid(),
                label: "fullscreen",
                value: "w-100",
              },
              {
                id: uniqueid(),
                label: "with Gap",
                value: "container",
              },
            ],
          },
        ],
      },
      {
        id: uniqueId(),
        label: "The content of the content on the image",
        key: "content_location",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "Select the location of the content",
            key: "value",
            default_value: "center",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "middle",
                value: "center",
              },
              {
                id: uniqueId(),
                label: "The upper middle",
                value: "top_center",
              },
              {
                id: uniqueId(),
                label: "The bottom of the middle",
                value: "bottom_center",
              },
              {
                id: uniqueId(),
                label: "The middle of the right",
                value: "center_right",
              },
              {
                id: uniqueId(),
                label: "The bottom right",
                value: "bottom_right",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default specialBanner;
