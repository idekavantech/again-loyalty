import AdminLayout from "containers/AdminLayout";
import AdminShoppingDeliveryZonePageContainer from "containers/AdminShopping/containers/AdminDeliveryZone";

export default function AdminShoppingDeliveryZonePage() {
  return <AdminShoppingDeliveryZonePageContainer />;
}
AdminShoppingDeliveryZonePage.ShouldBeAdmin = true;
AdminShoppingDeliveryZonePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Determine the Service range and the shipping cost",
};
