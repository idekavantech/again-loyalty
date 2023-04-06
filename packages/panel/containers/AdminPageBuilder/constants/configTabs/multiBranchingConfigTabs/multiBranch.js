import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_MULTI_BRANCH } from "@saas/utils/constants/sections";
import { LOREM_IPSUM_SHORT } from "../sharedConstants";

const multiBranch = [
  // نمایش شعبه‌ها روی نقشه
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
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
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
        label: "شعبه‌ها",
        key: "branches",
        element_id: "section_25_branches",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 100,
        min_items: 2,
        add_new_item_text: "افزودن شعبه جدید",
        default_items: [
          {
            name: "ولیعصر",
            address: LOREM_IPSUM_SHORT,
            phone: "123123123",
            tooltip: "عنوان شعبه",
            button_text: "برو به شعبه",
            button_link: "/",
            latitude: "35.7492649",
            longitude: "51.1928452",
            image: `${CDN_BASE_URL}mock9.png`,
          },
          {
            name: "ولیعصر",
            address: LOREM_IPSUM_SHORT,
            phone: "123123123",
            tooltip: "عنوان شعبه",
            button_text: "برو به شعبه",
            button_link: "/",
            latitude: "35.7492649",
            longitude: "51.1928452",
            image: `${CDN_BASE_URL}mock9.png`,
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "نام شعبه",
            default_value: "ولیعصر",
            type: "text",
            key: "name",
          },
          {
            id: uniqueid(),
            label: "آدرس شعبه",
            default_value: LOREM_IPSUM_SHORT,
            key: "address",
            edit_button_text: "وارد کردن آدرس",
            type: "richtext",
          },
          {
            id: uniqueid(),
            label: "نام شعبه",
            default_value: "ولیعصر",
            type: "text",
            key: "tooltip",
          },
          {
            id: uniqueid(),
            label: "تلفن شعبه",
            default_value: "123123123",
            key: "phone",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "متن دکمه",
            default_value: "برو به شعبه",
            type: "text",
            key: "button_text",
          },
          {
            id: uniqueid(),
            label: "لینک دکمه",
            default_value: "/",
            type: "text",
            key: "button_link",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "طول جغرافیایی",
            default_value: "35.7492649",
            key: "latitude",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "عرض جغرافیایی",
            default_value: "51.1928452",
            key: "longitude",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "عکس شعبه",
            default_value: `${CDN_BASE_URL}mock9.png`,
            key: "image",
            type: "image_uploader",
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
              type: ["type_1"],
            },
          },
        ],
        id: uniqueid(),
        label: "دکمه‌ها",
        key: "buttons",
        element_id: "section_25_buttons",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 3,
        min_items: 1,
        add_new_item_text: "افزودن دکمه جدید",
        items_fields: [
          {
            id: uniqueid(),
            label: "لینک دکمه",
            default_value: "ordering",
            key: "link_type",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "سفارش‌گیری",
                value: "ordering",
              },
              {
                id: uniqueid(),
                label: "‌شماره تلفن",
                value: "phone_num",
              },
              {
                id: uniqueid(),
                label: "‌مسیریابی",
                value: "routing",
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: "ordering",
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
            label: "اندازه دکمه",
            default_value: "medium",
            type: "select",
            key: "size",
            options: [
              {
                id: uniqueid(),
                label: "متوسط",
                value: "medium",
              },
              {
                id: uniqueid(),
                label: "بزرگ",
                value: "large",
              },
              {
                id: uniqueid(),
                label: "کوچک",
                value: "small",
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
            default_value: "#000",
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
            default_value: "#000",
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
            default_value: sectionsLayout[SECTION_MULTI_BRANCH][0].value,
            options: sectionsLayout[SECTION_MULTI_BRANCH],
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
        label: "نمایش",
        key: "showing_branches",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "نمایش عکس‌ها",
            type: "switch",
            default_value: true,
            key: "show_image",
          },
          {
            id: uniqueid(),
            label: "سفارش می‌پذیریم",
            type: "switch",
            default_value: true,
            key: "has_ordering",
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
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
                },
              },
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
    ],
  },
];

export default multiBranch;
