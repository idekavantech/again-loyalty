import AdminCRMAutomationSettingsPageContainer from "containers/AdminCRM/containers/CRMAutomationSettings";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminCRMAutomationSettingsPage() {
  return <AdminCRMAutomationSettingsPageContainer />;
}

AdminCRMAutomationSettingsPage[CRM_PLUGIN] = true;
AdminCRMAutomationSettingsPage.ShouldBeAdmin = true;
AdminCRMAutomationSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Marketing Automation Settings",
};
