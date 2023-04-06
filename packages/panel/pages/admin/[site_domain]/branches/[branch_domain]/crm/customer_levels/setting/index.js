import CRMCustomerLevelsSetting from "containers/AdminCRM/containers/CRMLevelsSetting";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminCRMLevelsSettingPage() {
  return <CRMCustomerLevelsSetting />;
}
AdminCRMLevelsSettingPage[CRM_PLUGIN] = true;
AdminCRMLevelsSettingPage.ShouldBeAdmin = true;
AdminCRMLevelsSettingPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "سطوح مشتریان بر اساس امتیاز",
};
