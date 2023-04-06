import AdminLayout from "containers/AdminLayout";
import AdminShoppingDeliveryPickupPageContainer from "containers/AdminShopping/containers/AdminDeliveryPickup";

export default function AdminShoppingDeliveryPickupPage() {
  return <AdminShoppingDeliveryPickupPageContainer />;
}
AdminShoppingDeliveryPickupPage.ShouldBeAdmin = true;
AdminShoppingDeliveryPickupPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "In-person delivery(Receiving in place)",
};
