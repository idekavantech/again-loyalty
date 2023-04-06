import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsComprehensiveSalesReportContainer from "containers/AdminReports/containers/reports/ComprehensiveSalesReport";

export default function AdminAnalyticsComprehensiveSalesReport() {
  return <AdminAnalyticsComprehensiveSalesReportContainer />;
}
AdminAnalyticsComprehensiveSalesReport.ShouldBeAdmin = true;
AdminAnalyticsComprehensiveSalesReport.Wrapper = AdminLayout;

export const breadcrumb = {
  title: "Financial Sale Financial Report Based on Sales Channel",
};
