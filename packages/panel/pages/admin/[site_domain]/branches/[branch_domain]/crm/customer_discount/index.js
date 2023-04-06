import CRMDiscountPage from "containers/AdminCRM/containers/CRMDiscountList";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
export default function AdminCRMListPage() {
  return <CRMDiscountPage />;
}
AdminCRMListPage[CRM_PLUGIN] = true;
AdminCRMListPage.ShouldBeAdmin = true;
AdminCRMListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "discount code",
};
