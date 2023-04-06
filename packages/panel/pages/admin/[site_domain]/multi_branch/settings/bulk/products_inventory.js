import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import ProductBulkInventory from "containers/AdminShopping/containers/AdminProductsInventoryBulkEditor";
import AdminLayout from "containers/AdminLayout";

export default function AdminCategoriesPage() {
  return <ProductBulkInventory isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminCategoriesPage[BRANCHES_PLUGIN] = true;
AdminCategoriesPage.ShouldBeAdmin = true;
AdminCategoriesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Adjustment of products",
};
