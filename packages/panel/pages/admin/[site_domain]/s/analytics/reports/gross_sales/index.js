import AdminGrossSales from "containers/AdminReports/containers/reports/GrossSalesReport";
import AdminLayout from "containers/AdminLayout";

export default function AdminGrossSalesReport() {
  return <AdminGrossSales />;
}
AdminGrossSalesReport.ShouldBeAdmin = true;
AdminGrossSalesReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "GDP Sale Report",
};
