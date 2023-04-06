import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsComprehensiveSalesReportContainer from "containers/AdminReports/containers/reports/ComprehensiveSalesReport";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsComprehensiveSalesReport() {
  return (
    <AdminAnalyticsComprehensiveSalesReportContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsComprehensiveSalesReport.ShouldBeAdmin = true;
AdminAnalyticsComprehensiveSalesReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش مالی فروش براساس کانال فروش",
};
