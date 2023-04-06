import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_MULTI_BRANCH } from "@saas/utils/constants/sections";
import { LOREM_IPSUM_SHORT } from "../sharedConstants";

const multiBranch = [
  // Showing branches on the map
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
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_2"],
            },
          },
        ],
        id: uniqueid(),
        label: "branches",
        key: "branches",
        element_id: "section_25_branches",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 100,
        min_items: 2,
        add_new_item_text: "Add new branch",
        default_items: [
          {
            name: "Vali Asr",
            address: LOREM_IPSUM_SHORT,
            phone: "123123123",
            tooltip: "The title of his people",
            button_text: "Go to the branch",
            button_link: "/",
            latitude: "35.7492649",
            longitude: "51.1928452",
            image: `${CDN_BASE_URL}mock9.png`,
          },
          {
            name: "Vali Asr",
            address: LOREM_IPSUM_SHORT,
            phone: "123123123",
            tooltip: "The title of his people",
            button_text: "Go to the branch",
            button_link: "/",
            latitude: "35.7492649",
            longitude: "51.1928452",
            image: `${CDN_BASE_URL}mock9.png`,
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "Branch Name",
            default_value: "Vali Asr",
            type: "text",
            key: "name",
          },
          {
            id: uniqueid(),
            label: "Branch Address",
            default_value: LOREM_IPSUM_SHORT,
            key: "address",
            edit_button_text: "Enter the address",
            type: "richtext",
          },
          {
            id: uniqueid(),
            label: "Branch Name",
            default_value: "Vali Asr",
            type: "text",
            key: "tooltip",
          },
          {
            id: uniqueid(),
            label: "Branch Phone",
            default_value: "123123123",
            key: "phone",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Button text",
            default_value: "Go to the branch",
            type: "text",
            key: "button_text",
          },
          {
            id: uniqueid(),
            label: "Button link",
            default_value: "/",
            type: "text",
            key: "button_link",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "Longitude",
            default_value: "35.7492649",
            key: "latitude",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "latitude",
            default_value: "51.1928452",
            key: "longitude",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Photo of the branch",
            default_value: `${CDN_BASE_URL}mock9.png`,
            key: "image",
            type: "image_uploader",
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
              type: ["type_1"],
            },
          },
        ],
        id: uniqueid(),
        label: "buttons",
        key: "buttons",
        element_id: "section_25_buttons",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 3,
        min_items: 1,
        add_new_item_text: "Add new button",
        items_fields: [
          {
            id: uniqueid(),
            label: "Button link",
            default_value: "ordering",
            key: "link_type",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "Ordering",
                value: "ordering",
              },
              {
                id: uniqueid(),
                label: "‌phone number",
                value: "phone_num",
              },
              {
                id: uniqueid(),
                label: "‌Routing",
                value: "routing",
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: "ordering",
                },
              },
            ],

            id: uniqueid(),
            label: "Button text",
            default_value: "Button text",
            type: "text",
            key: "text",
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: "phone_num",
                },
              },
            ],
            id: uniqueid(),
            label: "Button text",
            default_value: "Contact",
            type: "text",
            key: "num",
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
          {
            id: uniqueid(),
            label: "Button size",
            default_value: "medium",
            type: "select",
            key: "size",
            options: [
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
              {
                id: uniqueid(),
                label: "Little",
                value: "small",
              },
            ],
          },
          {
            id: uniqueid(),
            label: "The use of theme color",
            type: "checkbox",
            key: "use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  variant: "contained",
                  use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "Background button",
            type: "color",
            key: "background_color",
            default_value: "#000",
          },
          {
            dependencies: [
              {
                fields: {
                  variant: "outlined",
                  use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "The color of the button round",
            type: "color",
            key: "border_color",
            default_value: "#000",
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
            label: "The color of the button text",
            type: "color",
            key: "color",
          },
        ],
        fields: [
          {
            id: uniqueid(),
            label: "The use of default buttons",
            type: "switch",
            key: "use_default_buttons",
            default_value: true,
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
            default_value: sectionsLayout[SECTION_MULTI_BRANCH][0].value,
            options: sectionsLayout[SECTION_MULTI_BRANCH],
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
        label: "the show",
        key: "showing_branches",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Show photos",
            type: "switch",
            default_value: true,
            key: "show_image",
          },
          {
            id: uniqueid(),
            label: "We accept the order",
            type: "switch",
            default_value: true,
            key: "has_ordering",
          },
        ],
      },
      {
        dependencies: [
          {
            tab: "customization",
            item: "layout",
            fields: {
              type: ["type_3"],
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
                tab: "customization",
                item: "layout",
                fields: {
                  type: ["type_3"],
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
        label: "Section size",
        key: "section_size",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Request",
            default_value: "w-100",
            type: "select",
            key: "main_width",
            options: [
              {
                id: uniqueid(),
                label: "fullscreen",
                value: "w-100",
              },
              {
                id: uniqueid(),
                label: "with Gap",
                value: "container",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default multiBranch;
