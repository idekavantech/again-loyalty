import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import uniqueId from "lodash/uniqueId";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_IMAGE_GALLERY } from "@saas/utils/constants/sections";

const imageGallery = [
  // Photo Gallery
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "Title",
        key: "title",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Title text",
            default_value: "Pictures",
            key: "value",
            type: "text",
          },

          {
            id: uniqueid(),
            label: "Use the color of the site theme.",
            default_value: false,
            key: "use_theme_color",
            type: "switch",
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3", "type_1"],
                },
              },
            ],
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3", "type_1"],
                },
              },
              {
                fields: {
                  use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "Title color",
            default_value: "#111111",
            key: "color",
            type: "color",
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
            id: uniqueid(),
            options: [
              {
                id: uniqueId(),
                label: "Little",
                value: 18,
              },
              {
                id: uniqueId(),
                label: "medium",
                value: 20,
              },
              {
                id: uniqueId(),
                label: "big",
                value: 24,
              },
            ],
            label: "Font size",
            default_value: 18,
            key: "font_size",
            type: "select",
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
        id: uniqueid(),
        label: "Pictures",
        key: "images",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "Add new image",
        min_items: 1,
        default_items: [
          {
            internal_link: "/",
            external_link: "/",
            url: `${CDN_BASE_URL}food-1.jpg`,
            alternative: "",
            image_action: "has_no_link",
          },
          {
            internal_link: "/",
            external_link: "/",
            url: `${CDN_BASE_URL}food-2.jpg`,
            alternative: "",
            image_action: "has_no_link",
          },
          {
            internal_link: "/",
            external_link: "/",
            url: `${CDN_BASE_URL}food-3.jpg`,
            alternative: "",
            image_action: "has_no_link",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "Choose Mouse Action",
            default_value: "has_no_link",
            key: "image_action",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "No links",
                value: "has_no_link",
              },
              {
                id: uniqueId(),
                label: "With external link",
                value: HAS_EXTERNAL_LINK,
              },
              {
                id: uniqueId(),
                label: "With internal link",
                value: HAS_INTERNAL_LINK,
              },
              {
                id: uniqueId(),
                label: "Model",
                value: "has_modal",
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  image_action: HAS_INTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "Internal link",
            default_value: "/",
            key: "internal_link",
            type: "link",
          },
          {
            dependencies: [
              {
                fields: {
                  image_action: HAS_EXTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "External link",
            default_value: "/",
            type: "text",
            key: "external_link",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "Picture",
            default_value: "",
            key: "url",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
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
            label: "Text on the picture",
            default_value: "",
            type: "text",
            key: "title",
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
            key: "title_use_theme_color",
            type: "switch",
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  title_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "The color of the text on the picture",
            default_value: "#000000",
            key: "title_color",
            type: "color",
          },
        ],
        fields: [],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_2"],
            },
          },
        ],
        id: uniqueid(),
        label: "Fever content",
        key: "tab_content",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "Add new item",
        default_items: [
          {
            image: `${CDN_BASE_URL}mock8.jpg`,
            alternative: "",
            link: "/",
          },
          {
            image: `${CDN_BASE_URL}mock18.jpg`,
            alternative: "",
            link: "/",
          },
          {
            image: `${CDN_BASE_URL}mock19.jpg`,
            alternative: "",
            link: "/",
          },
        ],
        items_fields: [
          {
            custom_options_config: {
              tab_key: "content",
              item_key: "tab_content",
              field_key: "tabs",
            },
            id: uniqueid(),
            label: "Choosing a fever",
            type: "custom_select",
            key: "tab",
          },
          {
            ...sectionsConfigTabsRepeatedParts["image_uploader"],
            key: "image",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "link",
            default_value: "/",
            type: "text",
            key: "link",
            className: "direction-ltr",
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "Create tabs by pressing the Inter button",
            default_value: [
              { id: uniqueid(), label: "تب‌۱" },
              { id: uniqueid(), label: "تب‌۲" },
              { id: uniqueid(), label: "تب‌۳" },
            ],
            key: "tabs",
            type: "chip_input",
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
            default_value: sectionsLayout[SECTION_IMAGE_GALLERY][0].value,
            options: sectionsLayout[SECTION_IMAGE_GALLERY],
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
        id: uniqueid(),
        label: "Settings",
        key: "setting",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            options: [
              {
                id: uniqueId(),
                label: "two",
                value: 2,
              },
              {
                id: uniqueId(),
                label: "Three",
                value: 3,
              },
              {
                id: uniqueId(),
                label: "Four",
                value: 4,
              },
              {
                id: uniqueId(),
                label: "Five",
                value: 5,
              },
            ],
            label: "The number of columns on the desktop",
            default_value: 3,
            key: "desktop_columns",
            type: "select",
          },
          {
            id: uniqueid(),
            options: [
              {
                id: uniqueId(),
                label: "One",
                value: 1,
              },
              {
                id: uniqueId(),
                label: "two",
                value: 2,
              },
              {
                id: uniqueId(),
                label: "Three",
                value: 3,
              },
            ],
            label: "The number of columns on mobile",
            default_value: 3,
            key: "mobile_columns",
            type: "select",
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
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
            options: [
              {
                id: uniqueId(),
                label: "One",
                value: 1,
              },
              {
                id: uniqueId(),
                label: "two",
                value: 2,
              },
              {
                id: uniqueId(),
                label: "Three",
                value: 3,
              },
            ],
            label: "The number of columns on mobile",
            default_value: 2,
            key: "mobile_columns_type_3",
            type: "select",
          },
          {
            id: uniqueid(),
            label: "Maximum number of visible photos",
            default_value: 9,
            key: "max_items",
            type: "number",
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
            ],
            id: uniqueid(),
            label: "Choosing the dimensions of the photo",
            default_value: "square",
            key: "image_size_type_1",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "Square",
                value: "square",
              },
              {
                id: uniqueId(),
                label: "Horizontal rectangle",
                value: "horizontal_rectangle",
              },
              {
                id: uniqueId(),
                label: "Vertical rectangle",
                value: "rectangle",
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
            label: "Choosing the dimensions of the photo",
            default_value: "rectangle",
            key: "image_size_type_3",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "Square",
                value: "square",
              },
              {
                id: uniqueId(),
                label: "Horizontal rectangle",
                value: "horizontal_rectangle",
              },
              {
                id: uniqueId(),
                label: "Vertical rectangle",
                value: "rectangle",
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
            id: uniqueid(),
            label: "Show items in the middle of the china",
            default_value: false,
            type: "switch",
            key: "align",
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
        id: uniqueid(),
        label: "Section size",
        key: "section_size",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Request",
            default_value: "container",
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
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_1", "type_3"],
            },
          },
        ],
        id: uniqueid(),
        label: "back ground",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "The choice of background type",
            default_value: "color",
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
            ],
            id: uniqueid(),
            label: "Uploading a separate photo for mobile",
            default_value: false,
            type: "switch",
            key: "should_upload_seperate_image_for_mobile",
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

            id: uniqueId(),
            label: "The background color",
            default_value: "#FFFFFF",
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
            fields: {
              type: ["type_3"],
            },
          },
        ],
        id: uniqueid(),
        label: "Aura on the item image",
        key: "overlay",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Aura",
            default_value: "#FFFFFF",
            key: "overlay_color",
            type: "color",
          },
        ],
      },
    ],
  },
];

export default imageGallery;
