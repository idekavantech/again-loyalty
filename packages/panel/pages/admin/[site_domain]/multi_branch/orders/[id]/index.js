import AdminOrderPageContainer from "containers/AdminShopping/containers/AdminOrder";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminOrderPage() {
  return <AdminOrderPageContainer plugin={BRANCHES_PLUGIN} />;
}
AdminOrderPage[BRANCHES_PLUGIN] = true;
AdminOrderPage.ShouldBeAdmin = true;
AdminOrderPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "جزئیات سفارش",
};
