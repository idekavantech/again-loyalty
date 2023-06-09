import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import uniqueId from "lodash/uniqueId";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_FEATURES_CARD } from "@saas/utils/constants/sections";
import { LOREM_IPSUM_SHORT } from "../sharedConstants";

const featuresCard = [
  // Card with benefits
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
        label: "Cards",
        key: "cards",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 5,
        min_items: 1,
        add_new_item_text: "Add new card",
        default_items: [
          {
            title: "Title",
            image: `${CDN_BASE_URL}mock14.svg`,
            alternative: "",
            description: LOREM_IPSUM_SHORT,
            image_background: true,
            title_color_use_theme_color: false,
          },
          {
            title: "Title",
            image: `${CDN_BASE_URL}mock15.svg`,
            alternative: "",
            description: LOREM_IPSUM_SHORT,
            image_background: true,
            title_color_use_theme_color: false,
          },
          {
            title: "Title",
            image: `${CDN_BASE_URL}mock16.svg`,
            alternative: "",
            description: LOREM_IPSUM_SHORT,
            image_background: true,
            title_color_use_theme_color: false,
          },
        ],
        fields: [],
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
            label: "Title",
            type: "text",
            key: "title",
            default_value: "Title",
          },
          {
            id: uniqueid(),
            label: "The color of the title follows the theme color.",
            type: "checkbox",
            key: "title_color_use_theme_color",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: {
                  title_color_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "Title color",
            type: "color",
            key: "title_color",
            default_value: "#000000",
          },
          {
            id: uniqueid(),
            label: "Picture",
            type: "image_uploader",
            key: "image",
            default_value: `${CDN_BASE_URL}mock14.svg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueId(),
            label: "Colored background behind the photo",
            default_value: true,
            key: "image_background",
            type: "switch",
          },
          {
            id: uniqueid(),
            label: "Description",
            type: "richtext",
            key: "description",
            default_value: LOREM_IPSUM_SHORT,
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
            default_value: sectionsLayout[SECTION_FEATURES_CARD][0].value,
            options: sectionsLayout[SECTION_FEATURES_CARD],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Shows",
        key: "title",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "Show title",
            default_value: true,
            key: "is_title_visible",
            type: "switch",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Display in mobile mode",
        key: "show_in_mobile",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "Horizontal or vertical",
            default_value: "vertical",
            key: "direction",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "Horizontal",
                value: "horizontal",
              },
              {
                id: uniqueid(),
                label: "Vertical",
                value: "vertical",
              },
            ],
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
export default featuresCard;
