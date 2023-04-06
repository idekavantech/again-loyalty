import AdminProductVariant from "containers/AdminShopping/containers/AdminProductVariation";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingProductsVariantsPage() {
  return <AdminProductVariant isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminShoppingProductsVariantsPage[BRANCHES_PLUGIN] = true;
AdminShoppingProductsVariantsPage.ShouldBeAdmin = true;
AdminShoppingProductsVariantsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Various details",
};
