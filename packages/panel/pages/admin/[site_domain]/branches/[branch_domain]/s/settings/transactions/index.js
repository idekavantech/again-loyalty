import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import AdminTransactions from "containers/AdminShopping/containers/AdminTransactions";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingProductsSettingsPage() {
  return <AdminTransactions plugin={SHOPPING_PLUGIN} />;
}
AdminShoppingProductsSettingsPage.ShouldBeAdmin = true;
AdminShoppingProductsSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Transactions",
};
