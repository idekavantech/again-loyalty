import AdminLayout from "containers/AdminLayout";
import AdminDeliveryZonePage from "containers/AdminShopping/containers/AdminDeliveryZone/DeliveryZone";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminShoppingDeliveryZonePage() {
  return <AdminDeliveryZonePage isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminShoppingDeliveryZonePage[BRANCHES_PLUGIN] = true;
AdminShoppingDeliveryZonePage.ShouldBeAdmin = true;
AdminShoppingDeliveryZonePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Details of service range and submission cost determination",
};
