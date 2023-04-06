import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsComprehensiveReportContainer from "containers/AdminReports/containers/reports/ComprehensiveReport";

export default function AdminAnalyticsComprehensiveReport() {
  return <AdminAnalyticsComprehensiveReportContainer />;
}
AdminAnalyticsComprehensiveReport.ShouldBeAdmin = true;
AdminAnalyticsComprehensiveReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Comprehensive Performance Report",
};
