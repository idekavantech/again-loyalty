import AdminIngredient from "containers/AdminShopping/containers/AdminIngredient";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingCategoryPage() {
  return <AdminIngredient />;
}
AdminShoppingCategoryPage.ShouldBeAdmin = true;
AdminShoppingCategoryPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "The details of the raw material",
};
