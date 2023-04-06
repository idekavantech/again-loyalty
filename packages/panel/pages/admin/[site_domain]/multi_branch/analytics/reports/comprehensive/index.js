import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsComprehensiveReportContainer from "containers/AdminReports/containers/reports/ComprehensiveReport";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsComprehensiveReport() {
  return (
    <AdminAnalyticsComprehensiveReportContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsComprehensiveReport.ShouldBeAdmin = true;
AdminAnalyticsComprehensiveReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Comprehensive Performance Report",
};
