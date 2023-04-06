import AdminProductsPageContainer from "containers/AdminShopping/containers/AdminProductsList";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingProductsSettingsPage() {
  return <AdminProductsPageContainer />;
}
AdminShoppingProductsSettingsPage.ShouldBeAdmin = true;
AdminShoppingProductsSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Products",
};
