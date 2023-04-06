import AdminCourierContainer from "containers/AdminShopping/containers/AdminCouriers";
import AdminLayout from "containers/AdminLayout";

export default function AdminCourierPage() {
  return <AdminCourierContainer />;
}
AdminCourierPage.ShouldBeAdmin = true;
AdminCourierPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Peaks",
};
