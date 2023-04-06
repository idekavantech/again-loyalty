import AdminLayout from "containers/AdminLayout";
import AdminLogReportContainer from "containers/AdminReports/containers/AdminBusinessReports/LogReport";

export default function AdminLogReport() {
  return <AdminLogReportContainer />;
}
AdminLogReport.ShouldBeAdmin = true;
AdminLogReport.Wrapper = AdminLayout;
// AdminFeedbacksPage.layoutConfig = { isSmall: true };
