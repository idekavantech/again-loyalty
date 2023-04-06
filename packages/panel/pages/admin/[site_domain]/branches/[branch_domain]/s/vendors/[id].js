import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";
import AdminVendor from "containers/AdminShopping/containers/AdminVendor";

export default function AdminVendorPage() {
  return <AdminVendor plugin={SHOPPING_PLUGIN} />;
}
AdminVendorPage.ShouldBeAdmin = true;
AdminVendorPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "جزئیات تامین‌کننده",
};
