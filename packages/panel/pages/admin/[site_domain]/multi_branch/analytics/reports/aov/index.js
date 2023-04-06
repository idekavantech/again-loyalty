import AdminLayout from "containers/AdminLayout";
import AdminAOVReportContainer from "containers/AdminReports/containers/AdminMultiBranchesReports/Reports/AOV";

export default function AdminAOVReport() {
  return <AdminAOVReportContainer />;
}
AdminAOVReport.ShouldBeAdmin = true;
AdminAOVReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "The average value of orders",
};
