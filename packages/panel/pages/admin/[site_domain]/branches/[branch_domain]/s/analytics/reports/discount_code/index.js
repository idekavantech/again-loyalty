import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsDiscountCodeReportContainer from "containers/AdminReports/containers/reports/DiscountCodeReport";

export default function AdminAnalyticsDiscountCodeReport() {
  return <AdminAnalyticsDiscountCodeReportContainer />;
}
AdminAnalyticsDiscountCodeReport.ShouldBeAdmin = true;
AdminAnalyticsDiscountCodeReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report discount codes",
};
