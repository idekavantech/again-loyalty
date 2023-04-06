import { CDN_BASE_URL } from "@saas/utils/api";
import { LOREM_IPSUM_SHORT } from "../sharedConstants";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_TESTIMONIALS } from "@saas/utils/constants/sections";

const testimonials = [
  // نقل قول مشتریان
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
        ],
      },
      {
        id: uniqueid(),
        label: "توضیحات",
        key: "description",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "توضیحات",
            default_value: LOREM_IPSUM_SHORT,
            key: "value",
            type: "richtext",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "نقل‌قول‌ها",
        key: "quotes",
        element_id: "section_10_quotes",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 10,
        min_items: 1,
        add_new_item_text: "افزودن نقل‌قول جدید",
        default_items: [
          {
            title: "عنوان",
            subtitle: "عنوان فرعی",
            description: LOREM_IPSUM_SHORT,
            image: `${CDN_BASE_URL}mock31.png`,
          },
          {
            title: "عنوان",
            subtitle: "عنوان فرعی",
            description: LOREM_IPSUM_SHORT,
            image: `${CDN_BASE_URL}mock32.png`,
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
            label: "توضیحات",
            default_value: LOREM_IPSUM_SHORT,
            key: "description",
            type: "richtext",
          },
          {
            id: uniqueid(),
            label: "عکس",
            default_value: `${CDN_BASE_URL}mock31.png`,
            key: "image",
            type: "image_uploader",
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
            default_value: sectionsLayout[SECTION_TESTIMONIALS][0].value,
            options: sectionsLayout[SECTION_TESTIMONIALS],
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

export default testimonials;
