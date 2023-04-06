import AdminLayout from "containers/AdminLayout";
import AdminOrdersListPageContainer from "containers/AdminShopping/containers/AdminOrdersList";

export default function AdminOrdersListPage() {
  return <AdminOrdersListPageContainer />;
}
AdminOrdersListPage.ShouldBeAdmin = true;
AdminOrdersListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Orders",
};
