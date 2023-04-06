import AdminLayout from "containers/AdminLayout";
import AdminShoppingDeliveryPickupPageContainer from "containers/AdminShopping/containers/AdminDeliveryPickup";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminShoppingDeliveryPickupPage() {
  return (
    <AdminShoppingDeliveryPickupPageContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminShoppingDeliveryPickupPage[BRANCHES_PLUGIN] = true;
AdminShoppingDeliveryPickupPage.ShouldBeAdmin = true;
AdminShoppingDeliveryPickupPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "In-person delivery(Receiving in place)",
};
