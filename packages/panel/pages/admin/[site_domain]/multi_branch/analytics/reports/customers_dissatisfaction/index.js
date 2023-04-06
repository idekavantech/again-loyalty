import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCustomersDissatisfactionContainer from "containers/AdminReports/containers/reports/CustomersDissatisfaction";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsCustomersDissatisfaction() {
  return (
    <AdminAnalyticsCustomersDissatisfactionContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsCustomersDissatisfaction.ShouldBeAdmin = true;
AdminAnalyticsCustomersDissatisfaction.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "تحلیل نارضایتی مشتریان",
};
