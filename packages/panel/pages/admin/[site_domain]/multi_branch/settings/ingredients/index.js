import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminIngredientSettings from "containers/AdminShopping/containers/AdminIngredientList";
import AdminLayout from "containers/AdminLayout";

export default function AdminCategoriesPage() {
  return <AdminIngredientSettings isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminCategoriesPage[BRANCHES_PLUGIN] = true;
AdminCategoriesPage.ShouldBeAdmin = true;
AdminCategoriesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Raw material",
};
