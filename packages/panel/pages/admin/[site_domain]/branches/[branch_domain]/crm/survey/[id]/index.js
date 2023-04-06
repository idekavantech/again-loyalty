import CRMSurveyPage from "containers/AdminCRM/containers/CRMSurveyPage";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminCRMSurveyPage() {
  return <CRMSurveyPage />;
}
AdminCRMSurveyPage[CRM_PLUGIN] = true;
AdminCRMSurveyPage.ShouldBeAdmin = true;
AdminCRMSurveyPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "جزئیات نظرسنجی",
};
