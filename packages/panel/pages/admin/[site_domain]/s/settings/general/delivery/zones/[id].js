import AdminLayout from "containers/AdminLayout";
import AdminDeliveryZonePage from "containers/AdminShopping/containers/AdminDeliveryZone/DeliveryZone";

export default function AdminShoppingDeliveryZonePage() {
  return <AdminDeliveryZonePage />;
}
AdminShoppingDeliveryZonePage.ShouldBeAdmin = true;
AdminShoppingDeliveryZonePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Details of service range and submission cost determination",
};
