import AdminLayout from "containers/AdminLayout";
import AdminShoppingDashboardPageContainer from "containers/AdminShopping/containers/AdminShoppingDashboard";

export default function AdminShoppingDashboardPage() {
  return <AdminShoppingDashboardPageContainer />;
}
AdminShoppingDashboardPage.ShouldBeAdmin = true;
AdminShoppingDashboardPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Ordering settings",
};
