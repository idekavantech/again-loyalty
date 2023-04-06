import AdminProductsListContainer from "containers/AdminShopping/containers/AdminProductsList";
import AdminLayout from "containers/AdminLayout";

export default function AdminProductsListPage() {
  return <AdminProductsListContainer />;
}
AdminProductsListPage.ShouldBeAdmin = true;
AdminProductsListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Products",
};
