import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import {
  coal,
  jungleI,
  oceanIII,
  strawberryII,
  strawberryIII,
} from "@saas/utils/colors";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";
import uniqueId from "lodash/uniqueId";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_GENERAL_BANNER } from "@saas/utils/constants/sections";

const generalBanner = [
  // بنر عمومی
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "بنر ۱",
        key: "banner_1",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "image",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
            ],
            tooltip: "600 * 500",
          },
          {
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "image",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2"],
                },
              },
            ],
            tooltip: "600 * 350",
          },
          {
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "image",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
            tooltip: "700 * 700",
          },
          {
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "image",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            tooltip: "600 * 300",
          },
          {
            id: uniqueid(),
            label: "اپلود عکس جداگانه برای موبایل",
            type: "switch",
            key: "having_banner_image_for_mobile",
            default_value: false,
          },

          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "600 * 500",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "500 * 350",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "500 * 410",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "400 * 345",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "عنوان",
            default_value: "عنوان",
            type: "text",
            key: "title",
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
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ ‌عنوان",
            default_value: "#ffffff",
            key: "title_color",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "زیر‌عنوان",
            default_value: "زیر‌عنوان",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "اندازه فونت زیر عنوان",
            key: "subtitle_font_size",
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
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2", "type_4"],
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
                  type: ["type_1", "type_2"],
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ زیر‌عنوان",
            default_value: "#ffffff",
            key: "subtitle_color",
            type: "color",
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
            label: "رنگ اول",
            default_value: strawberryIII,
            key: "secondary_color",
            type: "color",
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
            label: "رنگ دوم",
            default_value: strawberryII,
            key: "primary_color",
            type: "color",
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
            label: "لینک",
            default_value: "/",
            key: "link",
            type: "link",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "انتخاب لینک داخلی یا خارجی",
            default_value: HAS_INTERNAL_LINK,
            key: "link_type",
            type: "select",
            options: [
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
            ],
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
              {
                fields: {
                  link_type: HAS_INTERNAL_LINK,
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
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
              {
                fields: {
                  link_type: HAS_EXTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "لینک خارجی",
            default_value: "/",
            key: "external_link",
            type: "text",
            className: "direction-ltr",
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
            label: "رنگ پس زمینه",
            default_value: strawberryIII,
            key: "background_color",
            type: "color",
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
            label: "رنگ زمینه‌ی متن",
            default_value: strawberryII,
            key: "text_background",
            type: "color",
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
            label: "رنگ متن دکمه",
            default_value: "#ffffff",
            type: "color",
            key: "button_text_color",
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
            label: "رنگ دکمه",
            default_value: strawberryIII,
            key: "button_background",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_3", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "متن دکمه",
            default_value: "بیشتر",
            type: "text",
            key: "button_text",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "لینک دکمه",
            default_value: "/",
            type: "text",
            key: "button_link",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "قیمت",
            default_value: "123123123",
            key: "price",
            type: "text",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ متن‌ها",
            default_value: coal,
            key: "texts_color",
            type: "color",
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
            label: "استفاده از رنگ تم برای پس زمینه",
            type: "switch",
            key: "banner_use_theme_color",
            default_value: true,
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
              {
                fields: {
                  banner_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ پس‌زمینه",
            default_value: "#8CEC79",
            key: "background_color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "بنر ۲",
        key: "banner_2",
        element_id: null,
        description: "",
        fields: [
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
            label: "آپلود عکس",
            type: "image_uploader",
            key: "image",
            tooltip: "500 * 350",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
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
            label: "آپلود عکس",
            type: "image_uploader",
            key: "image",
            tooltip: "600 * 350",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
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
            label: "آپلود عکس",
            type: "image_uploader",
            key: "image",
            tooltip: "500 * 500",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "image",
            tooltip: "600 * 300",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            id: uniqueid(),
            label: "اپلود عکس جداگانه برای موبایل",
            type: "switch",
            key: "having_banner_image_for_mobile",
            default_value: false,
          },

          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            tooltip: "500 * 350",
            key: "banner_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            tooltip: "300 * 300",
            key: "banner_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            tooltip: "400 * 345",
            key: "banner_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock2.jpg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "عنوان",
            default_value: "عنوان",
            type: "text",
            key: "title",
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
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ ‌عنوان",
            default_value: "#ffffff",
            key: "title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "زیر‌عنوان",
            default_value: "زیر‌عنوان",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "اندازه فونت زیر عنوان",
            key: "subtitle_font_size",
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
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ زیر‌عنوان",
            default_value: "#ffffff",
            key: "subtitle_color",
            type: "color",
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
            label: "لینک",
            default_value: "/",
            key: "link",
            type: "link",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "انتخاب لینک داخلی یا خارجی",
            default_value: HAS_INTERNAL_LINK,
            key: "link_type",
            type: "select",
            options: [
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
            ],
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
              {
                fields: {
                  link_type: HAS_INTERNAL_LINK,
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
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
              {
                fields: {
                  link_type: HAS_EXTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "لینک خارجی",
            default_value: "/",
            key: "external_link",
            type: "text",
            className: "direction-ltr",
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
            label: "رنگ اول",
            default_value: strawberryIII,
            key: "secondary_color",
            type: "color",
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
            label: "رنگ دوم",
            default_value: strawberryII,
            key: "primary_color",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1", "type_3", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "متن دکمه",
            default_value: "بیشتر",
            type: "text",
            key: "button_text",
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
            label: "رنگ زمینه‌ی متن",
            default_value: jungleI,
            key: "text_background",
            type: "color",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3", "type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "لینک دکمه",
            default_value: "/",
            type: "text",
            key: "button_link",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "قیمت",
            default_value: "123123123",
            key: "price",
            type: "text",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_4"],
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ متن‌ها",
            default_value: coal,
            key: "texts_color",
            type: "color",
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
            label: "رنگ متن دکمه",
            default_value: "#ffffff",
            type: "color",
            key: "button_text_color",
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
            label: "رنگ دکمه",
            default_value: "#66DFC0",
            key: "button_background",
            type: "color",
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
            label: "استفاده از رنگ تم برای پس زمینه",
            type: "switch",
            key: "banner_use_theme_color",
            default_value: true,
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
              {
                fields: {
                  banner_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "رنگ پس‌زمینه",
            default_value: "#8CEC79",
            key: "background_color",
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
        id: uniqueid(),
        label: "بنر ۳",
        key: "banner_3",
        element_id: null,
        description: "",
        fields: [
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
            label: "آپلود عکس",
            type: "image_uploader",
            tooltip: "500 * 350",
            key: "image",
            default_value: `${CDN_BASE_URL}mock3.jpg`,
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
            label: "آپلود عکس",
            type: "image_uploader",
            tooltip: "500 * 500",
            key: "image",
            default_value: `${CDN_BASE_URL}mock3.jpg`,
          },
          {
            id: uniqueid(),
            label: "اپلود عکس جداگانه برای موبایل",
            type: "switch",
            key: "having_banner_image_for_mobile",
            default_value: false,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "500 * 350",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
            ],
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "300 * 300",
            default_value: `${CDN_BASE_URL}mock1.jpg`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
          {
            id: uniqueid(),
            label: "عنوان",
            default_value: "عنوان",
            type: "text",
            key: "title",
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
            label: "رنگ ‌عنوان",
            default_value: "#ffffff",
            key: "title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "زیر‌عنوان",
            default_value: "زیر‌عنوان",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "اندازه فونت زیر عنوان",
            key: "subtitle_font_size",
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
            label: "رنگ زیر‌عنوان",
            default_value: "#ffffff",
            key: "subtitle_color",
            type: "color",
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
            label: "لینک",
            default_value: "/",
            key: "link",
            type: "link",
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
            label: "رنگ اول",
            default_value: strawberryIII,
            key: "secondary_color",
            type: "color",
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
            label: "رنگ دوم",
            default_value: strawberryII,
            key: "primary_color",
            type: "color",
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
            label: "رنگ زمینه‌ی متن",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "text_background",
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
            label: "متن دکمه",
            default_value: "بیشتر",
            type: "text",
            key: "button_text",
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
            label: "لینک دکمه",
            default_value: "/",
            type: "text",
            key: "button_link",
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
            label: "رنگ متن دکمه",
            default_value: "#ffffff",
            type: "color",
            key: "button_text_color",
            className: "direction-ltr",
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
            label: "رنگ دکمه",
            default_value: oceanIII,
            key: "button_background",
            type: "color",
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
            default_value: sectionsLayout[SECTION_GENERAL_BANNER][0].value,
            options: sectionsLayout[SECTION_GENERAL_BANNER],
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_1", "type_2"],
            },
          },
        ],
        id: uniqueId(),
        label: "نمایش‌ها",
        key: "shows",
        element_id: null,
        description: "",
        fields: [
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
            label: "انتخاب کارت",
            key: "banner",
            default_value: "banner_1",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "کارت ۱",
                value: "banner_1",
              },
              {
                id: uniqueId(),
                label: "کارت ۲",
                value: "banner_2",
              },
              {
                id: uniqueId(),
                label: "کارت ۳",
                value: "banner_3",
              },
            ],
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_4"],
                },
              },
            ],
            id: uniqueId(),
            label: "انتخاب کارت",
            key: "banner",
            default_value: "banner_1",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "کارت ۱",
                value: "banner_1",
              },
              {
                id: uniqueId(),
                label: "کارت ۲",
                value: "banner_2",
              },
            ],
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_1" },
              },
            ],
            id: uniqueid(),
            label: "نمایش عنوان",
            default_value: true,
            key: "banner_1_show_title",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_1" },
              },
            ],
            id: uniqueid(),
            label: "نمایش زیرعنوان",
            default_value: true,
            key: "banner_1_show_subtitle",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_1" },
              },
            ],
            id: uniqueid(),
            label: "نمایش دکمه",
            default_value: true,
            key: "banner_1_show_button",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_1" },
              },
            ],
            id: uniqueid(),
            label: "نمایش زیر متن",
            default_value: true,
            key: "banner_1_show_all",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_2" },
              },
            ],
            id: uniqueid(),
            label: "نمایش عنوان",
            default_value: true,
            key: "banner_2_show_title",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1", "type_2"],
                },
              },
              {
                fields: { banner: "banner_2" },
              },
            ],
            id: uniqueid(),
            label: "نمایش زیرعنوان",
            default_value: true,
            key: "banner_2_show_subtitle",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_2" },
              },
            ],
            id: uniqueid(),
            label: "نمایش دکمه",
            default_value: true,
            key: "banner_2_show_button",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_2"],
                },
              },
              {
                fields: { banner: "banner_2" },
              },
            ],
            id: uniqueid(),
            label: "نمایش زیر متن",
            default_value: true,
            key: "banner_2_show_all",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_3" },
              },
            ],
            id: uniqueid(),
            label: "نمایش دکمه",
            default_value: true,
            key: "banner_3_show_button",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_3" },
              },
            ],
            id: uniqueid(),
            label: "نمایش عنوان",
            default_value: true,
            key: "banner_3_show_title",
            type: "switch",
          },
          {
            dependencies: [
              {
                item: "layout",
                fields: {
                  type: ["type_1"],
                },
              },
              {
                fields: { banner: "banner_3" },
              },
            ],
            id: uniqueid(),
            label: "نمایش زیرعنوان",
            default_value: true,
            key: "banner_3_show_subtitle",
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
              type: ["type_1", "type_2", "type_4"],
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

export default generalBanner;
