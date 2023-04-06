import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_TITLE } from "@saas/utils/constants/sections";

const title = [
  // Title
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
            label: "The desired title",
            default_value: "Your site with showcase",
            key: "value",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "Title color",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "Font size",
            key: "font_size",
            default_value: "20px",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "HTML tag",
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
          {
            id: uniqueid(),
            label: "The type of layout",
            key: "position",
            default_value: "right",
            type: "select",
            options: [
              {
                id: uniqueid(),
                label: "right side",
                value: "right",
              },
              {
                id: uniqueid(),
                label: "Left side",
                value: "left",
              },
              {
                id: uniqueid(),
                label: "middle",
                value: "center",
              },
            ],
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
            default_value: sectionsLayout[SECTION_TITLE][0].value,
            options: sectionsLayout[SECTION_TITLE],
          },
        ],
      },
    ],
  },
];

export default title;
