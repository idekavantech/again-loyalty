import {
  SECTION_CATEGORIES,
  SECTION_PRODUCTS,
  SECTION_RECOMMENDED_LABEL,
} from "@saas/utils/constants/sections";
import recommendedLabel from "./recommendedLabel";
import products from "./products";
import categories from "./categories";

const index = {
  [SECTION_RECOMMENDED_LABEL]: recommendedLabel,
  [SECTION_PRODUCTS]: products,
  [SECTION_CATEGORIES]: categories,
};

export default index;
