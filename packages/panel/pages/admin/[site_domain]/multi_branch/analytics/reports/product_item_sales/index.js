import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsProductItemSalesContainer from "containers/AdminReports/containers/reports/ProductItemSales";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsProductItemSales() {
  return (
    <AdminAnalyticsProductItemSalesContainer isSuper plugin={BRANCHES_PLUGIN} />
  );
}
AdminAnalyticsProductItemSales.ShouldBeAdmin = true;
AdminAnalyticsProductItemSales.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش مالی فروش محصولات",
};
