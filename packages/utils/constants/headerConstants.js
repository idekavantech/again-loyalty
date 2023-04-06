import { uniqueid } from "../helpers/uniqueid";

import {
  HEADER_10,
  HEADER_11,
  HEADER_3,
  HEADER_4,
  HEADER_5,
  HEADER_6,
  HEADER_7,
  HEADER_8,
  HEADER_9,
} from "./headers";
import { HAS_EXTERNAL_LINK, HAS_INTERNAL_LINK } from "./builderConstants";

export const header_3_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/header_2.png`;
export const header_4_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/header_1.png`;
export const header_5_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/header_3.png`;
export const header_6_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/header_4.png`;
export const header_7_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/header_5.png`;
export const header_8_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/header_8.png`;
export const header_9_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/header_9.png`;
export const header_10_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/header_10.png`;
export const header_11_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/header_11.png`;
export const HEADER_OVER_POSITION = "HEADER_OVER_POSITION";
export const HEADER_ABOVE_POSITION = "HEADER_ABOVE_POSITION";
export const HEADER_LOGO_VISIBILITY = "HEADER_LOGO_VISIBILITY";
export const HEADER_TITLE_VISIBILITY = "HEADER_TITLE_VISIBILITY";
export const HEADER_SEARCH_VISIBILITY = "HEADER_SEARCH_VISIBILITY";
export const HEADER_CATEGORIES_VISIBILITY = "HEADER_CATEGORIES_VISIBILITY";
export const HEADER_MENU_VISIBILITY = "HEADER_MENU_VISIBILITY";

const headerConstants = [
  {
    label: "Content",
    key: "content",
    id: uniqueid(),
    dependencies: [
      {
        tab: "customization",
        item: "layout",
        fields: {
          type: [HEADER_9],
        },
      },
    ],
    items: [
      {
        id: uniqueid(),
        label: "the show",
        key: "display",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Logo Show",
            type: "switch",
            key: HEADER_LOGO_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Show Business Title",
            key: HEADER_TITLE_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Display the category of goods",
            key: HEADER_CATEGORIES_VISIBILITY,
            default_value: true,
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Search bar",
        key: "search_bar",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            type: "switch",
            label: "Show search bar",
            key: "has_search_bar",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "The text inside the bar",
            default_value: "Search...",
            type: "text",
            inputType: "text",
            key: "search_bar_title",
          },
          {
            id: uniqueid(),
            label: "Performance",
            default_value: "fullscreen",
            type: "select",
            key: "search_bar_type",
            options: [
              {
                id: uniqueid(),
                label: "fullscreen",
                value: "fullscreen",
              },
              {
                id: uniqueid(),
                label: "Under the search bar",
                value: "under_search_bar",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Content",
    key: "content",
    id: uniqueid(),
    dependencies: [
      {
        tab: "customization",
        item: "layout",
        fields: {
          type: [HEADER_8, HEADER_10, HEADER_11],
        },
      },
    ],
    items: [
      {
        id: uniqueid(),
        label: "the show",
        key: "display",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Logo Show",
            type: "switch",
            key: HEADER_LOGO_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Show Business Title",
            key: HEADER_TITLE_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Display the category of goods",
            key: HEADER_CATEGORIES_VISIBILITY,
            default_value: true,
          },

          {
            id: uniqueid(),
            label: "Header menus",
            type: "switch",
            key: HEADER_MENU_VISIBILITY,
            default_value: false,
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Search bar",
        key: "search_bar",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            type: "switch",
            label: "Show search bar",
            key: "has_search_bar",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "The text inside the bar",
            default_value: "Search...",
            type: "text",
            inputType: "text",
            key: "search_bar_title",
          },
          {
            id: uniqueid(),
            label: "Performance",
            default_value: "fullscreen",
            type: "select",
            key: "search_bar_type",
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: [HEADER_8],
                },
              },
            ],
            options: [
              {
                id: uniqueid(),
                label: "fullscreen",
                value: "fullscreen",
              },
              {
                id: uniqueid(),
                label: "Under the search bar",
                value: "under_search_bar",
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
              type: [HEADER_8, HEADER_10],
            },
          },
        ],
        id: uniqueid(),
        label: "Button",
        key: "button",

        fields: [
          {
            id: uniqueid(),
            type: "switch",
            label: "the show",
            key: "has_button",
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "text",
            key: "button_text",
            label: "Button text",
            default_value: "Button text",
            InputProps: { maxLength: 50 },
          },
          {
            id: uniqueid(),
            label: "Select the internal or external link button",
            default_value: HAS_INTERNAL_LINK,
            key: "link_type",
            type: "select",

            options: [
              {
                id: uniqueid(),
                label: "With external link",
                value: HAS_EXTERNAL_LINK,
              },
              {
                id: uniqueid(),
                label: "With internal link",
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
            label: "Internal link",
            default_value: "/",
            key: "internal_link",
            type: "link",
            className: "mt-10",
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
            label: "External link",
            default_value: "",
            type: "text",
            key: "external_link",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "The color of the button text",
            key: "title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Background button",
            key: "button_color",
            type: "color",
          },
        ],
      },
    ],
  },
  {
    label: "Personalization",
    key: "customization",
    id: uniqueid(),
    items: [
      {
        id: uniqueid(),
        label: "Select the template",
        key: "layout",
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Select the template",
            default_value: HEADER_3,
            type: "layout_select",
            options: [
              {
                id: uniqueid(),
                value: HEADER_3,
                image: header_3_img,
                label: "Header 1",
              },
              {
                id: uniqueid(),
                value: HEADER_4,
                image: header_4_img,
                label: "Header 1",
              },
              {
                id: uniqueid(),
                value: HEADER_5,
                image: header_5_img,
                label: "Header 1",
              },
              {
                id: uniqueid(),
                value: HEADER_6,
                image: header_6_img,
                label: "Header 1",
              },
              {
                id: uniqueid(),
                value: HEADER_7,
                image: header_7_img,
                label: "Header 1",
              },
              {
                id: uniqueid(),
                value: HEADER_8,
                image: header_8_img,
                label: "Header 1",
              },
              {
                id: uniqueid(),
                value: HEADER_9,
                image: header_9_img,
                label: "Header 1",
              },
              {
                id: uniqueid(),
                value: HEADER_10,
                image: header_10_img,
                label: "Header 1",
              },
              {
                id: uniqueid(),
                value: HEADER_11,
                image: header_11_img,
                label: "Waste9",
              },
            ],
            key: "type",
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Logo Show",
            key: HEADER_LOGO_VISIBILITY,
            default_value: true,
            dependencies: [
              {
                fields: {
                  type: [HEADER_3, HEADER_4, HEADER_5, HEADER_6, HEADER_7],
                },
              },
            ],
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Show Business Title",
            key: HEADER_TITLE_VISIBILITY,
            default_value: true,
            dependencies: [
              {
                fields: {
                  type: [HEADER_3, HEADER_4, HEADER_5, HEADER_6, HEADER_7],
                },
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  type: [HEADER_3, HEADER_5, HEADER_6, HEADER_7],
                },
              },
            ],
            id: uniqueid(),
            type: "switch",
            label: "Search show",
            key: HEADER_SEARCH_VISIBILITY,
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  type: [HEADER_3, HEADER_4, HEADER_6, HEADER_7],
                },
              },
            ],
            id: uniqueid(),
            type: "switch",
            label: "Display the category of goods",
            key: HEADER_CATEGORIES_VISIBILITY,
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  type: [HEADER_5, HEADER_4, HEADER_6],
                },
              },
            ],
            id: uniqueid(),
            label: "Header on the main part.",
            type: "switch",
            key: HEADER_OVER_POSITION,
            default_value: false,
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Template settings",
        key: "header_setting",
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: [HEADER_8, HEADER_10, HEADER_11],
            },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "The color of icons and texts use site theme color",
            type: "switch",
            key: "use_theme_color",
            default_value: true,
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
            label: "The color of icons and texts",
            type: "color",
            key: "icon_and_text_color",
            default_value: "#325767",
          },
          {
            id: uniqueid(),
            label: "Logo size",
            default_value: 50,
            type: "select",
            key: "logo_size",
            options: [
              {
                id: uniqueid(),
                label: "Very small",
                value: 40,
              },
              {
                id: uniqueid(),
                label: "Little",
                value: 50,
              },
              {
                id: uniqueid(),
                label: "medium",
                value: 60,
              },
              {
                id: uniqueid(),
                label: "big",
                value: 70,
              },
            ],
          },

          {
            id: uniqueid(),
            label: "Business title size",
            default_value: 20,
            type: "select",
            key: "business_title_size",
            options: [
              {
                id: uniqueid(),
                label: "Little",
                value: 20,
              },
              {
                id: uniqueid(),
                label: "medium",
                value: 22,
              },
              {
                id: uniqueid(),
                label: "big",
                value: 24,
              },
            ],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Template settings",
        key: "header_setting",
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: [HEADER_9],
            },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "The color of icons and texts use site theme color",
            type: "switch",
            key: "use_theme_color",
            default_value: true,
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
            label: "The color of icons and texts",
            type: "color",
            key: "icon_and_text_color",
            default_value: "#325767",
          },
          {
            id: uniqueid(),
            label: "The size of the logo on the desktop",
            default_value: 50,
            type: "select",
            key: "logo_size",
            options: [
              {
                id: uniqueid(),
                label: "Very small",
                value: 40,
              },
              {
                id: uniqueid(),
                label: "Little",
                value: 50,
              },
              {
                id: uniqueid(),
                label: "medium",
                value: 60,
              },
              {
                id: uniqueid(),
                label: "big",
                value: 70,
              },
            ],
          },
          {
            id: uniqueid(),
            label: "Business title size",
            default_value: 20,
            type: "select",
            key: "business_title_size",
            options: [
              {
                id: uniqueid(),
                label: "Little",
                value: 20,
              },
              {
                id: uniqueid(),
                label: "medium",
                value: 22,
              },
              {
                id: uniqueid(),
                label: "big",
                value: 24,
              },
            ],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Background settings",
        key: "background",
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: [HEADER_8, HEADER_9, HEADER_10, HEADER_11],
            },
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "The choice of background type",
            default_value: "color",
            key: "background_type",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "Picture",
                value: "image",
              },
              {
                id: uniqueid(),
                label: "Color",
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
            id: uniqueid(),
            label: "Picture",
            default_value: "",
            type: "image_uploader",
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
            label: "Photo resolution",
            default_value: 100,
            key: "opacity",
            type: "slider",
          },
          {
            dependencies: [
              {
                fields: {
                  background_type: "color",
                },
              },
            ],
            id: uniqueid(),
            label: "The background color",
            default_value: "#FFFFFF",
            key: "background_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Header on the main part.",
            type: "switch",
            key: HEADER_OVER_POSITION,
            default_value: false,
          },
        ],
      },
    ],
  },
];
export default headerConstants;
