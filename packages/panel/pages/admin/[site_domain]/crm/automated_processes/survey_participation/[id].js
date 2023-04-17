import CRMAutomatedTrends from "containers/AdminCRM/containers/AutomatedProcessesDetail";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

const AUTOMATED_PROCESS_TYPE = {
  title: "For participating in the survey",
  type: "survey_participation",
};

export default function AdminCRMLabelPage() {
  return <CRMAutomatedTrends type={AUTOMATED_PROCESS_TYPE}/>;
}
AdminCRMLabelPage[CRM_PLUGIN] = true;
AdminCRMLabelPage.ShouldBeAdmin = true;
AdminCRMLabelPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Add",
};
