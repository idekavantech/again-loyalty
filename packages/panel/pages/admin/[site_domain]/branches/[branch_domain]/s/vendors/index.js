import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";
import AdminVendorSettings from "containers/AdminShopping/containers/AdminVendorSettings";

export default function AdminVendorSettingsPage() {
  return <AdminVendorSettings plugin={SHOPPING_PLUGIN} />;
}
AdminVendorSettingsPage.ShouldBeAdmin = true;
AdminVendorSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "تامین‌کننده‌ها",
};
