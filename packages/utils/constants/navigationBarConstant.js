import { uniqueid } from "../helpers/uniqueid";
import { HAS_EXTERNAL_LINK, HAS_INTERNAL_LINK } from "./builderConstants";

const navigationBarConstant = [
  {
    label: "محتوا",
    key: "content",
    id: uniqueid(),
    items: [
      {
        id: uniqueid(),
        label: "متن",
        key: "layout",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "متن نسخه دسکتاپ (حداکثر ۱۵۰ کاراکتر)",
            default_value: "متن نوار اعلانات",
            type: "text",
            inputType: "text",
            key: "title_desktop",
            InputProps: { maxLength: 150 },
          },
          {
            id: uniqueid(),
            label: "متن نسخه موبایل (حداکثر ۴۰ کاراکتر)",
            default_value: "متن نوار اعلانات",
            type: "text",
            inputType: "text",
            InputProps: { maxLength: 40 },
            key: "title_mobile",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "لینک",
        key: "link",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "انتخاب لینک داخلی یا خارجی",
            default_value: HAS_EXTERNAL_LINK,
            key: "link_type",
            type: "select",

            options: [
              {
                id: uniqueid(),
                label: "لینک خارجی",
                value: HAS_EXTERNAL_LINK,
              },
              {
                id: uniqueid(),
                label: "لینک داخلی",
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
            default_value: "",
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
            label: "لینک خارجی",
            default_value: "",
            type: "text",
            key: "external_link",
            className: "direction-ltr",
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
        label: "پس‌زمینه",
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
            label: "رنگ متن و دکمه ضربدر از رنگ تم پیروی کند.",
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
            label: "رنگ متن و دکمه ضربدر",
            type: "color",
            key: "color",
            default_value: "#111",
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
              },
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
            ],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "نمایش",
        key: "show_navigation_bar",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "نمایش دکمه ضربدر(قابل بسته شدن از طرف کاربر)",
            default_value: false,
            type: "switch",
            key: "show_btn_close",
          },
          {
            id: uniqueid(),
            label: "اگر توسط کاربر بسته شد، دیگر به کاربر نمایش داده نشود",
            default_value: false,
            type: "switch",
            key: "close_all",
          },
          {
            id: uniqueid(),
            label: "نمایش در صفحه اول",
            type: "checkbox",
            key: "is_home_page",
            default_value: false,
          },
          {
            id: uniqueid(),
            label: "نمایش در همه صفحات",
            type: "checkbox",
            key: "is_allPage",
            default_value: true,
          },
        ],
      },
    ],
  },
];
export default navigationBarConstant;
