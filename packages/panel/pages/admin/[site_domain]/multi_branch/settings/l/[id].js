import AdminSuperCategoryContainer from "containers/AdminShopping/containers/AdminCategory";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingCategoryPage() {
  return <AdminSuperCategoryContainer isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminShoppingCategoryPage[BRANCHES_PLUGIN] = true;
AdminShoppingCategoryPage.ShouldBeAdmin = true;
AdminShoppingCategoryPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "جزئیات برچسب",
};
