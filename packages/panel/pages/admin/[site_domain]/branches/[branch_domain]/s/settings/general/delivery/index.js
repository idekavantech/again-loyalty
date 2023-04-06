import AdminLayout from "containers/AdminLayout";
import AdminShoppingDeliveryMainSettingsPageContainer from "containers/AdminShopping/containers/AdminDeliveryMainSettings";

export default function AdminShoppingDeliveryMainSettingsPage() {
  return <AdminShoppingDeliveryMainSettingsPageContainer />;
}
AdminShoppingDeliveryMainSettingsPage.ShouldBeAdmin = true;
AdminShoppingDeliveryMainSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Send settings",
};
