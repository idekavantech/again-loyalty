import CRMSegmentsSetting from "containers/AdminCRM/containers/CRMSegmentsDetail";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminCRMSegmentsSettingPage() {
  return <CRMSegmentsSetting />;
}
AdminCRMSegmentsSettingPage[CRM_PLUGIN] = true;
AdminCRMSegmentsSettingPage.ShouldBeAdmin = true;
AdminCRMSegmentsSettingPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "تنظیمات بخش‌بندی مشتریان",
};
