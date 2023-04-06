import AdminNavigationPage from "containers/AdminShopping/containers/AdminNavigation";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingNavigationPage() {
  return <AdminNavigationPage />;
}
AdminShoppingNavigationPage.ShouldBeAdmin = true;
AdminShoppingNavigationPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "جزئیات دسته‌بندی",
};
