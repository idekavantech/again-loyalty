import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsProductSalesSalesReportContainer from "containers/AdminReports/containers/reports/ProductSales";

export default function AdminAnalyticsProductSalesReport() {
  return <AdminAnalyticsProductSalesSalesReportContainer />;
}
AdminAnalyticsProductSalesReport.ShouldBeAdmin = true;
AdminAnalyticsProductSalesReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report a number of sales of products",
};
