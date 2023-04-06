import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";
import AdminVendor from "containers/AdminShopping/containers/AdminVendor";

export default function AdminVendorPage() {
  return <AdminVendor plugin={BRANCHES_PLUGIN} />;
}
AdminVendorPage[BRANCHES_PLUGIN] = true;
AdminVendorPage.ShouldBeAdmin = true;
AdminVendorPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Provider details",
};
