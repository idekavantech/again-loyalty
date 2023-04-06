import AdminDiscountsContainer from "containers/AdminShopping/containers/AdminDiscounts";
import AdminLayout from "containers/AdminLayout";

export default function AdminDiscountsPage() {
  return <AdminDiscountsContainer />;
}
AdminDiscountsPage.ShouldBeAdmin = true;
AdminDiscountsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Discounts",
};
