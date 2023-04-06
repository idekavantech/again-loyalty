import AdminCrmCelebrationReminder from "containers/AdminCRM/containers/celebrationReminder"
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminCRMLabelsListPage() {
  return <AdminCrmCelebrationReminder />;
}

AdminCRMLabelsListPage[CRM_PLUGIN] = true;
AdminCRMLabelsListPage.ShouldBeAdmin = true;
AdminCRMLabelsListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Birthday greetings and marriage anniversary",
};
