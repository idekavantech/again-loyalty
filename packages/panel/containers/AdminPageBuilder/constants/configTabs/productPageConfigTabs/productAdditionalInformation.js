import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_PRODUCT_ADDITIONAL_INFORMATION } from "@saas/utils/constants/sections";

const productAdditionalInformation = [
  // مشخصات تکمیلی محصول
  {
    ...sectionsConfigTabsRepeatedParts["customization"],
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value:
              sectionsLayout[SECTION_PRODUCT_ADDITIONAL_INFORMATION][0].value,
            options: sectionsLayout[SECTION_PRODUCT_ADDITIONAL_INFORMATION],
          },
        ],
      },
    ],
  },
];

export default productAdditionalInformation;
