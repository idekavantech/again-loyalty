import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import uniqueId from "lodash/uniqueId";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_IMAGE_GALLERY } from "@saas/utils/constants/sections";

const imageGallery = [
  // گالری تصاویر
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
            label: "متن عنوان",
            default_value: "تصاویر",
            key: "value",
            type: "text",
          },

          {
            id: uniqueid(),
            label: "از رنگ تم سایت استفاده شود.",
            default_value: false,
            key: "use_theme_color",
            type: "switch",
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3", "type_1"],
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
                  type: ["type_3", "type_1"],
                },
              },
              {
                fields: {
                  use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ عنوان",
            default_value: "#111111",
            key: "color",
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
            options: [
              {
                id: uniqueId(),
                label: "کوچک",
                value: 18,
              },
              {
                id: uniqueId(),
                label: "متوسط",
                value: 20,
              },
              {
                id: uniqueId(),
                label: "بزرگ",
                value: 24,
              },
            ],
            label: "اندازه فونت عنوان",
            default_value: 18,
            key: "font_size",
            type: "select",
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
        label: "تصاویر",
        key: "images",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "افزودن تصویر جدید",
        min_items: 1,
        default_items: [
          {
            internal_link: "/",
            external_link: "/",
            url: `${CDN_BASE_URL}food-1.jpg`,
            alternative: "",
            image_action: "has_no_link",
          },
          {
            internal_link: "/",
            external_link: "/",
            url: `${CDN_BASE_URL}food-2.jpg`,
            alternative: "",
            image_action: "has_no_link",
          },
          {
            internal_link: "/",
            external_link: "/",
            url: `${CDN_BASE_URL}food-3.jpg`,
            alternative: "",
            image_action: "has_no_link",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "انتخاب اکشن موس",
            default_value: "has_no_link",
            key: "image_action",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "بدون لینک",
                value: "has_no_link",
              },
              {
                id: uniqueId(),
                label: "با لینک خارجی",
                value: HAS_EXTERNAL_LINK,
              },
              {
                id: uniqueId(),
                label: "با لینک داخلی",
                value: HAS_INTERNAL_LINK,
              },
              {
                id: uniqueId(),
                label: "دارای مودال",
                value: "has_modal",
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
            label: "لینک داخلی",
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
            label: "لینک خارجی",
            default_value: "/",
            type: "text",
            key: "external_link",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "عکس",
            default_value: "",
            key: "url",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
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
            label: "متن روی تصویر",
            default_value: "",
            type: "text",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "اندازه فونت",
            key: "font_size",
            default_value: "medium",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "کوچک",
                value: "small",
                // value: ["2vw", "7.5vw", "1.6vw"],
              },
              {
                id: uniqueid(),
                label: "متوسط",
                value: "medium",
                // value: ["3vw", "9vw", "2.4vw"],
              },
              {
                id: uniqueid(),
                label: "بزرگ",
                value: "large",
                // value: ["4vw", "16vw", "4vw"],
              },
            ],
          },

          {
            id: uniqueid(),
            label: "از رنگ تم سایت استفاده شود.",
            default_value: true,
            key: "title_use_theme_color",
            type: "switch",
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  title_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ متن روی تصویر",
            default_value: "#000000",
            key: "title_color",
            type: "color",
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
              type: ["type_2"],
            },
          },
        ],
        id: uniqueid(),
        label: "محتوای تب‌ها",
        key: "tab_content",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "افزودن آیتم جدید",
        default_items: [
          {
            image: `${CDN_BASE_URL}mock8.jpg`,
            alternative: "",
            link: "/",
          },
          {
            image: `${CDN_BASE_URL}mock18.jpg`,
            alternative: "",
            link: "/",
          },
          {
            image: `${CDN_BASE_URL}mock19.jpg`,
            alternative: "",
            link: "/",
          },
        ],
        items_fields: [
          {
            custom_options_config: {
              tab_key: "content",
              item_key: "tab_content",
              field_key: "tabs",
            },
            id: uniqueid(),
            label: "انتخاب تب",
            type: "custom_select",
            key: "tab",
          },
          {
            ...sectionsConfigTabsRepeatedParts["image_uploader"],
            key: "image",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "لینک",
            default_value: "/",
            type: "text",
            key: "link",
            className: "direction-ltr",
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "ایجاد تب‌ها با فشردن دکمه اینتر",
            default_value: [
              { id: uniqueid(), label: "تب‌۱" },
              { id: uniqueid(), label: "تب‌۲" },
              { id: uniqueid(), label: "تب‌۳" },
            ],
            key: "tabs",
            type: "chip_input",
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
            default_value: sectionsLayout[SECTION_IMAGE_GALLERY][0].value,
            options: sectionsLayout[SECTION_IMAGE_GALLERY],
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
        label: "تنظیمات",
        key: "setting",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            options: [
              {
                id: uniqueId(),
                label: "دو",
                value: 2,
              },
              {
                id: uniqueId(),
                label: "سه",
                value: 3,
              },
              {
                id: uniqueId(),
                label: "چهار",
                value: 4,
              },
              {
                id: uniqueId(),
                label: "پنج",
                value: 5,
              },
            ],
            label: "تعداد ستون‌ها در دسکتاپ",
            default_value: 3,
            key: "desktop_columns",
            type: "select",
          },
          {
            id: uniqueid(),
            options: [
              {
                id: uniqueId(),
                label: "یک",
                value: 1,
              },
              {
                id: uniqueId(),
                label: "دو",
                value: 2,
              },
              {
                id: uniqueId(),
                label: "سه",
                value: 3,
              },
            ],
            label: "تعداد ستون‌ها در موبایل",
            default_value: 3,
            key: "mobile_columns",
            type: "select",
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
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
                  type: ["type_3"],
                },
              },
            ],
            id: uniqueid(),
            options: [
              {
                id: uniqueId(),
                label: "یک",
                value: 1,
              },
              {
                id: uniqueId(),
                label: "دو",
                value: 2,
              },
              {
                id: uniqueId(),
                label: "سه",
                value: 3,
              },
            ],
            label: "تعداد ستون‌ها در موبایل",
            default_value: 2,
            key: "mobile_columns_type_3",
            type: "select",
          },
          {
            id: uniqueid(),
            label: "حداکثر تعداد عکس قابل مشاهده",
            default_value: 9,
            key: "max_items",
            type: "number",
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
            label: "انتخاب ابعاد عکس",
            default_value: "square",
            key: "image_size_type_1",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "مربع",
                value: "square",
              },
              {
                id: uniqueId(),
                label: "مستطیل افقی",
                value: "horizontal_rectangle",
              },
              {
                id: uniqueId(),
                label: "مستطیل عمودی",
                value: "rectangle",
              },
            ],
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
            label: "انتخاب ابعاد عکس",
            default_value: "rectangle",
            key: "image_size_type_3",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "مربع",
                value: "square",
              },
              {
                id: uniqueId(),
                label: "مستطیل افقی",
                value: "horizontal_rectangle",
              },
              {
                id: uniqueId(),
                label: "مستطیل عمودی",
                value: "rectangle",
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
            label: "نمایش آیتم‌ها به صورت وسط چین",
            default_value: false,
            type: "switch",
            key: "align",
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
        label: "اندازه سکشن",
        key: "section_size",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "عرض سکشن",
            default_value: "container",
            type: "select",
            key: "main_width",
            options: [
              {
                id: uniqueid(),
                label: "تمام صفحه",
                value: "w-100",
              },
              {
                id: uniqueid(),
                label: "با فاصله",
                value: "container",
              },
            ],
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
        label: "بک‌گراند",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "انتخاب نوع پس زمینه",
            default_value: "color",
            key: "background_type",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "عکس",
                value: "image",
              },
              {
                id: uniqueId(),
                label: "رنگ",
                value: "color",
              },
            ],
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
            ],
            id: uniqueid(),
            label: "آپلود عکس جداگانه برای موبایل",
            default_value: false,
            type: "switch",
            key: "should_upload_seperate_image_for_mobile",
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
            default_value: "#FFFFFF",
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
              type: ["type_3"],
            },
          },
        ],
        id: uniqueid(),
        label: "هاله روی تصویر آیتم",
        key: "overlay",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "رنگ هاله",
            default_value: "#FFFFFF",
            key: "overlay_color",
            type: "color",
          },
        ],
      },
    ],
  },
];

export default imageGallery;
