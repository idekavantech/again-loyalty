import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsReceivedTaxContainer from "containers/AdminReports/containers/reports/ReceivedTax";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsReceivedTax() {
  return (
    <AdminAnalyticsReceivedTaxContainer isSuper plugin={BRANCHES_PLUGIN} />
  );
}
AdminAnalyticsReceivedTax.ShouldBeAdmin = true;
AdminAnalyticsReceivedTax.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Tax report based on branches",
};
