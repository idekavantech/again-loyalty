import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCustomersSatisfactionContainer from "containers/AdminReports/containers/reports/CustomersSatisfaction";

export default function AdminAnalyticsCustomersSatisfaction() {
  return <AdminAnalyticsCustomersSatisfactionContainer />;
}
AdminAnalyticsCustomersSatisfaction.ShouldBeAdmin = true;
AdminAnalyticsCustomersSatisfaction.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report the amount of customer satisfaction",
};
