import AdminLayout from "containers/AdminLayout";
import AdminReportsContainer from "containers/AdminReports/containers/AdminBusinessReports/Reports";

export default function AdminReports() {
  return <AdminReportsContainer />;
}
AdminReports.ShouldBeAdmin = true;
AdminReports.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "reports",
};
