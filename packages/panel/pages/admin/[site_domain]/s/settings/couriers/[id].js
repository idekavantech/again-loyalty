import AdminCourierPersonal from "containers/AdminShopping/containers/AdminCouriers/containers/personal/containers";
import AdminLayout from "containers/AdminLayout";

export default function AdminCourierPage() {
  return <AdminCourierPersonal />;
}
AdminCourierPage.ShouldBeAdmin = true;
AdminCourierPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Courier details",
};
