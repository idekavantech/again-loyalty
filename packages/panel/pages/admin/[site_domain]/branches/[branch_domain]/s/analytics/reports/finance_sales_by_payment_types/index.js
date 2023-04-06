import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsFinanceSalesByPaymentTypesContainer from "containers/AdminReports/containers/reports/FinanceSalesByPaymentTypes";

export default function AdminAnalyticsFinanceSalesByPaymentTypes() {
  return <AdminAnalyticsFinanceSalesByPaymentTypesContainer />;
}
AdminAnalyticsFinanceSalesByPaymentTypes.ShouldBeAdmin = true;
AdminAnalyticsFinanceSalesByPaymentTypes.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Financial Report of Sales",
};
