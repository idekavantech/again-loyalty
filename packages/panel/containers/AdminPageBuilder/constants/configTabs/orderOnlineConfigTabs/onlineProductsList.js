import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_ONLINE_PRODUCTS_LIST } from "@saas/utils/constants/sections";

const onlineProductsList = [
  // List of Online Sales Products
  {
    ...sectionsConfigTabsRepeatedParts["customization"],
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            dependencies: [],
            id: uniqueid(),
            label: "The type of categories",
            type: "select",
            key: "categories_type",
            default_value: "nested",
            options: [
              {
                id: uniqueid(),
                value: "nested",
                label: "Status",
              },
              {
                id: uniqueid(),
                value: "flat",
                label: "Singlely",
              },
            ],
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  categories_type: "flat",
                },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value: sectionsLayout[SECTION_ONLINE_PRODUCTS_LIST].filter(
              (layout) => layout.type === "flat"
            )[0].value,
            options: sectionsLayout[SECTION_ONLINE_PRODUCTS_LIST].filter(
              (layout) => layout.type === "flat"
            ),
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  categories_type: "nested",
                },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value: sectionsLayout[SECTION_ONLINE_PRODUCTS_LIST].filter(
              (layout) => layout.type === "nested"
            )[0].value,
            options: sectionsLayout[SECTION_ONLINE_PRODUCTS_LIST].filter(
              (layout) => layout.type === "nested"
            ),
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  categories_type: "nested",
                },
              },
            ],
            id: uniqueid(),
            label: "Edit the nested menu",
            type: "button",
            color: "primary",
            variant: "outlined",
            className: "w-100",
            link: "s/settings/c",
          },
          {
            dependencies: [
              {
                tab: "customization",
                item: "layout",
                fields: {
                  categories_type: "nested",
                },
              },
            ],
            id: uniqueid(),
            label: "Sidebar",
            type: "switch",
            color: "primary",
            key: "has_side_bar",
            default_value: true,
          },
        ],
      },
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
        label: "Label",
        key: "category",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "View the tag photo",
            type: "switch",
            key: "has_category_image",
            default_value: false,
          },
        ],
      },
    ],
  },
];

export default onlineProductsList;
