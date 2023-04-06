import AutomatedProcessesType from "containers/AdminCRM/containers/AutomatedProcessesType";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import {
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default function AutomatedProcessesPage() {
  return <AutomatedProcessesType />;
}
AutomatedProcessesPage[CRM_PLUGIN] = true;
AutomatedProcessesPage.ShouldBeAdmin = true;
AutomatedProcessesPage.Wrapper = AdminLayout;
AutomatedProcessesPage[INCLUDED_WEBAPPS_ONLY_KEY] = [DOBARE_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "Automatic trends",
};
