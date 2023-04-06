import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { coal } from "@saas/utils/colors";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_CATEGORIES } from "@saas/utils/constants/sections";

const categories = [
  // دسته‌بندی‌‌ها
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "عنوان",
        key: "title",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "عنوان",
            default_value: "عنوان",
            key: "value",
            type: "text",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: "type_1",
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ عنوان",
            default_value: "#ffffff",
            key: "color",
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
              type: "type_1",
            },
          },
        ],
        id: uniqueid(),
        label: "عکس",
        key: "image",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "آپلود عکس",
            default_value: `${CDN_BASE_URL}mock27.svg`,
            key: "value",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_1",
            },
          },
        ],
        id: uniqueid(),
        label: "پس‌زمینه",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "رنگ پس‌زمینه",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "value",
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
              type: "type_1",
            },
          },
        ],
        id: uniqueid(),
        label: "کارت‌ها",
        key: "cards",
        element_id: "section_9_cards",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "افزودن کارت جدید",
        max_items: 10,
        min_items: 4,
        default_items: [
          {
            title: "عنوان",
            subtitle: "عنوان فرعی",
            link: "/",
            image: `${CDN_BASE_URL}mock27.svg`,
            alternative: "",
          },
          {
            title: "عنوان",
            subtitle: "عنوان فرعی",
            link: "/",
            image: `${CDN_BASE_URL}mock28.svg`,
            alternative: "",
          },
          {
            title: "عنوان",
            subtitle: "عنوان فرعی",
            link: "/",
            image: `${CDN_BASE_URL}mock29.svg`,
            alternative: "",
          },
          {
            title: "عنوان",
            subtitle: "عنوان فرعی",
            link: "/",
            image: `${CDN_BASE_URL}mock30.svg`,
            alternative: "",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "عنوان",
            default_value: "عنوان",
            type: "text",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "زیر‌عنوان",
            default_value: "زیرعنوان",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "لینک",
            default_value: "/",
            key: "link",
            type: "link",
          },
          {
            id: uniqueid(),
            label: "عکس",
            default_value: `${CDN_BASE_URL}mock27.svg`,
            key: "image",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
        ],
        fields: [],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_2",
            },
          },
        ],
        id: uniqueid(),
        label: "متن دکمه‌ها",
        key: "buttons",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "متن مورد نظر",
            default_value: "بیشتر",
            key: "value",
            type: "text",
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_2",
            },
          },
        ],
        id: uniqueid(),
        label: "دسته‌بندی‌ها",
        key: "categories",
        element_id: "section_20_categories",
        description: "",
        has_multiple_items: true,
        extendable_items: false,
        max_items: 6,
        min_items: 6,
        default_items: [
          {
            title: "عنوان دسته‌بندی",
            subtitle: "توضیحات دسته‌بندی‌",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock4.jpg`,
            alternative: "",
          },
          {
            title: "عنوان دسته‌بندی",
            subtitle: "توضیحات دسته‌بندی‌",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock5.jpg`,
            alternative: "",
          },
          {
            title: "عنوان دسته‌بندی",
            subtitle: "توضیحات دسته‌بندی‌",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock6.jpg`,
            alternative: "",
          },
          {
            title: "عنوان دسته‌بندی",
            subtitle: "توضیحات دسته‌بندی‌",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock7.jpg`,
            alternative: "",
          },
          {
            title: "عنوان دسته‌بندی",
            subtitle: "توضیحات دسته‌بندی‌",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock4.jpg`,
            alternative: "",
          },
          {
            title: "عنوان دسته‌بندی",
            subtitle: "توضیحات دسته‌بندی‌",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock5.jpg`,
            alternative: "",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "عنوان",
            default_value: "عنوان دسته‌بندی",
            type: "text",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "زیرعنوان",
            default_value: "توضیحات دسته‌بندی‌",
            type: "text",
            key: "subtitle",
          },
          {
            id: uniqueid(),
            label: "رنگ متن‌ها",
            default_value: coal,
            key: "texts_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "لینک",
            default_value: "/",
            type: "text",
            key: "link",
          },
          {
            id: uniqueid(),
            label: "عکس",
            default_value: `${CDN_BASE_URL}mock4.jpg`,
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
            default_value: sectionsLayout[SECTION_CATEGORIES][0].value,
            options: sectionsLayout[SECTION_CATEGORIES],
          },
        ],
      },
    ],
  },
];

export default categories;
