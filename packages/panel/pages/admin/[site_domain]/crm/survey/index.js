import CRMSurveySetting from "containers/AdminCRM/containers/CRMSurveySettingPage";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import {
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default function AdminCRMSurveySettingPage() {
  return <CRMSurveySetting />;
}
AdminCRMSurveySettingPage[CRM_PLUGIN] = true;
AdminCRMSurveySettingPage.ShouldBeAdmin = true;
AdminCRMSurveySettingPage.Wrapper = AdminLayout;
AdminCRMSurveySettingPage[INCLUDED_WEBAPPS_ONLY_KEY] = [DOBARE_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "Survey",
};
