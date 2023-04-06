import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminSuperCategoriesListContainer from "containers/AdminShopping/containers/AdminCategorySettings";
import AdminLayout from "containers/AdminLayout";

export default function AdminCategoriesPage() {
  return <AdminSuperCategoriesListContainer plugin={BRANCHES_PLUGIN} isSuper />;
}
AdminCategoriesPage[BRANCHES_PLUGIN] = true;
AdminCategoriesPage.ShouldBeAdmin = true;
AdminCategoriesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "برچسب‌ها",
};
