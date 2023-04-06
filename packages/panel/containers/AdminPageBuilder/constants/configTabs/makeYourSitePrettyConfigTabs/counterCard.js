import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_COUNTER_CARD } from "@saas/utils/constants/sections";

const counterCard = [
  // The card with the counter
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
        label: "Cards",
        key: "cards",
        element_id: "section_30_cards",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 3,
        min_items: 1,
        add_new_item_text: "Add new card",
        default_items: [
          {
            title: "Total sales of sites made with showcase.",
            title_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            subtitle: "Toman",
            subtitle_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            price: "123123123",
            price_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_head_title: "How much will your site sell?",
            button_head_title_color: "#000000",
            button_text: "Construction Site",
            button_link: "/",
            button_title_color: "#ffffff",
            button_backgrond_color: "#000000",
          },
          {
            title: "Total sales of sites made with showcase.",
            title_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            subtitle: "Toman",
            subtitle_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            price: "123123123",
            price_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_head_title: "How much will your site sell?",
            button_head_title_color: "#000000",
            button_text: "Construction Site",
            button_link: "/",
            button_title_color: "#ffffff",
            button_backgrond_color: "#000000",
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
            label: "Underwent",
            default_value: "Toman",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "subtitle_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Price",
            default_value: "123123123",
            key: "price",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Price color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "price_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "The text above the button",
            default_value: "How much will your site sell?",
            key: "button_head_title",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "The color of the text above the button",
            default_value: "#000000",
            key: "button_head_title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Button text",
            default_value: "Button text",
            type: "text",
            key: "button_text",
          },
          {
            id: uniqueid(),
            label: "Button link",
            default_value: "/",
            type: "text",
            key: "button_link",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "The color of the button text",
            default_value: "#ffffff",
            key: "button_title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Background color button",
            default_value: "black",
            key: "button_backgrond_color",
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
            default_value: sectionsLayout[SECTION_COUNTER_CARD][0].value,
            options: sectionsLayout[SECTION_COUNTER_CARD],
          },
        ],
      },
    ],
  },
];

export default counterCard;
