import {
  SECTION_PRODUCT_ADDITIONAL_INFORMATION,
  SECTION_PRODUCT_INFORMATION,
  SECTION_RELATED_PRODUCTS,
} from "@saas/utils/constants/sections";
import productInfomation from "./productInfomation";
import relatedProducts from "./relatedProducts";
import productAdditionalInformation from "./productAdditionalInformation";

const index = {
  [SECTION_PRODUCT_INFORMATION]: productInfomation,
  [SECTION_RELATED_PRODUCTS]: relatedProducts,
  [SECTION_PRODUCT_ADDITIONAL_INFORMATION]: productAdditionalInformation,
};

export default index;
