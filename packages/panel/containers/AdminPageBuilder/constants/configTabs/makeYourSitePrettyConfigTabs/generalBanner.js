import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import {
  coal,
  jungleI,
  oceanIII,
  strawberryII,
  strawberryIII,
} from "@saas/utils/colors";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";
import uniqueId from "lodash/uniqueId";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_GENERAL_BANNER } from "@saas/utils/constants/sections";

const generalBanner = [
  // General banner
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "Banner 1",
        key: "banner_1",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "image",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
            ],
            tooltip: "600 * 500",
          },
          {
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "image",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2"],
                },
              },
            ],
            tooltip: "600 * 350",
          },
          {
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "image",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
            tooltip: "700 * 700",
          },
          {
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "image",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            tooltip: "600 * 300",
          },
          {
            id: uniqueid(),
            label: "Upload Separate Photo for Mobile",
            type: "switch",
            key: "having_banner_image_for_mobile",
            default_value: false,
          },

          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "600 * 500",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "500 * 350",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "500 * 410",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "400 * 345",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "Title",
            default_value: "Title",
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
            label: "Color",
            default_value: "#ffffff",
            key: "title_color",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Underwent",
            default_value: "Underwent",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Font size under the title",
            key: "subtitle_font_size",
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
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2", "type_4"],
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
                  type: ["type_1", "type_2"],
                },
              },
            ],
            id: uniqueid(),
            label: "Color",
            default_value: "#ffffff",
            key: "subtitle_color",
            type: "color",
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
            label: "First color",
            default_value: strawberryIII,
            key: "secondary_color",
            type: "color",
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
            label: "Second color",
            default_value: strawberryII,
            key: "primary_color",
            type: "color",
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
            label: "link",
            default_value: "/",
            key: "link",
            type: "link",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
            ],
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
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
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
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
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
            label: "Background color",
            default_value: strawberryIII,
            key: "background_color",
            type: "color",
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
            label: "Text background color",
            default_value: strawberryII,
            key: "text_background",
            type: "color",
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
            label: "The color of the button text",
            default_value: "#ffffff",
            type: "color",
            key: "button_text_color",
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
            label: "Button color",
            default_value: strawberryIII,
            key: "button_background",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_3", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Button text",
            default_value: "More",
            type: "text",
            key: "button_text",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Button link",
            default_value: "/",
            type: "text",
            key: "button_link",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Price",
            default_value: "123123123",
            key: "price",
            type: "text",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "The color of the text",
            default_value: coal,
            key: "texts_color",
            type: "color",
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
            label: "Use the theme color for the background",
            type: "switch",
            key: "banner_use_theme_color",
            default_value: true,
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
              {
                fields: {
                  banner_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "The background color",
            default_value: "#8CEC79",
            key: "background_color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Banner 1",
        key: "banner_2",
        element_id: null,
        description: "",
        fields: [
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
            label: "Upload a Photo",
            type: "image_uploader",
            key: "image",
            tooltip: "500 * 350",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
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
            label: "Upload a Photo",
            type: "image_uploader",
            key: "image",
            tooltip: "600 * 350",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
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
            label: "Upload a Photo",
            type: "image_uploader",
            key: "image",
            tooltip: "500 * 500",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "image",
            tooltip: "600 * 300",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            id: uniqueid(),
            label: "Upload Separate Photo for Mobile",
            type: "switch",
            key: "having_banner_image_for_mobile",
            default_value: false,
          },

          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            tooltip: "500 * 350",
            key: "banner_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            tooltip: "300 * 300",
            key: "banner_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            tooltip: "400 * 345",
            key: "banner_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "Title",
            default_value: "Title",
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
            label: "Color",
            default_value: "#ffffff",
            key: "title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Underwent",
            default_value: "Underwent",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Font size under the title",
            key: "subtitle_font_size",
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
            label: "Color",
            default_value: "#ffffff",
            key: "subtitle_color",
            type: "color",
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
            label: "link",
            default_value: "/",
            key: "link",
            type: "link",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
            ],
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
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
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
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
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
            label: "First color",
            default_value: strawberryIII,
            key: "secondary_color",
            type: "color",
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
            label: "Second color",
            default_value: strawberryII,
            key: "primary_color",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_3", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Button text",
            default_value: "More",
            type: "text",
            key: "button_text",
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
            label: "Text background color",
            default_value: jungleI,
            key: "text_background",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Button link",
            default_value: "/",
            type: "text",
            key: "button_link",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "Price",
            default_value: "123123123",
            key: "price",
            type: "text",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "The color of the text",
            default_value: coal,
            key: "texts_color",
            type: "color",
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
            label: "The color of the button text",
            default_value: "#ffffff",
            type: "color",
            key: "button_text_color",
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
            label: "Button color",
            default_value: "#66DFC0",
            key: "button_background",
            type: "color",
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
            label: "Use the theme color for the background",
            type: "switch",
            key: "banner_use_theme_color",
            default_value: true,
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
              {
                fields: {
                  banner_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "The background color",
            default_value: "#8CEC79",
            key: "background_color",
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
        id: uniqueid(),
        label: "Banner 1",
        key: "banner_3",
        element_id: null,
        description: "",
        fields: [
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
            label: "Upload a Photo",
            type: "image_uploader",
            tooltip: "500 * 350",
            key: "image",
            default_value: `${CDN_BASE_URL}mock3.jpg`,
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
            label: "Upload a Photo",
            type: "image_uploader",
            tooltip: "500 * 500",
            key: "image",
            default_value: `${CDN_BASE_URL}mock3.jpg`,
          },
          {
            id: uniqueid(),
            label: "Upload Separate Photo for Mobile",
            type: "switch",
            key: "having_banner_image_for_mobile",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "500 * 350",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "300 * 300",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "Title",
            default_value: "Title",
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
            label: "Color",
            default_value: "#ffffff",
            key: "title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Underwent",
            default_value: "Underwent",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Font size under the title",
            key: "subtitle_font_size",
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
            label: "Color",
            default_value: "#ffffff",
            key: "subtitle_color",
            type: "color",
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
            label: "link",
            default_value: "/",
            key: "link",
            type: "link",
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
            label: "First color",
            default_value: strawberryIII,
            key: "secondary_color",
            type: "color",
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
            label: "Second color",
            default_value: strawberryII,
            key: "primary_color",
            type: "color",
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
            label: "Text background color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "text_background",
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
            label: "Button text",
            default_value: "More",
            type: "text",
            key: "button_text",
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
            label: "Button link",
            default_value: "/",
            type: "text",
            key: "button_link",
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
            label: "The color of the button text",
            default_value: "#ffffff",
            type: "color",
            key: "button_text_color",
            className: "direction-ltr",
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
            label: "Button color",
            default_value: oceanIII,
            key: "button_background",
            type: "color",
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
            default_value: sectionsLayout[SECTION_GENERAL_BANNER][0].value,
            options: sectionsLayout[SECTION_GENERAL_BANNER],
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
        label: "Shows",
        key: "shows",
        element_id: null,
        description: "",
        fields: [
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
            label: "Card selection",
            key: "banner",
            default_value: "banner_1",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "Card 1",
                value: "banner_1",
              },
              {
                id: uniqueId(),
                label: "Card 1",
                value: "banner_2",
              },
              {
                id: uniqueId(),
                label: "Card 1",
                value: "banner_3",
              },
            ],
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
            ],
            id: uniqueId(),
            label: "Card selection",
            key: "banner",
            default_value: "banner_1",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "Card 1",
                value: "banner_1",
              },
              {
                id: uniqueId(),
                label: "Card 1",
                value: "banner_2",
              },
            ],
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_1" },
              },
            ],
            id: uniqueid(),
            label: "Show title",
            default_value: true,
            key: "banner_1_show_title",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_1" },
              },
            ],
            id: uniqueid(),
            label: "View of the following title",
            default_value: true,
            key: "banner_1_show_subtitle",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_1" },
              },
            ],
            id: uniqueid(),
            label: "Display button",
            default_value: true,
            key: "banner_1_show_button",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_1" },
              },
            ],
            id: uniqueid(),
            label: "View below the text",
            default_value: true,
            key: "banner_1_show_all",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_2" },
              },
            ],
            id: uniqueid(),
            label: "Show title",
            default_value: true,
            key: "banner_2_show_title",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_2" },
              },
            ],
            id: uniqueid(),
            label: "View of the following title",
            default_value: true,
            key: "banner_2_show_subtitle",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_2" },
              },
            ],
            id: uniqueid(),
            label: "Display button",
            default_value: true,
            key: "banner_2_show_button",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_2"],
                },
              },
              {
                fields: { banner: "banner_2" },
              },
            ],
            id: uniqueid(),
            label: "View below the text",
            default_value: true,
            key: "banner_2_show_all",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_3" },
              },
            ],
            id: uniqueid(),
            label: "Display button",
            default_value: true,
            key: "banner_3_show_button",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_3" },
              },
            ],
            id: uniqueid(),
            label: "Show title",
            default_value: true,
            key: "banner_3_show_title",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_3" },
              },
            ],
            id: uniqueid(),
            label: "View of the following title",
            default_value: true,
            key: "banner_3_show_subtitle",
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
              type: ["type_1", "type_2", "type_4"],
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

            id: uniqueId(),
            label: "The background color",
            default_value: "#8C9196",
            key: "background_color_",
            type: "color",
          },
        ],
      },
    ],
  },
];

export default generalBanner;
