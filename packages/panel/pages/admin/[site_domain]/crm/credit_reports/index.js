import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import AdminReportsContainer from "containers/AdminCRM/containers/CRMReports/CreditReports/index";

export default function AdminCRMReports() {
  return <AdminReportsContainer />;
}
AdminCRMReports[CRM_PLUGIN] = true;
AdminCRMReports.ShouldBeAdmin = true;
AdminCRMReports.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report Gift Credit",
};
