import AdminLayout from "containers/AdminLayout";
import AdminEditOrderPageContainer from "containers/AdminShopping/containers/AdminEditOrder";

export default function AdminOrderPage() {
  return <AdminEditOrderPageContainer />;
}
AdminOrderPage.ShouldBeAdmin = true;
AdminOrderPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "ویرایش سفارش",
};
