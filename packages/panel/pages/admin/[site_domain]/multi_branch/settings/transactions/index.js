import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminTransactions from "containers/AdminShopping/containers/AdminTransactions";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingProductsSettingsPage() {
  return <AdminTransactions isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminShoppingProductsSettingsPage[BRANCHES_PLUGIN] = true;
AdminShoppingProductsSettingsPage.ShouldBeAdmin = true;
AdminShoppingProductsSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "تراکنش‌ها",
};
