import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import ProductBulkEditor from "containers/AdminShopping/containers/AdminProductsBulkEditor";
import AdminLayout from "containers/AdminLayout";

export default function AdminCategoriesPage() {
  return <ProductBulkEditor plugin={SHOPPING_PLUGIN} />;
}
AdminCategoriesPage.ShouldBeAdmin = true;
AdminCategoriesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "ویرایش جمعی محصولات",
};
