import AdminLayout from "containers/AdminLayout";
import AdminShoppingDeliveryTypeSettingsPageContainer from "containers/AdminShopping/containers/AdminDeliveryMainSettings/deliveryType";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminShoppingDeliveryTypeSettingsPage() {
  return (
    <AdminShoppingDeliveryTypeSettingsPageContainer
      plugin={BRANCHES_PLUGIN}
      isSuper
    />
  );
}
AdminShoppingDeliveryTypeSettingsPage[BRANCHES_PLUGIN] = true;
AdminShoppingDeliveryTypeSettingsPage.ShouldBeAdmin = true;
AdminShoppingDeliveryTypeSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Details of the method of submission",
};
