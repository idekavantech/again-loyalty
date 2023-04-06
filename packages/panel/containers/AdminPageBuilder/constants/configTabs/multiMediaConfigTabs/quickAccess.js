import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_QUICK_ACCESS } from "@saas/utils/constants/sections";

const quickAccess = [
  // quick access
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "Picture",
        key: "image",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Upload a Photo",
            default_value: `${CDN_BASE_URL}mock3.jpg`,
            key: "value",
            type: "image_uploader",
          },
          {
            id: uniqueid(),
            label: "Replace the photo",
            default_value: "Showcase",
            key: "alt",
            type: "text",
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
            label: "The desired title",
            default_value: "Your site with showcase",
            key: "value",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Title color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Font size",
            key: "font_size",
            default_value: "20px",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "HTML tag",
            key: "html_tag",
            default_value: "h1",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "h1",
                value: "h1",
              },
              {
                id: uniqueid(),
                label: "h2",
                value: "h2",
              },
              {
                id: uniqueid(),
                label: "h3",
                value: "h3",
              },
              {
                id: uniqueid(),
                label: "h4",
                value: "h4",
              },
              {
                id: uniqueid(),
                label: "h5",
                value: "h5",
              },
              {
                id: uniqueid(),
                label: "h6",
                value: "h6",
              },
              {
                id: uniqueid(),
                label: "div",
                value: "div",
              },
              {
                id: uniqueid(),
                label: "span",
                value: "span",
              },
              {
                id: uniqueid(),
                label: "p",
                value: "p",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "The type of layout",
            key: "position",
            default_value: "right",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "right side",
                value: "right",
              },
              {
                id: uniqueid(),
                label: "Left side",
                value: "left",
              },
              {
                id: uniqueid(),
                label: "middle",
                value: "center",
              },
            ],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "The color of the mosaics",
        key: "squares_colors",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "The color of the titles",
            default_value: "rgba(32, 197, 186, 1)",
            key: "color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "background color",
            default_value: "rgba(255, 255, 255, 0.2)",
            key: "background_color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Squares",
        key: "squares",
        element_id: "section_34_squares",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 20,
        min_items: 1,
        add_new_item_text: "Adding new mosaic",
        default_items: [],
        items_fields: [
          {
            id: uniqueid(),
            label: "Button text",
            default_value: "Button text",
            type: "text",
            key: "text",
          },
          {
            id: uniqueid(),
            label: "Button link",
            default_value: "/",
            type: "text",
            key: "link",
            className: "direction-ltr",
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
            default_value: sectionsLayout[SECTION_QUICK_ACCESS][0].value,
            options: sectionsLayout[SECTION_QUICK_ACCESS],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "the show",
        key: "showcases",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "View photo",
            default_value: true,
            type: "switch",
            key: "photo_display",
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

export default quickAccess;
