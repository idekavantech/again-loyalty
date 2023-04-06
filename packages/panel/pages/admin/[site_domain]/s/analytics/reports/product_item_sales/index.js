import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsProductItemSalesContainer from "containers/AdminReports/containers/reports/ProductItemSales";

export default function AdminAnalyticsProductItemSales() {
  return <AdminAnalyticsProductItemSalesContainer />;
}
AdminAnalyticsProductItemSales.ShouldBeAdmin = true;
AdminAnalyticsProductItemSales.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Financial Sale of Products",
};
