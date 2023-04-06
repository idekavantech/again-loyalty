import AdminOrderPageContainer from "containers/AdminShopping/containers/AdminOrder";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminOrderPage() {
  return <AdminOrderPageContainer plugin={SHOPPING_PLUGIN} />;
}
AdminOrderPage.ShouldBeAdmin = true;
AdminOrderPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Order details",
};
