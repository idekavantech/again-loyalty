import {
  SECTION_IMAGE_GALLERY,
  SECTION_PICTURE_WITH_TEXT,
  SECTION_QUICK_ACCESS,
  SECTION_SOUND,
  SECTION_TEXT,
  SECTION_TITLE,
  SECTION_VIDEO,
} from "@saas/utils/constants/sections";
import text from "./text";
import video from "./video";
import sound from "./sound";
import imageGallery from "./imageGallery";
import quickAccess from "./quickAccess";
import pictureWithText from "./pictureWithText";
import title from "./title";

const index = {
  [SECTION_TEXT]: text,
  [SECTION_VIDEO]: video,
  [SECTION_SOUND]: sound,
  [SECTION_IMAGE_GALLERY]: imageGallery,
  [SECTION_QUICK_ACCESS]: quickAccess,
  [SECTION_PICTURE_WITH_TEXT]: pictureWithText,
  [SECTION_TITLE]: title,
};

export default index;
