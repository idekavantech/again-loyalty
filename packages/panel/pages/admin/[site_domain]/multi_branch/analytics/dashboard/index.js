import AdminLayout from "containers/AdminLayout";

import AnalyticsDashboardContainer from "containers/AdminReports/containers/AnalyticsDashboard";

export default function AdminReportsDashboard() {
  return <AnalyticsDashboardContainer isSuper={true} />;
}
AdminReportsDashboard.ShouldBeAdmin = true;
AdminReportsDashboard.Wrapper = AdminLayout;
// AdminFeedbacksPage.layoutConfig = { isSmall: true };
export const breadcrumb = {
  title: "داشبورد گزارش‌ها",
};
