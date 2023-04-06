import AdminDashboard from "containers";
import AdminLayout from "containers/AdminLayout";
export default function AdminHomePage() {
  return <AdminDashboard />;
}
AdminHomePage.ShouldBeAdmin = true;
AdminHomePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "داشبورد",
};
