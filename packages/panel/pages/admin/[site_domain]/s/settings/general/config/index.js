import AdminLayout from "containers/AdminLayout";
import AdminShoppingConfigPageContainer from "containers/AdminShopping/containers/AdminConfig";

export default function AdminShoppingConfigPage() {
  return <AdminShoppingConfigPageContainer />;
}
AdminShoppingConfigPage.ShouldBeAdmin = true;
AdminShoppingConfigPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Public Ordering Online Order Settings",
};
