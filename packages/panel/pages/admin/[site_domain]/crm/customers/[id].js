import CRMListEdit from "containers/AdminCRM/containers/CRMMembershipDetail";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
export default function AdminCRMEditListPage() {
  return <CRMListEdit />;
}
AdminCRMEditListPage[CRM_PLUGIN] = true;
AdminCRMEditListPage.ShouldBeAdmin = true;
AdminCRMEditListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Customer information details",
};
