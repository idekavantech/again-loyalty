import AdminBranches from "containers/AdminShopping/containers/AdminBranches";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingProductsSettingsPage() {
  return <AdminBranches />;
}
AdminShoppingProductsSettingsPage[BRANCHES_PLUGIN] = true;
AdminShoppingProductsSettingsPage.ShouldBeAdmin = true;
AdminShoppingProductsSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "branches",
};
