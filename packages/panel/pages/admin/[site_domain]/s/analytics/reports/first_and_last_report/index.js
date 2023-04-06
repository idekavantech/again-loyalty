import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsFirstAndLastReportContainer from "containers/AdminReports/containers/reports/FirstAndLastReport";

export default function AdminAnalyticsFirstAndLastReportReport() {
  return <AdminAnalyticsFirstAndLastReportContainer />;
}
AdminAnalyticsFirstAndLastReportReport.ShouldBeAdmin = true;
AdminAnalyticsFirstAndLastReportReport.Wrapper = AdminLayout;

export const breadcrumb = {
  title: "Report the first and last purchase",
};
