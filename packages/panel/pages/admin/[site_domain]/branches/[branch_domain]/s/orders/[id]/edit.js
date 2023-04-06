import AdminEditOrderPageContainer from "containers/AdminShopping/containers/AdminEditOrder";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminEditOrderPage() {
  return <AdminEditOrderPageContainer plugin={SHOPPING_PLUGIN} />;
}
AdminEditOrderPage.ShouldBeAdmin = true;
AdminEditOrderPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Edit the order",
};
