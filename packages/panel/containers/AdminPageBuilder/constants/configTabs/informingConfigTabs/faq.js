import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_FAQ } from "@saas/utils/constants/sections";
import uniqueId from "lodash/uniqueId";

const faq = [
  // Frequently Asked Questions
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "background",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "The background color",
            default_value: "#F1F5FF",
            key: "color",
            type: "color",
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
        ],
      },
      {
        id: uniqueid(),
        label: "Questions",
        key: "questions",
        element_id: "section_31_questions",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 15,
        min_items: 2,
        add_new_item_text: "Adding a new question",
        default_items: [
          {
            title: "Total sales of sites made with showcase.",
            title_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            description: "Total sales of sites made with showcase.",
            description_color: "#000000",
          },
          {
            title: "Total sales of sites made with showcase.",
            title_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            description: "Total sales of sites made with showcase.",
            description_color: "#000000",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "Title",
            default_value: "Total sales of sites made with showcase.",
            type: "text",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "Title color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Description",
            default_value: "Total sales of sites made with showcase.",
            type: "richtext",
            key: "description",
          },
          {
            id: uniqueid(),
            label: "Color Description",
            default_value: "#000000",
            key: "description_color",
            type: "color",
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
            default_value: sectionsLayout[SECTION_FAQ][0].value,
            options: sectionsLayout[SECTION_FAQ],
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

export default faq;
