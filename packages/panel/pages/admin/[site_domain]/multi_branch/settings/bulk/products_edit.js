import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import ProductBulkEditor from "containers/AdminShopping/containers/AdminProductsBulkEditor";
import AdminLayout from "containers/AdminLayout";

export default function AdminCategoriesPage() {
  return <ProductBulkEditor isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminCategoriesPage[BRANCHES_PLUGIN] = true;
AdminCategoriesPage.ShouldBeAdmin = true;
AdminCategoriesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Collective editing of products",
};
