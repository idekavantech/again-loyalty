import AdminLayout from "containers/AdminLayout";

import AnalyticsDashboardContainer from "containers/AdminReports/containers/AnalyticsDashboard";

export default function AdminReportsDashboard() {
  return <AnalyticsDashboardContainer />;
}
AdminReportsDashboard.ShouldBeAdmin = true;
AdminReportsDashboard.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Reports Dashboard",
};
