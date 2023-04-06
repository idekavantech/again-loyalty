import AdminSuperProductContainer from "containers/AdminShopping/containers/AdminProduct";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingProductsSettingsPage() {
  return <AdminSuperProductContainer plugin={BRANCHES_PLUGIN} isSuper />;
}
AdminShoppingProductsSettingsPage[BRANCHES_PLUGIN] = true;
AdminShoppingProductsSettingsPage.ShouldBeAdmin = true;
AdminShoppingProductsSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Product details",
};
