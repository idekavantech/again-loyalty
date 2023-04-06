import AdminLayout from "containers/AdminLayout";
import AdminShoppingDeliveryTypeSettingsPageContainer from "containers/AdminShopping/containers/AdminDeliveryMainSettings/deliveryType";

export default function AdminShoppingDeliveryTypeSettingsPage() {
  return <AdminShoppingDeliveryTypeSettingsPageContainer />;
}
AdminShoppingDeliveryTypeSettingsPage.ShouldBeAdmin = true;
AdminShoppingDeliveryTypeSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Details of the method of submission",
};
