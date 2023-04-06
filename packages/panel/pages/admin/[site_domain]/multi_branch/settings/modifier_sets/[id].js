import AdminModifier from "containers/AdminShopping/containers/AdminModifierSet";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingCategoryPage() {
  return <AdminModifier isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminShoppingCategoryPage[BRANCHES_PLUGIN] = true;
AdminShoppingCategoryPage.ShouldBeAdmin = true;
AdminShoppingCategoryPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Details of the additive collection",
};
