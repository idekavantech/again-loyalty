import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_MENU } from "@saas/utils/constants/sections";

const menu = [
  // منو
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "دسته‌بندی‌ها",
        key: "categories",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "افزودن دسته‌بندی‌ جدید",
        items_fields: [
          {
            id: uniqueid(),
            label: "دسته‌بندی",
            type: "category_select",
            key: "category_id",
          },
          {
            id: uniqueid(),
            label: "آیکون",
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
        label: "رنگ‌ها",
        key: "colors",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "رنگ دسته‌بندی‌ها",
            type: "color",
            key: "body_categories_color",
            default_value: "#ffffff",
          },
          {
            id: uniqueid(),
            label: "رنگ متن دسته‌بندی‌ها در اسلایدر",
            type: "color",
            key: "slider_categories_text_color",
            default_value: "#000000",
          },
          {
            id: uniqueid(),
            label: "رنگ بکگراند دسته‌بندی‌ها در اسلایدر",
            type: "color",
            key: "slider_categories_background_color",
            default_value: "#f0f8ff",
          },
          {
            id: uniqueid(),
            label: "رنگ بکگراند هدر",
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
            label: "رنگ بکگراند بدنه",
            type: "color",
            key: "body_background_color",
            default_value: "#162841",
          },
          {
            id: uniqueid(),
            label: "رنگ بکگراند کارت‌ها",
            type: "color",
            key: "card_background_color",
            default_value: "#314159",
          },
          {
            id: uniqueid(),
            label: "رنگ اصلی متن‌های کارت‌ها",
            type: "color",
            key: "card_texts_color",
            default_value: "#ffffff",
          },

          {
            id: uniqueid(),
            label: "استفاده از رنگ تم سایت",
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
            label: "رنگ تم کارت‌ها",
            type: "color",
            key: "card_theme_color",
            default_value: "#325767",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "نمایش‌ها",
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
            label: "نمایش دکمه افزودن",
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
