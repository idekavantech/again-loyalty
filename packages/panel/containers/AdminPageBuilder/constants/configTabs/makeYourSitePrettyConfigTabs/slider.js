import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import uniqueId from "lodash/uniqueId";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_SLIDER } from "@saas/utils/constants/sections";

const slider = [
  // اسلایدر
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "اسلاید‌ها",
        key: "slides",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 8,
        min_items: 3,
        add_new_item_text: "افزودن اسلاید جدید",
        default_items: [
          {
            slide_image: `${CDN_BASE_URL}mock48.jpg`,
            slide_image_in_mobile: ``,
            alternative: "",
            is_title_visible: true,
            slide_title: "عنوان",
            slide_title_color: "#ffffff",
            slide_title_use_theme_color: true,
            slide_description_use_theme_color: true,
            is_description_visible: true,
            slide_description: "توضیحات",
            slide_description_color: "#ffffff",
            slide_has_link: false,
            slide_internal_link: "/",
            slide_external_link: "/",
            slide_link_type: "internal",
            slider_has_button: true,
            button_text: "متن دکمه",
            button_link_type: "button_has_internal_link",
            button_internal_link: "/",
            button_external_link: "",
            button_variant: "contained",
            button_use_theme_color: true,
            button_background_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_border_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_color: "#ffffff",
            type: "type_1",
            location: "center_right",
            button_shape: "normal",
          },
          {
            slide_image: `${CDN_BASE_URL}mock49.jpg`,
            slide_image_in_mobile: ``,
            alternative: "",
            is_title_visible: true,
            slide_title: "عنوان",
            slide_title_color: "#ffffff",
            slide_title_use_theme_color: true,
            slide_description_use_theme_color: true,
            is_description_visible: true,
            slide_description: "توضیحات",
            slide_description_color: "#ffffff",
            slide_has_link: false,
            slide_internal_link: "/",
            slide_external_link: "/",
            slide_link_type: "internal",
            slider_has_button: true,
            button_text: "متن دکمه",
            button_link_type: "button_has_internal_link",
            button_internal_link: "/",
            button_external_link: "",
            button_variant: "contained",
            button_use_theme_color: true,
            button_background_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_border_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_color: "#ffffff",
            type: "type_1",
            location: "center_right",
            button_shape: "normal",
          },
          {
            slide_image: `${CDN_BASE_URL}mock50.jpg`,
            slide_image_in_mobile: ``,

            alternative: "",
            is_title_visible: true,
            slide_title: "عنوان",
            slide_title_color: "#ffffff",
            slide_title_use_theme_color: true,
            slide_description_use_theme_color: true,
            is_description_visible: true,
            slide_description: "توضیحات",
            slide_description_color: "#ffffff",
            slide_has_link: false,
            slide_internal_link: "/",
            slide_external_link: "/",
            slide_link_type: "internal",
            slider_has_button: true,
            button_text: "متن دکمه",
            button_link_type: "button_has_internal_link",
            button_internal_link: "/",
            button_external_link: "",
            button_variant: "contained",
            button_use_theme_color: true,
            button_background_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_border_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_color: "#ffffff",
            type: "type_1",
            location: "center_right",
            button_shape: "normal",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "قالب اسلاید",
            default_value: "type_1",
            type: "layout_select",
            options: [
              {
                id: uniqueid(),
                value: "type_1",
                image: `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/banner-01.png`,
                label: "قالب ۱",
              },
              {
                id: uniqueid(),
                value: "type_2",
                image: `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/slider-01.png`,
                label: "قالب ۲",
              },
              {
                id: uniqueid(),
                value: "type_3",
                image: `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/slider-02.png`,
                label: "قالب ۳",
              },
            ],
            key: "type",
          },
          {
            dependencies: [
              {
                fields: {
                  type: "type_1",
                },
              },
            ],
            id: uniqueId(),
            label: "انتخاب محل محتوا",
            key: "location",
            default_value: "center",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "وسط وسط",
                value: "center",
              },
              {
                id: uniqueId(),
                label: "وسط بالا",
                value: "top_center",
              },
              {
                id: uniqueId(),
                label: "وسط پایین",
                value: "bottom_center",
              },
              {
                id: uniqueId(),
                label: "راست وسط",
                value: "center_right",
              },
              {
                id: uniqueId(),
                label: "راست پایین",
                value: "bottom_right",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "slide_image",
            default_value: `${CDN_BASE_URL}mock48.jpg`,
          },
          {
            id: uniqueid(),
            label: "اپلود عکس جداگانه برای موبایل",
            type: "switch",
            key: "having_slide_image_for_mobile",
            default_value: true,
          },

          {
            dependencies: [
              {
                fields: {
                  having_slide_image_for_mobile: true,
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "slide_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock48.jpg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "نمایش عنوان",
            type: "checkbox",
            key: "is_title_visible",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  is_title_visible: true,
                },
              },
            ],
            id: uniqueid(),
            label: "متن عنوان",
            default_value: "عنوان",
            type: "text",
            key: "slide_title",
          },

          {
            dependencies: [
              {
                fields: {
                  is_title_visible: true,
                },
              },
            ],
            id: uniqueid(),
            label: "اندازه فونت",
            key: "slide_title_font_size",
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
            dependencies: [
              {
                fields: {
                  is_title_visible: true,
                },
              },
            ],
            id: uniqueid(),
            label: "از رنگ تم سایت استفاده شود.",
            default_value: true,
            key: "slide_title_use_theme_color",
            type: "switch",
          },
          {
            dependencies: [
              {
                fields: {
                  is_title_visible: true,
                  slide_title_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            default_value: "#ffffff",
            label: "رنگ عنوان",
            key: "slide_title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "نمایش توضیحات",
            type: "checkbox",
            key: "is_description_visible",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  is_description_visible: true,
                },
              },
            ],
            id: uniqueid(),
            label: "متن توضیحات",
            default_value: "توضیحات",
            type: "text",
            key: "slide_description",
          },
          {
            dependencies: [
              {
                fields: {
                  is_description_visible: true,
                },
              },
            ],
            id: uniqueid(),
            label: "اندازه فونت",
            key: "slide_description_font_size",
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
            dependencies: [
              {
                fields: {
                  is_description_visible: true,
                },
              },
            ],
            id: uniqueid(),
            label: "از رنگ تم سایت استفاده شود.",
            default_value: true,
            key: "slide_description_use_theme_color",
            type: "switch",
          },
          {
            dependencies: [
              {
                fields: {
                  is_description_visible: true,
                  slide_description_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            default_value: "#ffffff",
            label: "رنگ توضیحات",
            key: "slide_description_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "دارای لینک",
            type: "checkbox",
            key: "slide_has_link",
            default_value: false,
          },
          {
            id: uniqueid(),
            label: "نوع لینک",
            dependencies: [
              {
                fields: {
                  slide_has_link: true,
                },
              },
            ],
            default_value: "internal",
            type: "select",
            key: "slide_link_type",
            options: [
              {
                id: uniqueid(),
                label: "داخلی",
                value: "internal",
              },
              {
                id: uniqueid(),
                label: "خارجی",
                value: "external",
              },
            ],
          },
          {
            id: uniqueid(),
            dependencies: [
              {
                fields: {
                  slide_has_link: true,
                  slide_link_type: "internal",
                },
              },
            ],
            label: "لینک داخلی",
            default_value: "/",
            type: "link",
            key: "slide_internal_link",
          },
          {
            id: uniqueid(),
            dependencies: [
              {
                fields: {
                  slide_has_link: true,
                  slide_link_type: "external",
                },
              },
            ],
            label: "لینک خارجی",
            default_value: "/",
            type: "text",
            key: "slide_external_link",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "دارای دکمه",
            type: "checkbox",
            key: "slider_has_button",
            default_value: true,
          },
          {
            id: uniqueid(),
            dependencies: [
              {
                fields: {
                  slider_has_button: true,
                },
              },
            ],
            label: "متن دکمه",
            default_value: "متن دکمه",
            type: "text",
            key: "button_text",
          },
          {
            dependencies: [
              {
                fields: {
                  slider_has_button: true,
                },
              },
            ],
            id: uniqueid(),
            label: "انتخاب لینک داخلی یا خارجی",
            default_value: "button_has_internal_link",
            key: "button_link_type",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "با لینک خارجی",
                value: "button_has_external_link",
              },
              {
                id: uniqueId(),
                label: "با لینک داخلی",
                value: "button_has_internal_link",
              },
            ],
          },
          {
            id: uniqueid(),
            dependencies: [
              {
                fields: {
                  slider_has_button: true,
                  button_link_type: "button_has_internal_link",
                },
              },
            ],
            label: "لینک داخلی",
            default_value: "/",
            type: "link",
            key: "button_internal_link",
            className: "direction-ltr",
          },
          {
            dependencies: [
              {
                fields: {
                  slider_has_button: true,
                  button_link_type: "button_has_external_link",
                },
              },
            ],
            id: uniqueid(),
            label: "لینک خارجی",
            default_value: "",
            key: "button_external_link",
            type: "text",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            dependencies: [
              {
                fields: {
                  slider_has_button: true,
                },
              },
            ],
            label: "نوع دکمه",
            default_value: "contained",
            type: "select",
            key: "button_variant",
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
            dependencies: [
              {
                fields: {
                  slider_has_button: true,
                },
              },
            ],
            id: uniqueid(),
            label: "اندازه دکمه",
            default_value: "small",
            key: "button_size",
            type: "select",
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            dependencies: [
              {
                fields: {
                  slider_has_button: true,
                },
              },
            ],
            id: uniqueid(),
            label: "شکل دکمه",
            default_value: "normal",
            type: "select",
            key: "button_shape",
            options: [
              {
                id: uniqueid(),
                label: "مستطیل",
                value: "normal",
              },
              {
                id: uniqueid(),
                label: "بیضی",
                value: "rounded",
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  slider_has_button: true,
                },
              },
            ],
            id: uniqueid(),
            label: "استفاده از رنگ تم",
            type: "checkbox",
            key: "button_use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  button_variant: "contained",
                  button_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ بکگراند دکمه",
            type: "color",
            key: "button_background_color",
          },
          {
            dependencies: [
              {
                fields: {
                  button_variant: "outlined",
                  button_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ خط دور دکمه",
            type: "color",
            key: "button_border_color",
          },
          {
            dependencies: [
              {
                fields: {
                  button_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ متن دکمه",
            type: "color",
            key: "button_color",
          },
        ],
        fields: [],
      },
      {
        id: uniqueid(),
        label: "تنظیمات اسلایدر",
        key: "configs",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "(به میلی ثانیه) فاصله زمانی بین هر اسلاید",
            type: "number",
            key: "timer",
            default_value: 3000,
          },
          {
            id: uniqueid(),
            label: "(به میلی ثانیه) سرعت ورق خوردن اسلایدر",
            type: "number",
            key: "speed",
            default_value: 300,
          },
          {
            id: uniqueid(),
            label: "نقاط پایین اسلایدر",
            type: "switch",
            key: "dots",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "اجرا شدن به صورت اتوماتیک",
            type: "switch",
            key: "autoplay",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "فلش‌های دو طرف",
            type: "switch",
            key: "arrows",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "تعداد اسلایدهای در حال نمایش",
            type: "number",
            key: "slides_to_show",
            default_value: 1,
          },
          {
            id: uniqueid(),
            label: "تعداد اسلایدهایی که ورق زده میشوند",
            type: "number",
            key: "slides_to_scroll",
            default_value: 1,
          },
          {
            id: uniqueid(),
            label: "راست به چپ",
            type: "switch",
            key: "rtl",
            default_value: false,
          },
          {
            id: uniqueid(),
            label: "عمودی",
            type: "switch",
            key: "vertical",
            default_value: false,
          },
          {
            id: uniqueid(),
            label: "حالت مرکزی",
            type: "switch",
            key: "center_mode",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: {
                  center_mode: true,
                },
              },
            ],
            id: uniqueid(),
            label: "فاصله مرکزیت",
            type: "number",
            key: "center_padding",
            default_value: 30,
          },
          {
            id: uniqueid(),
            label: "فاصله بین اسلایدها",
            default_value: 0,
            type: "select",
            key: "space_between_slides",
            options: [
              {
                id: uniqueid(),
                label: "بی فاصله",
                value: 0,
              },
              {
                id: uniqueid(),
                label: "۱",
                value: 1,
              },
              {
                id: uniqueid(),
                label: "۲",
                value: 2,
              },
              {
                id: uniqueid(),
                label: "۳",
                value: 3,
              },
              {
                id: uniqueid(),
                label: "۴",
                value: 4,
              },
              {
                id: uniqueid(),
                label: "۵",
                value: 5,
              },
            ],
          },
          {
            id: uniqueid(),
            label: "انیمیشن اسلایدها",
            default_value: "slide",
            type: "select",
            key: "animation",
            options: [
              {
                id: uniqueid(),
                label: "fade",
                value: "fade",
              },
              {
                id: uniqueid(),
                label: "slide",
                value: "slide",
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
            default_value: sectionsLayout[SECTION_SLIDER][0].value,
            options: sectionsLayout[SECTION_SLIDER],
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
            default_value: "60vh",
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
        label: "رنگ‌ها",
        key: "colors",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "رنگ فلش‌ها",
            default_value: "#ffffff",
            type: "color",
            key: "arrows_color",
          },
          {
            id: uniqueid(),
            label: "رنگ نقاط پایین اسلایدر",
            default_value: "#ffffff",
            type: "color",
            key: "dots_color",
          },
          {
            id: uniqueid(),
            label: "رنگ بکگراند اسلایدر",
            default_value: "#ffffff",
            type: "color",
            key: "background_color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "قاب‌بندی",
        key: "framing",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "دارای قاب‌بندی برای دسکتاپ",
            type: "switch",
            key: "use_framing_in_desktop",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: { use_framing_in_desktop: true },
              },
            ],
            id: uniqueid(),
            label: "ضخامت قاب",
            default_value: 10,
            type: "number",
            key: "border_width_in_desktop",
          },
          {
            dependencies: [
              {
                fields: { use_framing_in_desktop: true },
              },
            ],
            id: uniqueid(),
            label: "استفاده از رنگ تم برای دور قاب",
            type: "checkbox",
            key: "use_theme_color_for_border_color_in_desktop",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  use_framing_in_desktop: true,
                  use_theme_color_for_border_color_in_desktop: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ دور قاب",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            type: "color",
            key: "border_color_in_desktop",
          },
          {
            dependencies: [
              {
                fields: {
                  use_framing_in_desktop: true,
                },
              },
            ],
            id: uniqueid(),
            label: "اندازه انحنا دور حاشیه",
            default_value: 8,
            type: "number",
            key: "border_radius_in_desktop",
          },

          {
            id: uniqueid(),
            label: "دارای قاب‌بندی برای موبایل",
            type: "switch",
            key: "use_framing_in_mobile",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: { use_framing_in_mobile: true },
              },
            ],
            id: uniqueid(),
            label: "ضخامت قاب",
            default_value: 10,
            type: "number",
            key: "border_width_in_mobile",
          },
          {
            dependencies: [
              {
                fields: { use_framing_in_mobile: true },
              },
            ],
            id: uniqueid(),
            label: "استفاده از رنگ تم برای دور قاب",
            type: "checkbox",
            key: "use_theme_color_for_border_color_in_mobile",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  use_framing_in_mobile: true,
                  use_theme_color_for_border_color_in_mobile: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ دور قاب",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            type: "color",
            key: "border_color_in_mobile",
          },
          {
            dependencies: [
              {
                fields: {
                  use_framing_in_mobile: true,
                },
              },
            ],
            id: uniqueid(),
            label: "اندازه انحنا دور حاشیه",
            default_value: 8,
            type: "number",
            key: "border_radius_in_mobile",
          },
        ],
      },
    ],
  },
];

export default slider;
