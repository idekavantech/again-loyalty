import AdminCouriersRecords from "containers/AdminShopping/containers/AdminCouriersRecords";
import AdminLayout from "containers/AdminLayout";

export default function AdminCourierPage() {
  return <AdminCouriersRecords />;
}
AdminCourierPage.ShouldBeAdmin = true;
AdminCourierPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Courier records",
};
