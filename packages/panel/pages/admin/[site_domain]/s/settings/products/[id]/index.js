import AdminLayout from "containers/AdminLayout";
import AdminProduct from "containers/AdminShopping/containers/AdminProduct";

export default function AdminShoppingProductsSettingsPage() {
  return <AdminProduct />;
}
AdminShoppingProductsSettingsPage.ShouldBeAdmin = true;
AdminShoppingProductsSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Product details",
};
