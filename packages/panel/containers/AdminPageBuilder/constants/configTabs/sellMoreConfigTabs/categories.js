import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { coal } from "@saas/utils/colors";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_CATEGORIES } from "@saas/utils/constants/sections";

const categories = [
  // categories
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "Title",
        key: "title",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Title",
            default_value: "Title",
            key: "value",
            type: "text",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: "type_1",
                },
              },
            ],
            id: uniqueid(),
            label: "Title color",
            default_value: "#ffffff",
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
            fields: {
              type: "type_1",
            },
          },
        ],
        id: uniqueid(),
        label: "Picture",
        key: "image",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Upload a Photo",
            default_value: `${CDN_BASE_URL}mock27.svg`,
            key: "value",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: "type_1",
            },
          },
        ],
        id: uniqueid(),
        label: "background",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "The background color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
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
              type: "type_1",
            },
          },
        ],
        id: uniqueid(),
        label: "Cards",
        key: "cards",
        element_id: "section_9_cards",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        add_new_item_text: "Add new card",
        max_items: 10,
        min_items: 4,
        default_items: [
          {
            title: "Title",
            subtitle: "Substitious title",
            link: "/",
            image: `${CDN_BASE_URL}mock27.svg`,
            alternative: "",
          },
          {
            title: "Title",
            subtitle: "Substitious title",
            link: "/",
            image: `${CDN_BASE_URL}mock28.svg`,
            alternative: "",
          },
          {
            title: "Title",
            subtitle: "Substitious title",
            link: "/",
            image: `${CDN_BASE_URL}mock29.svg`,
            alternative: "",
          },
          {
            title: "Title",
            subtitle: "Substitious title",
            link: "/",
            image: `${CDN_BASE_URL}mock30.svg`,
            alternative: "",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "Title",
            default_value: "Title",
            type: "text",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "Underwent",
            default_value: "Sour",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "link",
            default_value: "/",
            key: "link",
            type: "link",
          },
          {
            id: uniqueid(),
            label: "Picture",
            default_value: `${CDN_BASE_URL}mock27.svg`,
            key: "image",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
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
              type: "type_2",
            },
          },
        ],
        id: uniqueid(),
        label: "Buttons text",
        key: "buttons",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "The desired text",
            default_value: "More",
            key: "value",
            type: "text",
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
        id: uniqueid(),
        label: "categories",
        key: "categories",
        element_id: "section_20_categories",
        description: "",
        has_multiple_items: true,
        extendable_items: false,
        max_items: 6,
        min_items: 6,
        default_items: [
          {
            title: "Category title",
            subtitle: "Category Description",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock4.jpg`,
            alternative: "",
          },
          {
            title: "Category title",
            subtitle: "Category Description",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock5.jpg`,
            alternative: "",
          },
          {
            title: "Category title",
            subtitle: "Category Description",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock6.jpg`,
            alternative: "",
          },
          {
            title: "Category title",
            subtitle: "Category Description",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock7.jpg`,
            alternative: "",
          },
          {
            title: "Category title",
            subtitle: "Category Description",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock4.jpg`,
            alternative: "",
          },
          {
            title: "Category title",
            subtitle: "Category Description",
            texts_color: coal,
            link: "/",
            image: `${CDN_BASE_URL}mock5.jpg`,
            alternative: "",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "Title",
            default_value: "Category title",
            type: "text",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "Sour",
            default_value: "Category Description",
            type: "text",
            key: "subtitle",
          },
          {
            id: uniqueid(),
            label: "The color of the text",
            default_value: coal,
            key: "texts_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "link",
            default_value: "/",
            type: "text",
            key: "link",
          },
          {
            id: uniqueid(),
            label: "Picture",
            default_value: `${CDN_BASE_URL}mock4.jpg`,
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
            default_value: sectionsLayout[SECTION_CATEGORIES][0].value,
            options: sectionsLayout[SECTION_CATEGORIES],
          },
        ],
      },
    ],
  },
];

export default categories;
