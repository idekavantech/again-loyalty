import {
  SECTION_BANNER_WITH_ANIMATED_TEXT,
  SECTION_BANNER_WITH_SLIDER,
  SECTION_COUNTER_CARD,
  SECTION_FEATURES_CARD,
  SECTION_GENERAL_BANNER,
  SECTION_SLIDER,
  SECTION_SPECIAL_BANNER,
} from "@saas/utils/constants/sections";
import generalBanner from "./generalBanner";
import bannerWithSlider from "./bannerWithSlider";
import specialBanner from "./specialBanner";
import bannerWithAnimatedText from "./bannerWithAnimatedText";
import slider from "./slider";
import featuresCard from "./featuresCard";
import counterCard from "./counterCard";

const index = {
  [SECTION_GENERAL_BANNER]: generalBanner,
  [SECTION_BANNER_WITH_SLIDER]: bannerWithSlider,
  [SECTION_SPECIAL_BANNER]: specialBanner,
  [SECTION_BANNER_WITH_ANIMATED_TEXT]: bannerWithAnimatedText,
  [SECTION_SLIDER]: slider,
  [SECTION_FEATURES_CARD]: featuresCard,
  [SECTION_COUNTER_CARD]: counterCard,
};

export default index;
