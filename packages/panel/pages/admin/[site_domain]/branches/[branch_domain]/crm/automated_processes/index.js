import CRMAutomatedTrends from "containers/AdminCRM/containers/AutomatedProcesses";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import {
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default function AdminCRMLabelPagePage() {
  return <CRMAutomatedTrends />;
}
AdminCRMLabelPagePage[CRM_PLUGIN] = true;
AdminCRMLabelPagePage.ShouldBeAdmin = true;
AdminCRMLabelPagePage.Wrapper = AdminLayout;
AdminCRMLabelPagePage[INCLUDED_WEBAPPS_ONLY_KEY] = [DOBARE_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "Automatic trends",
};
