import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_SPECIAL_BANNER } from "@saas/utils/constants/sections";
import uniqueId from "lodash/uniqueId";
import { LOREM_IPSUM_SHORT } from "../sharedConstants";

const specialBanner = [
  // بنر ویژه
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "عنوان",
        key: "title",
        element_id: "theme_1_title",
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "متن عنوان",
            default_value: "عنوان",
            key: "value",
            type: "text",
            rowsMax: 4,
            multiline: true,
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
            key: "use_theme_color",
            type: "switch",
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
            label: "رنگ عنوان",
            key: "color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "زیر عنوان",
        key: "slogan",
        element_id: "theme_1_slogan",
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "زیر عنوان",
            default_value: "زیر عنوان",
            key: "value",
            type: "text",
            rowsMax: 8,
            multiline: true,
          },
          {
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "از رنگ تم سایت استفاده شود.",
            key: "use_theme_color",
            default_value: true,
            type: "switch",
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
            key: "color",
            label: "رنگ زیر عنوان",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "توضیحات",
        key: "description_text",
        element_id: "theme_1_description",
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "متن توضیحات",
            default_value: LOREM_IPSUM_SHORT,
            key: "value",
            type: "text",
            multiline: true,
          },
          {
            id: uniqueid(),
            label: "اندازه فونت",
            default_value: "medium",
            key: "font_size",
            type: "select",
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "از رنگ تم سایت استفاده شود.",
            key: "use_theme_color",
            default_value: true,
            type: "switch",
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
            key: "color",
            label: "رنگ توضیحات",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "عکس پس‌زمینه",
        key: "background_image",
        element_id: null,
        // description: "حجم عکس زیر ۲ میگابایت باشد",
        fields: [
          {
            id: uniqueid(),
            label: "اپلود عکس",
            type: "image_uploader",
            default_value: `${CDN_BASE_URL}mock8.jpg`,
            key: "value",
            tooltip: "340 X 600",
          },
          {
            id: uniqueid(),
            label: "اپلود عکس جداگانه برای موبایل",
            type: "switch",
            key: "has_banner_image_for_mobile",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: {
                  has_banner_image_for_mobile: true,
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock8.jpg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "لایه رنگی روی عکس",
            type: "switch",
            default_value: true,
            key: "has_overlay",
          },
          {
            id: uniqueid(),
            label: "تصویر پارالکس شود.",
            default_value: false,
            key: "parallax",
            type: "switch",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "دکمه‌ها",
        key: "buttons",
        element_id: "theme_1_buttons",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        min_items: 1,
        max_items: 8,
        add_new_item_text: "افزودن دکمه جدید",
        items_fields: [
          {
            id: uniqueid(),
            label: "لینک دکمه",
            default_value: "link",
            key: "link_type",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "لینک",
                value: "link",
              },
              {
                id: uniqueid(),
                label: "‌شماره تلفن",
                value: "phone_num",
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: "link",
                },
              },
            ],

            id: uniqueid(),
            label: "متن دکمه",
            default_value: "متن دکمه",
            type: "text",
            key: "text",
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: "phone_num",
                },
              },
            ],
            id: uniqueid(),
            label: "متن دکمه",
            default_value: "تماس",
            type: "text",
            key: "num",
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: "link",
                },
              },
            ],

            id: uniqueid(),
            label: "لینک دکمه",
            default_value: "/",
            type: "text",
            key: "link",
            className: "direction-ltr",
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: "phone_num",
                },
              },
            ],

            id: uniqueid(),
            label: "‌شماره تلفن",
            default_value: "",
            type: "text",
            inputType: "number",
            key: "phone_num",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "نوع دکمه",
            default_value: "contained",
            type: "select",
            key: "variant",
            options: [
              {
                id: uniqueid(),
                label: "تو پر",
                value: "contained",
              },
              {
                id: uniqueid(),
                label: "تو خالی",
                value: "outlined",
              },
              {
                id: uniqueid(),
                label: "متنی",
                value: "text",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "شکل دکمه",
            default_value: "normal",
            type: "select",
            key: "button_shape",
            options: [
              {
                id: uniqueid(),
                label: "بیضی",
                value: "rounded",
              },
              {
                id: uniqueid(),
                label: "مستطیل",
                value: "normal",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "استفاده از رنگ تم",
            type: "checkbox",
            key: "use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  variant: "contained",
                  use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ بکگراند دکمه",
            type: "color",
            key: "background_color",
          },
          {
            dependencies: [
              {
                fields: {
                  variant: "outlined",
                  use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ خط دور دکمه",
            type: "color",
            key: "border_color",
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
            label: "رنگ متن دکمه",
            type: "color",
            key: "color",
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "استفاده از دکمه‌های پیشفرض",
            type: "switch",
            key: "use_default_buttons",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "اندازه دکمه",
            default_value: "__medium",
            key: "button_size",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "کوچک",
                value: "__small",
              },
              {
                id: uniqueid(),
                label: "متوسط",
                value: "__medium",
              },
              {
                id: uniqueid(),
                label: "بزرگ",
                value: "__large",
              },
            ],
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
            default_value: sectionsLayout[SECTION_SPECIAL_BANNER][0].value,
            options: sectionsLayout[SECTION_SPECIAL_BANNER],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "ارتفاع‌ها",
        key: "heights",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "دارای نسبت عرض به ارتفاع ثابت در موبایل",
            type: "switch",
            key: "use_ratio_height_in_mobile",
            default_value: false,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "heights",
                fields: { use_ratio_height_in_mobile: false },
              },
            ],
            id: uniqueid(),
            label: "ارتفاع سکشن در موبایل",
            default_value: "60vh",
            type: "select",
            key: "mobile_height",
            options: [
              {
                id: uniqueid(),
                label: "خیلی کوتاه",
                value: "20vh",
              },
              {
                id: uniqueid(),
                label: "کوتاه",
                value: "30vh",
              },
              {
                id: uniqueid(),
                label: "متوسط",
                value: "40vh",
              },
              {
                id: uniqueid(),
                label: "بلند",
                value: "50vh",
              },
              {
                id: uniqueid(),
                label: "خیلی بلند",
                value: "60vh",
              },
            ],
          },

          {
            dependencies: [
              {
                fields: { use_ratio_height_in_mobile: true },
              },
            ],
            id: uniqueid(),
            label: "نسبت عرض به ارتفاع سکشن در موبایل",
            default_value: "16:9",
            type: "select",
            key: "mobile_ratio",
            options: [
              {
                id: uniqueid(),
                label: "9:16 (600 * 340)",
                value: "9:16",
              },
              {
                id: uniqueid(),
                label: "3:4 (600 * 450)",
                value: "3:4",
              },
              {
                id: uniqueid(),
                label: "1:1 (600 * 600)",
                value: "1:1",
              },
              {
                id: uniqueid(),
                label: "5:4 (480 * 600)",
                value: "5:4",
              },
              {
                id: uniqueid(),
                label: "4:3 (450 * 600)",
                value: "4:3",
              },
              {
                id: uniqueid(),
                label: "3:2 (400 * 600)",
                value: "3:2",
              },
              {
                id: uniqueid(),
                label: "16:10 (375 * 800)",
                value: "16:10",
              },
              {
                id: uniqueid(),
                label: "16:9 (340 * 600)",
                value: "16:9",
              },
              {
                id: uniqueid(),
                label: "2:1 (300 * 600)",
                value: "2:1",
              },
              {
                id: uniqueid(),
                label: "3:1 (200 * 600)",
                value: "3:1",
              },
              {
                id: uniqueid(),
                label: "6:1 (100 * 600)",
                value: "6:1",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "دارای نسبت عرض به ارتفاع ثابت در دسکتاپ",
            type: "switch",
            key: "use_ratio_height_in_desktop",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: { use_ratio_height_in_desktop: false },
              },
            ],
            id: uniqueid(),
            label: "ارتفاع سکشن در دسکتاپ",
            default_value: "80vh",
            type: "select",
            key: "desktop_height",
            options: [
              {
                id: uniqueid(),
                label: "خیلی کوتاه",
                value: "40vh",
              },
              {
                id: uniqueid(),
                label: "کوتاه",
                value: "50vh",
              },
              {
                id: uniqueid(),
                label: "متوسط",
                value: "60vh",
              },
              {
                id: uniqueid(),
                label: "بلند",
                value: "70vh",
              },
              {
                id: uniqueid(),
                label: "خیلی بلند",
                value: "80vh",
              },
            ],
          },
          {
            dependencies: [
              {
                fields: { use_ratio_height_in_desktop: true },
              },
            ],
            id: uniqueid(),
            label: "نسبت عرض به ارتفاع سکشن در دسکتاپ",
            default_value: "16:9",
            type: "select",
            key: "desktop_ratio",
            options: [
              {
                id: uniqueid(),
                label: "9:16 (1200 * 675)",
                value: "9:16",
              },
              {
                id: uniqueid(),
                label: "3:4 (1200 * 900)",
                value: "3:4",
              },
              {
                id: uniqueid(),
                label: "1:1 (1200 * 1200)",
                value: "1:1",
              },
              {
                id: uniqueid(),
                label: "5:4 (960 * 1200)",
                value: "5:4",
              },
              {
                id: uniqueid(),
                label: "3:2 (800 * 1200)",
                value: "3:2",
              },
              {
                id: uniqueid(),
                label: "16:10 (750 * 1200)",
                value: "16:10",
              },
              {
                id: uniqueid(),
                label: "16:9 (675 * 1200)",
                value: "16:9",
              },
              {
                id: uniqueid(),
                label: "2:1 (600 * 1200)",
                value: "2:1",
              },
              {
                id: uniqueid(),
                label: "3:1 (400 * 1200)",
                value: "3:1",
              },
              {
                id: uniqueid(),
                label: "6:1 (200 * 1200)",
                value: "6:1",
              },
            ],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "بک‌گراند",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "انتخاب نوع پس زمینه",
            default_value: "image",
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

            id: uniqueId(),
            label: "وضوح عکس",
            default_value: "80",
            key: "opacity",
            type: "slider",
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
            default_value: "#f2e9ea",
            key: "color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "نمایش‌ها",
        key: "showcases",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "نمایش عنوان",
            default_value: true,
            type: "switch",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "نمایش زیر عنوان",
            default_value: true,
            type: "switch",
            key: "slogan",
          },
          {
            id: uniqueid(),
            label: "نمایش توضیحات",
            default_value: true,
            type: "switch",
            key: "description",
          },
          {
            id: uniqueid(),
            label: "نمایش دکمه‌ها",
            default_value: true,
            type: "switch",
            key: "buttons",
          },
        ],
      },

      {
        id: uniqueid(),
        label: "اندازه سکشن",
        key: "section_size",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "عرض سکشن",
            default_value: "w-100",
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
        id: uniqueId(),
        label: "محل نمایش محتوا روی تصویر",
        key: "content_location",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "انتخاب محل محتوا",
            key: "value",
            default_value: "center",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "وسط",
                value: "center",
              },
              {
                id: uniqueId(),
                label: "بالا وسط",
                value: "top_center",
              },
              {
                id: uniqueId(),
                label: "پایین وسط",
                value: "bottom_center",
              },
              {
                id: uniqueId(),
                label: "وسط راست",
                value: "center_right",
              },
              {
                id: uniqueId(),
                label: "پایین راست",
                value: "bottom_right",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default specialBanner;
