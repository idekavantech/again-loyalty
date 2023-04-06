import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsProductActiveAndUnactiveReportContainer from "containers/AdminReports/containers/reports/ProductsDeactivationReport";

export default function AdminAnalyticsProductActiveAndUnactiveReport() {
  return <AdminAnalyticsProductActiveAndUnactiveReportContainer />;
}
AdminAnalyticsProductActiveAndUnactiveReport.ShouldBeAdmin = true;
AdminAnalyticsProductActiveAndUnactiveReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report to Disable Products",
};
