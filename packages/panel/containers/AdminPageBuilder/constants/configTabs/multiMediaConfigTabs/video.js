import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { LOREM_IPSUM_SHORT } from "../sharedConstants";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_VIDEO } from "@saas/utils/constants/sections";
import uniqueId from "lodash/uniqueId";

const video = [
  // ویدئو
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

            default_value: "black",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "اندازه فونت",
            default_value: "medium",
            key: "font_size",
            type: "select",
            options: [...sectionsConfigTabsRepeatedParts["size_options"]],
          },
        ],
      },

      {
        id: uniqueid(),
        label: "ویدئو",
        key: "video",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "کد امبد",
            type: "text",
            key: "value",
            multiline: true,
            InputProps: { style: { height: "unset" } },
            style: { direction: "ltr" },
            default_value: "",
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
            default_value: sectionsLayout[SECTION_VIDEO][0].value,
            options: sectionsLayout[SECTION_VIDEO],
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
            label: "عرض سکشن ها",
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
            label: "نمایش توضیحات",
            default_value: true,
            type: "switch",
            key: "description",
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
    ],
  },
];

export default video;
