import CRMMembershipDetail from "containers/AdminCRM/containers/CRMMembershipDetail";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
export default function CRMMembershipDetailPage() {
  return <CRMMembershipDetail />;
}
CRMMembershipDetailPage[CRM_PLUGIN] = true;
CRMMembershipDetailPage.ShouldBeAdmin = true;
CRMMembershipDetailPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Customer information details",
};
