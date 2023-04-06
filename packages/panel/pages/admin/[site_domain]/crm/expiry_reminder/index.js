import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import CreditExpiryReminderList from "containers/AdminCRM/containers/CreditExpiryReminderList/index";

export default function AdminCRMExpiryReminder() {
  return <CreditExpiryReminderList />;
}
AdminCRMExpiryReminder[CRM_PLUGIN] = true;
AdminCRMExpiryReminder.ShouldBeAdmin = true;
AdminCRMExpiryReminder.Wrapper = AdminLayout;