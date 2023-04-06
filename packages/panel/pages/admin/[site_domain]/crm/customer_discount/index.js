import CRMDiscountPage from "containers/AdminCRM/containers/CRMDiscountList/";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
export default function AdminDiscountCodePage() {
  return <CRMDiscountPage />;
}
AdminDiscountCodePage[CRM_PLUGIN] = true;
AdminDiscountCodePage.ShouldBeAdmin = true;
AdminDiscountCodePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "discount code",
};
