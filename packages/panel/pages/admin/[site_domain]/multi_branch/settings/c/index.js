import AdminShoppingNavigationPageContainer from "containers/AdminShopping/containers/AdminNavigationSetting";
import AdminLayout from "containers/AdminLayout";

export default function AdminShoppingNavigationPage() {
  return <AdminShoppingNavigationPageContainer />;
}
AdminShoppingNavigationPage.ShouldBeAdmin = true;
AdminShoppingNavigationPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "categories",
};
