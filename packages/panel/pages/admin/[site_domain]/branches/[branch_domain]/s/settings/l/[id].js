import AdminLayout from "containers/AdminLayout";
import AdminCategoryContainer from "containers/AdminShopping/containers/AdminCategory";

export default function AdminShoppingCategoryPage() {
  return <AdminCategoryContainer />;
}
AdminShoppingCategoryPage.ShouldBeAdmin = true;
AdminShoppingCategoryPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "جزئیات برچسب",
};
