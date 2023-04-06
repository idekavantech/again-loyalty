import AdminModifier from "containers/AdminShopping/containers/AdminModifierSet";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingCategoryPage() {
  return <AdminModifier />;
}
AdminShoppingCategoryPage.ShouldBeAdmin = true;
AdminShoppingCategoryPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "جزئیات مجموعه افزودنی",
};
