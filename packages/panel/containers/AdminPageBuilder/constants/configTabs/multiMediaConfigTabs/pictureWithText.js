import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { LOREM_IPSUM_SHORT } from "../sharedConstants";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_PICTURE_WITH_TEXT } from "@saas/utils/constants/sections";

const pictureWithText = [
  // عکس به همراه متن
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
            label: "عنوان بخش",
            type: "text",
            key: "value",
            default_value: "عنوان بخش",
          },
          {
            id: uniqueid(),
            label: "رنگ عنوان",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "اندازه فونت",
            key: "font_size",
            default_value: "20px",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "HTML تگ",
            key: "html_tag",
            default_value: "h1",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "h1",
                value: "h1",
              },
              {
                id: uniqueid(),
                label: "h2",
                value: "h2",
              },
              {
                id: uniqueid(),
                label: "h3",
                value: "h3",
              },
              {
                id: uniqueid(),
                label: "h4",
                value: "h4",
              },
              {
                id: uniqueid(),
                label: "h5",
                value: "h5",
              },
              {
                id: uniqueid(),
                label: "h6",
                value: "h6",
              },
              {
                id: uniqueid(),
                label: "div",
                value: "div",
              },
              {
                id: uniqueid(),
                label: "span",
                value: "span",
              },
              {
                id: uniqueid(),
                label: "p",
                value: "p",
              },
            ],
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
            label: "توضیحات بخش",
            type: "richtext",
            key: "value",
            default_value: LOREM_IPSUM_SHORT,
          },
        ],
      },
      {
        id: uniqueid(),
        label: "عکس",
        key: "image",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "آپلود عکس",
            type: "image_uploader",
            key: "value",
            default_value: `${CDN_BASE_URL}/home7_img_01.png`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "دکمه",
        key: "button",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "متن",
            type: "text",
            key: "value",
            default_value: "بیشتر",
          },
          {
            id: uniqueid(),
            label: "لینک",
            type: "text",
            key: "link",
            default_value: "/",
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
            default_value: sectionsLayout[SECTION_PICTURE_WITH_TEXT][0].value,
            options: sectionsLayout[SECTION_PICTURE_WITH_TEXT],
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
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_2", "type_1"],
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
    ],
  },
];

export default pictureWithText;
