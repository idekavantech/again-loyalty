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
    label: "محتوا",
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
        label: "نمایش",
        key: "display",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "نمایش لوگو",
            type: "switch",
            key: FOOTER_LOGO_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "نمایش عنوان کسب‌و‌کار",
            key: FOOTER_TITLE_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "نمایش ارتباط با ما",
            key: FOOTER_COMIUNICATION_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "نمایش تماس با ما",
            key: FOOTER_CONTACT_US_VISIBILITY,
            default_value: true,
          },
          {
            id: uniqueid(),
            type: "switch",
            label: "نمایش منو",
            key: FOOTER_MENU_VISIBILITY,
            default_value: true,
          },
        ],
      },
    ],
  },
  {
    label: "محتوا",
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
        label: "نمایش",
        key: "display",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            type: "switch",
            label: "نمایش ارتباط با ما",
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
            label: "عدم نمایش نمادهای الکترونیک",
            type: "switch",
            key: "hide_namad",
            default_value: false,
          },
        ],
      },
    ],
  },
  {
    label: "شخصی‌سازی",
    key: "customization",
    id: uniqueid(),
    items: [
      {
        id: uniqueid(),
        label: "نوع فوتر",
        key: "layout",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "نوع هدر",
            default_value: FOOTER_1,
            type: "layout_select",
            options: [
              {
                id: uniqueid(),
                value: FOOTER_1,
                image: footer_1_img,
                label: "فوتر ۱",
              },
              {
                id: uniqueid(),
                value: FOOTER_2,
                image: footer_2_img,
                label: "فوتر ۲",
              },
              {
                id: uniqueid(),
                value: FOOTER_3,
                image: footer_3_img,
                label: "فوتر ۳",
              },
              {
                id: uniqueid(),
                value: FOOTER_4,
                image: footer_4_img,
                label: "فوتر ۴",
              },
              {
                id: uniqueid(),
                value: FOOTER_5,
                image: footer_5_img,
                label: "فوتر ۵",
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
            label: "نمایش نقشه",
            key: FOOTER_MAP_VISIBILITY,
            default_value: true,
          },
        ],
      },
      {
        id: uniqueid(),
        label: "لوگو",
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
            label: "استفاده از لوگوی پیش فرض",
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
            label: "لوگو",
            default_value: "",
            type: "image_uploader",
            key: "logo_url",
          },
        ],
      },

      {
        id: uniqueid(),
        label: "تنظیمات پس زمینه",
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
            label: "انتخاب نوع پس زمینه",
            default_value: "color",
            key: "background_type",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "عکس",
                value: "image",
              },
              {
                id: uniqueid(),
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
            id: uniqueid(),
            label: "عکس",
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
            label: "وضوح عکس",
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
            label: "رنگ پس‌زمینه",
            default_value: "#FFFFFF",
            key: "background_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "رنگ متن از رنگ تم سایت استفاده کند",
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
            label: "رنگ متن پس‌زمینه",
            type: "color",
            key: "text_color",
            default_value: "#325767",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "نمایش فوتر",
        key: "presentation",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            type: "switch",
            label: "نمایش فوتر",
            key: FOOTER_VISIBILITY,
            default_value: true,
          },
        ],
      },
    ],
  },
];
export default footerConstants;
