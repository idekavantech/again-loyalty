import CRMSurveySettingSingle from "containers/AdminCRM/containers/CRMSurveySettingSinglePage";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

export default function CRMSurveySettingSinglePage() {
  return <CRMSurveySettingSingle />;
}
CRMSurveySettingSinglePage[CRM_PLUGIN] = true;
CRMSurveySettingSinglePage.ShouldBeAdmin = true;
CRMSurveySettingSinglePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Survey settings",
};
