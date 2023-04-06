import {
  SECTION_ADDRESS_WITH_MAP,
  SECTION_CONTACT_US,
  SECTION_FORMS,
  SECTION_WORKING_HOUR,
} from "@saas/utils/constants/sections";
import forms from "./forms";
import addressWithMap from "./addressWithMap";
import workingHour from "./workingHour";
import contactUs from "./contactUs";

const index = {
  [SECTION_FORMS]: forms,
  [SECTION_ADDRESS_WITH_MAP]: addressWithMap,
  [SECTION_WORKING_HOUR]: workingHour,
  [SECTION_CONTACT_US]: contactUs,
};

export default index;
