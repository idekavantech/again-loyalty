import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsDiscountCodeReportContainer from "containers/AdminReports/containers/reports/DiscountCodeReport";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsDiscountCodeReport() {
  return (
    <AdminAnalyticsDiscountCodeReportContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsDiscountCodeReport.ShouldBeAdmin = true;
AdminAnalyticsDiscountCodeReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش کدهای تخفیف",
};
