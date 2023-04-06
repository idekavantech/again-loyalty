import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import AdminCreditExpiryReminder from "containers/AdminCRM/containers/CreditExpiryReminderDetails";
export default function AdminCreditExpiryReminderDetails() {
  return <AdminCreditExpiryReminder />;
}
AdminCreditExpiryReminderDetails[CRM_PLUGIN] = true;
AdminCreditExpiryReminderDetails.ShouldBeAdmin = true;
AdminCreditExpiryReminderDetails.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Creating a new campaign",
};
