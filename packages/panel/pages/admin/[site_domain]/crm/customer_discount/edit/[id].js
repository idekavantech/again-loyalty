import CRMDiscountEdit from "containers/AdminCRM/containers/CRMDiscountEdit";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
export default function AdminDiscountCodePage() {
  return <CRMDiscountEdit />;
}
AdminDiscountCodePage[CRM_PLUGIN] = true;
AdminDiscountCodePage.ShouldBeAdmin = true;
AdminDiscountCodePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Details of the discount code",
};
