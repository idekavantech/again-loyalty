import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import AdminCategoriesListContainer from "containers/AdminShopping/containers/AdminCategorySettings";
import AdminLayout from "containers/AdminLayout";

export default function AdminCategoriesPage() {
  return <AdminCategoriesListContainer />;
}
AdminCategoriesPage[SHOPPING_PLUGIN] = true;
AdminCategoriesPage.ShouldBeAdmin = true;
AdminCategoriesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Labels",
};
