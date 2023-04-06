import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import ProductBulkInventory from "containers/AdminShopping/containers/AdminProductsInventoryBulkEditor";
import AdminLayout from "containers/AdminLayout";

export default function AdminCategoriesPage() {
  return <ProductBulkInventory plugin={SHOPPING_PLUGIN} />;
}
AdminCategoriesPage.ShouldBeAdmin = true;
AdminCategoriesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Adjustment of products",
};
