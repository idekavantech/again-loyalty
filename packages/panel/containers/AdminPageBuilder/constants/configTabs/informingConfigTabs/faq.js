import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_FAQ } from "@saas/utils/constants/sections";
import uniqueId from "lodash/uniqueId";

const faq = [
  // سوالات متداول
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "پس‌زمینه",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "رنگ پس‌زمینه",
            default_value: "#F1F5FF",
            key: "color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "عنوان",
        key: "title",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "عنوان مورد نظر",
            default_value: "سایت تو با ویترین",
            key: "value",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "رنگ عنوان",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "سوالات",
        key: "questions",
        element_id: "section_31_questions",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 15,
        min_items: 2,
        add_new_item_text: "افزودن سوال جدید",
        default_items: [
          {
            title: "مجموع فروش سایت‌هایی که با ویترین ساخته شده‌اند.",
            title_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            description: "مجموع فروش سایت‌هایی که با ویترین ساخته شده‌اند.",
            description_color: "#000000",
          },
          {
            title: "مجموع فروش سایت‌هایی که با ویترین ساخته شده‌اند.",
            title_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            description: "مجموع فروش سایت‌هایی که با ویترین ساخته شده‌اند.",
            description_color: "#000000",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "عنوان",
            default_value: "مجموع فروش سایت‌هایی که با ویترین ساخته شده‌اند.",
            type: "text",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "رنگ عنوان",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "توضیحات",
            default_value: "مجموع فروش سایت‌هایی که با ویترین ساخته شده‌اند.",
            type: "richtext",
            key: "description",
          },
          {
            id: uniqueid(),
            label: "رنگ توضیحات",
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
            label: "رنگ پس‌زمینه",
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
