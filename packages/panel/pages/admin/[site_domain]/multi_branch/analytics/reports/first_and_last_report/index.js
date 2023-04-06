import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsFirstAndLastReportContainer from "containers/AdminReports/containers/reports/FirstAndLastReport";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsFirstAndLastReportReport() {
  return (
    <AdminAnalyticsFirstAndLastReportContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsFirstAndLastReportReport.ShouldBeAdmin = true;
AdminAnalyticsFirstAndLastReportReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش اولین و آخرین خرید",
};
