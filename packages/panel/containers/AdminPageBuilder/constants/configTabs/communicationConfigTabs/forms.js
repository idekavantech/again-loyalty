import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import uniqueId from "lodash/uniqueId";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_FORMS } from "@saas/utils/constants/sections";

const forms = [
  // forms
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "Choose form",
        key: "form",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "Form",
            default_value: "Form",
            key: "value",
            type: "form_select",
          },
          {
            id: uniqueid(),
            label: "The color of the form follows the default color.",
            type: "checkbox",
            key: "form_use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  form_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "Form color",
            type: "color",
            key: "form_color",
            default_value: "#000000",
          },
          {
            id: uniqueid(),
            label: "The color of the button follows the default color.",
            type: "checkbox",
            key: "button_use_theme_color",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  button_use_theme_color: false,
                },
              },
            ],
            id: uniqueid(),
            label: "Button color",
            type: "color",
            key: "button_color",
            default_value: "#000000",
          },
          {
            dependencies: [
              {
                fields: {
                  button_use_theme_color: false,
                },
              },
            ],
            id: uniqueId(),
            label: "The color of the button text",
            default_value: "#ffffff",
            key: "button_text_color",
            type: "color",
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
            default_value: sectionsLayout[SECTION_FORMS][0].value,
            options: sectionsLayout[SECTION_FORMS],
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

export default forms;
