import AdminLayout from "containers/AdminLayout";
import AdminShoppingDeliveryMainSettingsPageContainer from "containers/AdminShopping/containers/AdminDeliveryMainSettings";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminShoppingDeliveryMainSettingsPage() {
  return (
    <AdminShoppingDeliveryMainSettingsPageContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminShoppingDeliveryMainSettingsPage[BRANCHES_PLUGIN] = true;
AdminShoppingDeliveryMainSettingsPage.ShouldBeAdmin = true;
AdminShoppingDeliveryMainSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Send settings",
};
