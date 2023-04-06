import {
  SECTION_ABOUT_US,
  SECTION_ENAMAD,
  SECTION_FAQ,
  SECTION_TESTIMONIALS,
} from "@saas/utils/constants/sections";
import aboutUs from "./aboutUs";
import faq from "./faq";
import testimonials from "./testimonials";
import enamad from "./enamad";

const index = {
  [SECTION_ABOUT_US]: aboutUs,
  [SECTION_FAQ]: faq,
  [SECTION_TESTIMONIALS]: testimonials,
  [SECTION_ENAMAD]: enamad,
};

export default index;
