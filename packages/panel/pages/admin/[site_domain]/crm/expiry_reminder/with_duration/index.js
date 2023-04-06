import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import CreditExpiryReminderWithDuration from "containers/AdminCRM/containers/CreditExpiryReminderWithDuration";

export default function AdminCRMExpiryReminder() {
  return <CreditExpiryReminderWithDuration />;
}
AdminCRMExpiryReminder[CRM_PLUGIN] = true;
AdminCRMExpiryReminder.ShouldBeAdmin = true;
AdminCRMExpiryReminder.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Expiry reminder",
};
