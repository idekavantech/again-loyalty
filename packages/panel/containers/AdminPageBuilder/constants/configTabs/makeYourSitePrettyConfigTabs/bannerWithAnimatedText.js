import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_BANNER_WITH_ANIMATED_TEXT } from "@saas/utils/constants/sections";
import uniqueId from "lodash/uniqueId";

const bannerWithAnimatedText = [
  // بنر همراه با متن متحرک
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1", "type_3"] },
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
            default_value: `${CDN_BASE_URL}mock43.png`,
            key: "value",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
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
            label: "عنوان",
            default_value: "عنوان",
            key: "value",
            type: "text",
            multiline: true,
          },

          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_1", "type_3"] },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
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
        label: "زیرعنوان",
        key: "subtitle",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1", "type_3"] },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "زیر‌عنوان",
            default_value: "زیرعنوان",
            key: "value",
            type: "text",
            multiline: true,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_1", "type_3"] },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "رنگ زیر‌عنوان",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
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
            fields: { type: ["type_3"] },
          },
        ],
        id: uniqueid(),
        label: "قیمت",
        key: "price",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "قیمت",
            default_value: "123123123",
            key: "value",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "رنگ قیمت",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
          {
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_3"] },
          },
        ],
        id: uniqueid(),
        label: "واحد شمارش",
        key: "unit_count",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "واحد",
            default_value: "تومان",
            key: "value",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "رنگ واحد",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "اندازه واحد",
            key: "font_size",
            default_value: "medium",
            type: "select",
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1", "type_3"] },
          },
        ],
        id: uniqueid(),
        label: "توضیحات",
        key: "description",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "توضیحات",
            default_value: "تومان فروش شما چقدر خواهد بود؟",
            key: "value",
            type: "text",
            multiline: true,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_1", "type_3"] },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "رنگ توضیحات",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "متن متحرک",
        key: "animation",
        element_id: null,
        description: "برای اضافه کردن جمله متحرک بعدی اینتر بزنید",
        fields: [
          {
            id: uniqueid(),
            label: "متن متحرک",
            default_value: "ایده‌های شما\nبرای کسب‌وکار شما\nبا فروش آنلاین",
            key: "value",
            type: "text",
            multiline: true,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_1", "type_3"] },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["font_size"],
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
          {
            id: uniqueid(),
            label: "رنگ متن متحرک",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
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
            fields: { type: ["type_2", "type_3"] },
          },
        ],
        id: uniqueid(),
        label: "انیمیشن",
        key: "background_animation",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "رنگ زمینه انیمیشن",
            default_value: "rgba(32, 197, 186, 1)",
            key: "color",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: { type: ["type_3"] },
              },
            ],
            id: uniqueid(),
            label: "رنگ زمینه مریع‌ها",
            default_value: "rgba(255, 255, 255, 0.2)",
            key: "square_color",
            type: "color",
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
        max_items: 2,
        min_items: 1,
        add_new_item_text: "افزودن دکمه جدید",
        items_fields: [
          {
            id: uniqueid(),
            label: "لینک دکمه",
            default_value: "link",
            key: "slide_link_type",
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
                fields: { slide_link_type: ["link"] },
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
                fields: { slide_link_type: ["phone_num"] },
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
                fields: { slide_link_type: ["link"] },
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
                fields: { slide_link_type: ["phone_num"] },
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
            default_value: "small",
            key: "button_size",
            type: "select",
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
        ],
      },
    ],
  },
  {
    label: "شخصی سازی",
    key: "customization",
    id: uniqueid(),
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value:
              sectionsLayout[SECTION_BANNER_WITH_ANIMATED_TEXT][0].value,
            options: sectionsLayout[SECTION_BANNER_WITH_ANIMATED_TEXT],
          },
        ],
      },

      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1", "type_3"] },
          },
        ],
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
            key: "subtitle",
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
            label: "نمایش قیمت",
            default_value: true,
            type: "switch",
            key: "price",
          },
          {
            id: uniqueid(),
            label: "نمایش واحد",
            default_value: false,
            type: "switch",
            key: "unit_count",
          },
          {
            id: uniqueid(),
            label: "نمایش عکس",
            default_value: true,
            type: "switch",
            key: "background_image",
          },
          {
            id: uniqueid(),
            label: "نمایش متن متحرک",
            default_value: true,
            type: "switch",
            key: "animation",
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
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: { type: ["type_1"] },
          },
        ],
        id: uniqueid(),
        label: "بک گراند",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "رنگ پس‌زمینه",
            default_value: "#ffffff",
            key: "color",
            type: "color",
          },
        ],
      },
    ],
  },
];

export default bannerWithAnimatedText;
