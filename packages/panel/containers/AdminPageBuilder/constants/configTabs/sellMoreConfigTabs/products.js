import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";
import { CDN_BASE_URL } from "@saas/utils/api";
import uniqueId from "lodash/uniqueId";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_PRODUCTS } from "@saas/utils/constants/sections";

const products = [
  // محصولات
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
            type: "text",
            key: "value",
            default_value: "عنوان",
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
            fields: {
              type: "type_2",
            },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "زیر‌عنوان",
            default_value: "عنوان فرعی",
            key: "value",
            type: "text",
          },

          {
            id: uniqueid(),
            label: "رنگ زیرعنوان از رنگ تم پیروی کند.",
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
            label: "رنگ زیرعنوان",
            type: "color",
            key: "color",
            default_value: "#000000",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "بخش‌ها",
        key: "sections",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "افزودن بخش جدید",
        max_items: 20,
        min_items: 2,
        default_items: [
          {
            title: "عنوان",
            subtitle: "عنوان فرعی",
            texts_color: "#ffffff",
            link_type: HAS_INTERNAL_LINK,
            internal_link: "/",
            external_link: "/",
            image: `${CDN_BASE_URL}mock18.jpg`,
          },
          {
            title: "عنوان",
            subtitle: "عنوان فرعی",
            texts_color: "#ffffff",
            link_type: HAS_INTERNAL_LINK,
            internal_link: "/",
            external_link: "/",
            image: `${CDN_BASE_URL}mock19.jpg`,
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
            label: "زیرعنوان",
            default_value: "عنوان فرعی",
            type: "text",
            key: "subtitle",
          },
          {
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
            id: uniqueid(),
            label: "عکس",
            default_value: `${CDN_BASE_URL}mock24.jpg`,
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
            default_value: sectionsLayout[SECTION_PRODUCTS][0].value,
            options: sectionsLayout[SECTION_PRODUCTS],
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

export default products;
