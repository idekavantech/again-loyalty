import { uniqueid } from "../helpers/uniqueid";

export const FOOTER_1 = "footer_1";
export const FOOTER_2 = "footer_2";
export const FOOTER_3 = "footer_3";
export const FOOTER_4 = "footer_4";
export const FOOTER_5 = "footer_5";

export const footer_1_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/footer1.png`;
export const footer_2_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/footer2.png`;
export const footer_3_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/footer3.png`;
export const footer_4_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/footer4.png`;
export const footer_5_img = `https://hs3-cdn-saas.behtarino.com/static/sections_skeleton/footer2.png`;

export const FOOTER_MAP_VISIBILITY = "FOOTER_MAP_VISIBILITY";
export const FOOTER_VISIBILITY = "FOOTER_VISIBILITY";
export const FOOTER_INSTAGRAM_VISIBILITY = "FOOTER_INSTAGRAM_VISIBILITY";

export const FOOTER_LOGO_VISIBILITY = "FOOTER_LOGO_VISIBILITY";
export const FOOTER_MENU_VISIBILITY = "FOOTER_MENU_VISIBILITY";
export const FOOTER_TITLE_VISIBILITY = "FOOTER_TITLE_VISIBILITY";
export const FOOTER_CONTACT_US_VISIBILITY = "FOOTER_CONTACT_US_VISIBILITY";
export const FOOTER_COMIUNICATION_VISIBILITY =
  "FOOTER_COMIUNICATION_VISIBILITY";

const footerConstants = [
  {
    label: "Content",
    key: "content",
    id: uniqueid(),
    dependencies: [
      {
        tab: "customization",
        item: "layout",
        fields: {
          type: [FOOTER_4],
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
            key: FOOTER_LOGO_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Show Business Title",
            key: FOOTER_TITLE_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Show communication with us",
            key: FOOTER_COMIUNICATION_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Show contact with us",
            key: FOOTER_CONTACT_US_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "Menu display",
            key: FOOTER_MENU_VISIBILITY,
            default_value: true,
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
          type: [FOOTER_5],
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
            type: "switch",
            label: "Show communication with us",
            key: FOOTER_COMIUNICATION_VISIBILITY,
            default_value: true,
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: [FOOTER_5],
                },
              },
            ],
            id: uniqueid(),
            label: "Non -display of electronic symbols",
            type: "switch",
            key: "hide_namad",
            default_value: false,
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
        label: "Footer type",
        key: "layout",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "The type of header",
            default_value: FOOTER_1,
            type: "layout_select",
            options: [
              {
                id: uniqueid(),
                value: FOOTER_1,
                image: footer_1_img,
                label: "Fuver ۱",
              },
              {
                id: uniqueid(),
                value: FOOTER_2,
                image: footer_2_img,
                label: "Fuver ۲",
              },
              {
                id: uniqueid(),
                value: FOOTER_3,
                image: footer_3_img,
                label: "Fuver ۳",
              },
              {
                id: uniqueid(),
                value: FOOTER_4,
                image: footer_4_img,
                label: "Fuver ۴",
              },
              {
                id: uniqueid(),
                value: FOOTER_5,
                image: footer_5_img,
                label: "Fuver ۵",
              },
            ],
            key: "type",
          },
          {
            dependencies: [
              {
                fields: {
                  type: [FOOTER_1],
                },
              },
            ],
            id: uniqueid(),
            type: "switch",
            label: "Map Display",
            key: FOOTER_MAP_VISIBILITY,
            default_value: true,
          },
        ],
      },
      {
        id: uniqueid(),
        label: "People",
        key: "logo",
        description: "",
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: [FOOTER_5],
            },
          },
        ],
        fields: [
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  type: [FOOTER_5],
                },
              },
            ],
            id: uniqueid(),
            label: "Use the default logo",
            type: "switch",
            key: "use_default_logo",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  use_default_logo: false,
                },
              },
            ],
            id: uniqueid(),
            label: "People",
            default_value: "",
            type: "image_uploader",
            key: "logo_url",
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
              type: [FOOTER_4, FOOTER_5],
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
            label: "The color of the text use the color of the site theme",
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
            label: "The color of the background text",
            type: "color",
            key: "text_color",
            default_value: "#325767",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Footer display",
        key: "presentation",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            type: "switch",
            label: "Footer display",
            key: FOOTER_VISIBILITY,
            default_value: true,
          },
        ],
      },
    ],
  },
];
export default footerConstants;
