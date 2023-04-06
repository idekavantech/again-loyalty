import AdminLayout from "containers/AdminLayout";
import AdminReportsContainer from "containers/AdminReports/containers/AdminMultiBranchesReports/Reports";

export default function AdminReports() {
  return <AdminReportsContainer />;
}
AdminReports.ShouldBeAdmin = true;
AdminReports.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "reports",
};
