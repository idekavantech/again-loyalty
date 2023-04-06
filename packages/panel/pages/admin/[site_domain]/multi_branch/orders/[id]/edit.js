import AdminEditOrderPageContainer from "containers/AdminShopping/containers/AdminEditOrder";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminEditOrderPage() {
  return <AdminEditOrderPageContainer plugin={BRANCHES_PLUGIN} isSuper />;
}
AdminEditOrderPage[BRANCHES_PLUGIN] = true;
AdminEditOrderPage.ShouldBeAdmin = true;
AdminEditOrderPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "ویرایش سفارش",
};
