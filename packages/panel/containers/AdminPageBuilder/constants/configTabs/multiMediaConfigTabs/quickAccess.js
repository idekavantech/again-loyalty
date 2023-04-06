import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_QUICK_ACCESS } from "@saas/utils/constants/sections";

const quickAccess = [
  // دسترسی سریع
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "عکس",
        key: "image",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "آپلود عکس",
            default_value: `${CDN_BASE_URL}mock3.jpg`,
            key: "value",
            type: "image_uploader",
          },
          {
            id: uniqueid(),
            label: "متن جایگزین عکس",
            default_value: "ویترین",
            key: "alt",
            type: "text",
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
          {
            id: uniqueid(),
            label: "اندازه فونت",
            key: "font_size",
            default_value: "20px",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "HTML تگ",
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
            label: "نوع چینش",
            key: "position",
            default_value: "right",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "سمت راست",
                value: "right",
              },
              {
                id: uniqueid(),
                label: "سمت چپ",
                value: "left",
              },
              {
                id: uniqueid(),
                label: "وسط",
                value: "center",
              },
            ],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "رنگ موزاییک‌ها",
        key: "squares_colors",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "رنگ عنوان‌ها",
            default_value: "rgba(32, 197, 186, 1)",
            key: "color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "رنگ زمینه",
            default_value: "rgba(255, 255, 255, 0.2)",
            key: "background_color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "مربع‌ها",
        key: "squares",
        element_id: "section_34_squares",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 20,
        min_items: 1,
        add_new_item_text: "افزودن موزاییک جدید",
        default_items: [],
        items_fields: [
          {
            id: uniqueid(),
            label: "متن دکمه",
            default_value: "متن دکمه",
            type: "text",
            key: "text",
          },
          {
            id: uniqueid(),
            label: "لینک دکمه",
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
        label: "نمایش",
        key: "showcases",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "نمایش عکس",
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
