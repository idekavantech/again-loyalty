import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsProductSalesSalesReportContainer from "containers/AdminReports/containers/reports/ProductSales";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsProductSalesReport() {
  return (
    <AdminAnalyticsProductSalesSalesReportContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsProductSalesReport.ShouldBeAdmin = true;
AdminAnalyticsProductSalesReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش تعدادی فروش محصولات",
};
