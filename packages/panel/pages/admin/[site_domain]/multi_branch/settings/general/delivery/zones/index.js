import AdminLayout from "containers/AdminLayout";
import AdminShoppingDeliveryZonePageContainer from "containers/AdminShopping/containers/AdminDeliveryZone";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminShoppingDeliveryZonePage() {
  return (
    <AdminShoppingDeliveryZonePageContainer isSuper plugin={BRANCHES_PLUGIN} />
  );
}
AdminShoppingDeliveryZonePage[BRANCHES_PLUGIN] = true;
AdminShoppingDeliveryZonePage.ShouldBeAdmin = true;
AdminShoppingDeliveryZonePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Determine the Service range and the shipping cost",
};
