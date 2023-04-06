import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import uniqueId from "lodash/uniqueId";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_RECOMMENDED_LABEL } from "@saas/utils/constants/sections";

const recommendedLabel = [
  // برچسب پیشنهادی
  {
    ...sectionsConfigTabsRepeatedParts["content"],

    items: [
      {
        id: uniqueId(),
        label: "بخش همه‌ی محصولات",
        key: "intro_card",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_2",
            },
          },
        ],
        fields: [
          {
            id: uniqueId(),
            label: "عکس",
            default_value: `https://www.digikala.com/static/files/b6c724a0.png`,
            key: "intro_image",
            type: "image_uploader",
          },
          {
            id: uniqueId(),
            label: "متن دکمه  (زیر 15 حرف باشد)",
            default_value: "مشاهده‌ی همه",
            key: "value",
            type: "text",
          },
          {
            id: uniqueId(),
            label: "رنگ دکمه",
            default_value: "#ffffff",
            key: "button_color",
            type: "color",
          },
          {
            id: uniqueId(),
            label: "لینک دکمه",
            default_value: "/",
            key: "link",
            type: "link",
          },
        ],
      },
      {
        id: uniqueId(),
        label: "انتخاب برچسب",
        key: "category_id",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "برچسب",
            default_value: "",
            key: "value",
            type: "category_select",
          },
        ],
      },
      {
        id: uniqueId(),
        label: "مدت زمان تخفیف",
        key: "discount_time",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_2",
            },
          },
        ],
        fields: [
          {
            id: uniqueId(),
            label: "وجود زمان برای پایان یافتن تخفیف",
            default_value: false,
            key: "has_deadline",
            type: "checkbox",
          },
          {
            id: uniqueId(),
            dependencies: [
              {
                fields: {
                  has_deadline: true,
                },
              },
            ],
            label: "انتخاب تاریخ پایان یافتن تخفیف",
            default_value: "",
            key: "value",
            type: "date_time_picker",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "عنوان برچسب",
        key: "title",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_1", "type_3"],
            },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "عنوان",
            type: "text",
            key: "value",
            default_value: "عنوان",
          },
          {
            id: uniqueid(),
            label: "اندازه فونت عنوان",
            key: "font_size",
            default_value: "medium",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "خیلی کوچک",
                value: "extraSmall",
              },
              ...sectionsConfigTabsRepeatedParts["size_options"],
              {
                id: uniqueid(),
                label: " خیلی بزرگ",
                value: "extraLarge",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "رنگ عنوان از رنگ تم پیروی کند.",
            type: "checkbox",
            key: "color_use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  color_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ عنوان",
            type: "color",
            key: "color",
            default_value: "#000000",
          },
          {
            id: uniqueid(),
            label: "رنگ خط زیر عنوان از رنگ تم پیروی کند.",
            type: "checkbox",
            key: "underline_color_use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  underline_color_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ خط زیر عنوان",
            type: "color",
            key: "underline_color",
            default_value: "#000000",
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
            default_value: sectionsLayout[SECTION_RECOMMENDED_LABEL][0].value,
            options: sectionsLayout[SECTION_RECOMMENDED_LABEL],
          },
        ],
      },
      {
        id: uniqueId(),
        label: "رنگ پس زمینه",
        key: "background_color",
        element_id: null,
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_2",
            },
          },
        ],
        fields: [
          {
            id: uniqueId(),
            label: "رنگ بک گراند",
            default_value: "#ef394e",
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
              type: ["type_1", "type_3"],
            },
          },
        ],
        id: uniqueId(),
        label: "تنظیمات اسلایدر",
        key: "slider_setting",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "حرکت اتوماتیک",
            default_value: false,
            key: "autoplay",
            type: "switch",
          },
          {
            dependencies: [
              {
                fields: {
                  autoplay: true,
                },
              },
            ],
            id: uniqueId(),
            label: "فاصله زمانی حرکت اتوماتیک محصولات (به میلی ثانیه) ",
            default_value: 3000,
            key: "timer",
            type: "number",
          },
          {
            id: uniqueId(),
            label: "حرکت به صورت بی‌انتها",
            default_value: false,
            key: "infinite",
            type: "switch",
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
        id: uniqueId(),
        label: "تنظیمات اسلایدر",
        key: "slider_setting",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueId(),
            label: "حرکت اتوماتیک",
            default_value: false,
            key: "autoplay",
            type: "switch",
          },

          {
            id: uniqueId(),
            label: "فاصله زمانی حرکت اتوماتیک محصولات (به میلی ثانیه) ",
            default_value: 4000,
            key: "timer",
            type: "number",
          },
          {
            id: uniqueId(),
            label: "حرکت به صورت بی‌انتها",
            default_value: false,
            key: "infinite",
            type: "switch",
          },
          {
            id: uniqueId(),
            label: "(به میلی ثانیه) سرعت حرکت",
            default_value: 500,
            key: "speed",
            type: "number",
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

export default recommendedLabel;
