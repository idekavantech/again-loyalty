import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCustomersDissatisfactionContainer from "containers/AdminReports/containers/reports/CustomersDissatisfaction";

export default function AdminAnalyticsCustomersDissatisfaction() {
  return <AdminAnalyticsCustomersDissatisfactionContainer />;
}
AdminAnalyticsCustomersDissatisfaction.ShouldBeAdmin = true;
AdminAnalyticsCustomersDissatisfaction.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Customer dissatisfaction analysis",
};
