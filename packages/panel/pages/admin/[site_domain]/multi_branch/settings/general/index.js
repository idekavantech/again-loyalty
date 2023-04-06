import AdminLayout from "containers/AdminLayout";
import AdminShoppingDashboardPageContainer from "containers/AdminShopping/containers/AdminShoppingDashboard";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminShoppingDashboardPage() {
  return (
    <AdminShoppingDashboardPageContainer isSuper plugin={BRANCHES_PLUGIN} />
  );
}
AdminShoppingDashboardPage[BRANCHES_PLUGIN] = true;
AdminShoppingDashboardPage.ShouldBeAdmin = true;
AdminShoppingDashboardPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Ordering settings",
};
