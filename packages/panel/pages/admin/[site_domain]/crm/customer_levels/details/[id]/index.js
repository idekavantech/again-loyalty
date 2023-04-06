//import CRMCustomerLevelsSetting from "containers/AdminCRM/containers/CRMLevelsSetting";
import CRMCustomerLevelsSetting from 'containers/AdminCRM/containers/CRMLevelDetails/index'
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminCRMLevelsSettingPage() {
  return <CRMCustomerLevelsSetting />;
}
AdminCRMLevelsSettingPage[CRM_PLUGIN] = true;
AdminCRMLevelsSettingPage.ShouldBeAdmin = true;
AdminCRMLevelsSettingPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Customer levels based on points",
};
