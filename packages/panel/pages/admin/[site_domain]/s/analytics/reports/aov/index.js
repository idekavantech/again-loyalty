import AdminAOVContainer from "containers/AdminReports/containers/AdminBusinessReports/Reports/AOV";
import AdminLayout from "containers/AdminLayout";

export default function AdminAOVReport() {
  return <AdminAOVContainer />;
}
AdminAOVReport.ShouldBeAdmin = true;
AdminAOVReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "The average value of orders",
};
