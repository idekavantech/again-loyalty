import AdminSuperProductSettings from "containers/AdminShopping/containers/AdminProductsList";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingProductsSettingsPage() {
  return <AdminSuperProductSettings isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminShoppingProductsSettingsPage[BRANCHES_PLUGIN] = true;
AdminShoppingProductsSettingsPage.ShouldBeAdmin = true;
AdminShoppingProductsSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "محصولات",
};
