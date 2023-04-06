import CRMAutomatedTrends from "containers/AdminCRM/containers/AutomatedProcesses";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

const AUTOMATED_PROCESS_TYPE = {
  title: "To register the order",
  type: "shopping_order_accepted_event",
};

export default function AdminCRMLabelPage() {
  return <CRMAutomatedTrends type={AUTOMATED_PROCESS_TYPE} />;
}
AdminCRMLabelPage[CRM_PLUGIN] = true;
AdminCRMLabelPage.ShouldBeAdmin = true;
AdminCRMLabelPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: AUTOMATED_PROCESS_TYPE.title,
};
