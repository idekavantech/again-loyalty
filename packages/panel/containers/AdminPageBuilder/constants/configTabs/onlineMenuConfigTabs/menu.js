import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_MENU } from "@saas/utils/constants/sections";

const menu = [
  // Menu
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "categories",
        key: "categories",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "Add new category",
        items_fields: [
          {
            id: uniqueid(),
            label: "Grouping",
            type: "category_select",
            key: "category_id",
          },
          {
            id: uniqueid(),
            label: "icon",
            key: "image",
            type: "image_uploader",
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
            default_value: sectionsLayout[SECTION_MENU][0].value,
            options: sectionsLayout[SECTION_MENU],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Colors",
        key: "colors",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "The color of the categories",
            type: "color",
            key: "body_categories_color",
            default_value: "#ffffff",
          },
          {
            id: uniqueid(),
            label: "The color of the text categories in the slider",
            type: "color",
            key: "slider_categories_text_color",
            default_value: "#000000",
          },
          {
            id: uniqueid(),
            label: "Backgrand color of categories in the slider",
            type: "color",
            key: "slider_categories_background_color",
            default_value: "#f0f8ff",
          },
          {
            id: uniqueid(),
            label: "Background color header",
            type: "color",
            key: "header_background_color",
            default_value: "#868f87",
            dependencies: [
              {
                fields: {
                  type: "type_1",
                },
              },
            ],
          },
          {
            id: uniqueid(),
            label: "Background color",
            type: "color",
            key: "body_background_color",
            default_value: "#162841",
          },
          {
            id: uniqueid(),
            label: "Background Cards",
            type: "color",
            key: "card_background_color",
            default_value: "#314159",
          },
          {
            id: uniqueid(),
            label: "The main color of card texts",
            type: "color",
            key: "card_texts_color",
            default_value: "#ffffff",
          },

          {
            id: uniqueid(),
            label: "Use the site theme color",
            type: "switch",
            key: "use_theme_color",
            default_value: true,
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
            label: "Card theme",
            type: "color",
            key: "card_theme_color",
            default_value: "#325767",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Shows",
        key: "shows",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_2"] },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "Display the Add button",
            type: "switch",
            key: "show_plus_btn",
            default_value: true,
          },
        ],
      },
    ],
  },
];

export default menu;
