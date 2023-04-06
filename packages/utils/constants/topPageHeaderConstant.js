import { uniqueid } from "../helpers/uniqueid";
import { HAS_EXTERNAL_LINK, HAS_INTERNAL_LINK } from "./builderConstants";

const topPageHeaderConstant = [
  {
    label: "Content",
    key: "content",
    id: uniqueid(),
    items: [
      {
        id: uniqueid(),
        label: "Intended",
        key: "menus",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label:
              "By going to the site menus editing page you can manage the header menus at the top of the page.",
            key: "description",
            type: "description",
          },

          {
            id: uniqueid(),
            label: "Editing the menu",
            key: "descriptionMenu",
            type: "button",
            link: `appearance/menu/TOP_PAGE_HEADER_MENU?is_edit_mode_from_page_builder=true`,
            modal_text: `The changes to this page have not been saved. By going to the page"Edit menus
             site" Changes will not apply. Are you willing to save changes?`,
            variant: "contained",
            success_massage:
              "The header at the top of your site's page was successfully updated",
            fail_message: "The header of the top of your site was not successful!",
            color: "primary",
            className: "w-100",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Button",
        key: "buttons",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Button text",
            default_value: "CTA",
            type: "text",
            inputType: "text",
            key: "title",
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
            label: "Button type",
            default_value: "contained",
            type: "select",
            key: "variant",
            options: [
              {
                id: uniqueid(),
                label: "So on",
                value: "contained",
              },
              {
                id: uniqueid(),
                label: "You are empty",
                value: "outlined",
              },
              {
                id: uniqueid(),
                label: "Text",
                value: "text",
              },
            ],
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Social Networks",
        key: "socialNetworks",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Instagram",
            type: "checkbox",
            key: "instagram",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "Whatsapp",
            type: "checkbox",
            key: "whats_app",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "LinkedIn",
            type: "checkbox",
            key: "linkdin",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "Telegram",
            type: "checkbox",
            key: "telegram",
            default_value: true,
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
        label: "the show",
        key: "display",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "History Show",
            type: "switch",
            key: "is_date",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "Show time",
            type: "switch",
            key: "is_time",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "Social Networking",
            type: "switch",
            key: "show_social_media",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "Show menus",
            type: "switch",
            key: "show_menus",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "Display button",
            type: "switch",
            key: "show_button",
            default_value: true,
          },
          {
            id: uniqueid(),
            label: "The color of the button text",
            default_value: "#fff",
            key: "title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Button color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "button_color",
            type: "color",
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
export default topPageHeaderConstant;
