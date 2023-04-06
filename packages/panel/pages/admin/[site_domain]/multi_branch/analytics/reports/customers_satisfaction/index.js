import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCustomersSatisfactionContainer from "containers/AdminReports/containers/reports/CustomersSatisfaction";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsCustomersSatisfaction() {
  return (
    <AdminAnalyticsCustomersSatisfactionContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsCustomersSatisfaction.ShouldBeAdmin = true;
AdminAnalyticsCustomersSatisfaction.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش میزان رضایت مشتریان",
};
