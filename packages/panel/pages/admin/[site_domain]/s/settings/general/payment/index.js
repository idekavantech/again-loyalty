import AdminLayout from "containers/AdminLayout";
import AdminShoppingPaymentSettingsPageContainer from "containers/AdminShopping/containers/AdminPaymentSettings";

export default function AdminShoppingPaymentSettingsPage() {
  return <AdminShoppingPaymentSettingsPageContainer />;
}
AdminShoppingPaymentSettingsPage.ShouldBeAdmin = true;
AdminShoppingPaymentSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Payment settings",
};
