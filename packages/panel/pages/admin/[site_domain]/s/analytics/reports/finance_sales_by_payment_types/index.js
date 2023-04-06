import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsFinanceSalesByPaymentTypesContainer from "containers/AdminReports/containers/reports/FinanceSalesByPaymentTypes";

export default function AdminAnalyticsFinanceSalesByPaymentTypes() {
  return <AdminAnalyticsFinanceSalesByPaymentTypesContainer />;
}
AdminAnalyticsFinanceSalesByPaymentTypes.ShouldBeAdmin = true;
AdminAnalyticsFinanceSalesByPaymentTypes.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report of sales financial transactions based on payment method",
};
