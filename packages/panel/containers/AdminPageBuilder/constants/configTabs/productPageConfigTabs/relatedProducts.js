import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_RELATED_PRODUCTS } from "@saas/utils/constants/sections";

const relatedProducts = [
  // similar products
  {
    ...sectionsConfigTabsRepeatedParts["customization"],
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value: sectionsLayout[SECTION_RELATED_PRODUCTS][0].value,
            options: sectionsLayout[SECTION_RELATED_PRODUCTS],
          },
        ],
      },
    ],
  },
];

export default relatedProducts;
