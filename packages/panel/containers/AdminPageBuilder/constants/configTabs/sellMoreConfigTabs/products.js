import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";
import { CDN_BASE_URL } from "@saas/utils/api";
import uniqueId from "lodash/uniqueId";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_PRODUCTS } from "@saas/utils/constants/sections";

const products = [
  // Products
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
            label: "Title",
            type: "text",
            key: "value",
            default_value: "Title",
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
            fields: {
              type: "type_2",
            },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "Underwent",
            default_value: "Substitious title",
            key: "value",
            type: "text",
          },

          {
            id: uniqueid(),
            label: "The color of the subdivision follows the color of the theme.",
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
            label: "Color",
            type: "color",
            key: "color",
            default_value: "#000000",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Sections",
        key: "sections",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "Add the new section",
        max_items: 20,
        min_items: 2,
        default_items: [
          {
            title: "Title",
            subtitle: "Substitious title",
            texts_color: "#ffffff",
            link_type: HAS_INTERNAL_LINK,
            internal_link: "/",
            external_link: "/",
            image: `${CDN_BASE_URL}mock18.jpg`,
          },
          {
            title: "Title",
            subtitle: "Substitious title",
            texts_color: "#ffffff",
            link_type: HAS_INTERNAL_LINK,
            internal_link: "/",
            external_link: "/",
            image: `${CDN_BASE_URL}mock19.jpg`,
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "Title",
            default_value: "Title",
            type: "text",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "Sour",
            default_value: "Substitious title",
            type: "text",
            key: "subtitle",
          },
          {
            id: uniqueid(),
            label: "Select the internal or external link",
            default_value: HAS_INTERNAL_LINK,
            key: "link_type",
            type: "select",
            options: [
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
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: HAS_INTERNAL_LINK,
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
                  link_type: HAS_EXTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "External link",
            default_value: "/",
            key: "external_link",
            type: "text",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "Picture",
            default_value: `${CDN_BASE_URL}mock24.jpg`,
            type: "image_uploader",
            key: "image",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
        ],
        fields: [],
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
            default_value: sectionsLayout[SECTION_PRODUCTS][0].value,
            options: sectionsLayout[SECTION_PRODUCTS],
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

export default products;
