import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsSalesByPaymentMethodAndSalesChannelReportContainer from "containers/AdminReports/containers/reports/SalesByPaymentMethodAndSalesChanenl";

export default function AdminAnalyticsSalesByPaymentMethodAndSalesChanneleReport() {
  return <AdminAnalyticsSalesByPaymentMethodAndSalesChannelReportContainer />;
}
AdminAnalyticsSalesByPaymentMethodAndSalesChanneleReport.ShouldBeAdmin = true;
AdminAnalyticsSalesByPaymentMethodAndSalesChanneleReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report a number of factors based on payment method and sales channel",
};
