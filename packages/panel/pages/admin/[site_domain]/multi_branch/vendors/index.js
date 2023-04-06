import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";
import AdminVendorSettings from "containers/AdminShopping/containers/AdminVendorSettings";

export default function AdminVendorSettingsPage() {
  return <AdminVendorSettings plugin={BRANCHES_PLUGIN} />;
}
AdminVendorSettingsPage[BRANCHES_PLUGIN] = true;
AdminVendorSettingsPage.ShouldBeAdmin = true;
AdminVendorSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Suppliers",
};
