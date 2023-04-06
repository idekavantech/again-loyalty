import AdminLayout from "containers/AdminLayout";
import AdminProductVariant from "containers/AdminShopping/containers/AdminProductVariation";

export default function AdminShoppingProductsVariantsPage() {
  return <AdminProductVariant />;
}
AdminShoppingProductsVariantsPage.ShouldBeAdmin = true;
AdminShoppingProductsVariantsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Various details",
};
