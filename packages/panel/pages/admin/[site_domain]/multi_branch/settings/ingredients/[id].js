import AdminIngredient from "containers/AdminShopping/containers/AdminIngredient";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingCategoryPage() {
  return <AdminIngredient isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminShoppingCategoryPage[BRANCHES_PLUGIN] = true;
AdminShoppingCategoryPage.ShouldBeAdmin = true;
AdminShoppingCategoryPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "جزئیات ماده اولیه",
};
