import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsProductActiveAndUnactiveReportContainer from "containers/AdminReports/containers/reports/ProductsDeactivationReport";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsProductActiveAndUnactiveReport() {
  return (
    <AdminAnalyticsProductActiveAndUnactiveReportContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsProductActiveAndUnactiveReport.ShouldBeAdmin = true;
AdminAnalyticsProductActiveAndUnactiveReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report to Disable Products",
};
