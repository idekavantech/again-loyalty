import AdminLayout from "containers/AdminLayout";
import AdminShoppingPaymentSettingsPageContainer from "containers/AdminShopping/containers/AdminPaymentSettings";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminShoppingPaymentSettingsPage() {
  return (
    <AdminShoppingPaymentSettingsPageContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminShoppingPaymentSettingsPage[BRANCHES_PLUGIN] = true;
AdminShoppingPaymentSettingsPage.ShouldBeAdmin = true;
AdminShoppingPaymentSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Payment settings",
};
