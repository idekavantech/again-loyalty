import { uniqueid } from "../helpers/uniqueid";
import { HAS_EXTERNAL_LINK, HAS_INTERNAL_LINK } from "./builderConstants";

const navigationBarConstant = [
  {
    label: "Content",
    key: "content",
    id: uniqueid(),
    items: [
      {
        id: uniqueid(),
        label: "Text",
        key: "layout",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Desktop version text(Maximum 2 characters)",
            default_value: "The text bar text",
            type: "text",
            inputType: "text",
            key: "title_desktop",
            InputProps: { maxLength: 150 },
          },
          {
            id: uniqueid(),
            label: "Mobile version text(Maximum 2 characters)",
            default_value: "The text bar text",
            type: "text",
            inputType: "text",
            InputProps: { maxLength: 40 },
            key: "title_mobile",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "link",
        key: "link",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Select the internal or external link",
            default_value: HAS_EXTERNAL_LINK,
            key: "link_type",
            type: "select",

            options: [
              {
                id: uniqueid(),
                label: "External link",
                value: HAS_EXTERNAL_LINK,
              },
              {
                id: uniqueid(),
                label: "Internal link",
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
            label: "External link",
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
    label: "Personalization",
    key: "customization",
    id: uniqueid(),
    items: [
      {
        id: uniqueid(),
        label: "background",
        key: "background",
        element_id: null,
        description: "",
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
            label: "The color of the text and the cross button follow the theme color.",
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
            label: "The color of the text and the button",
            type: "color",
            key: "color",
            default_value: "#111",
          },
          {
            id: uniqueid(),
            label: "Font size",
            key: "font_size",
            default_value: "medium",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "Little",
                value: "small",
              },
              {
                id: uniqueid(),
                label: "medium",
                value: "medium",
              },
              {
                id: uniqueid(),
                label: "big",
                value: "large",
              },
            ],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "the show",
        key: "show_navigation_bar",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Display the cross button(Closable by the user)",
            default_value: false,
            type: "switch",
            key: "show_btn_close",
          },
          {
            id: uniqueid(),
            label: "If it is closed by the user, no longer displayed to the user",
            default_value: false,
            type: "switch",
            key: "close_all",
          },
          {
            id: uniqueid(),
            label: "View on the first page",
            type: "checkbox",
            key: "is_home_page",
            default_value: false,
          },
          {
            id: uniqueid(),
            label: "Views on all pages",
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
