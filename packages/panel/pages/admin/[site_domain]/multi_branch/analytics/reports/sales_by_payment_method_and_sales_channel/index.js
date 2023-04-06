import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsSalesByPaymentMethodAndSalesChannelReportContainer from "containers/AdminReports/containers/reports/SalesByPaymentMethodAndSalesChanenl";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsSalesByPaymentMethodAndSalesChanneleReport() {
  return (
    <AdminAnalyticsSalesByPaymentMethodAndSalesChannelReportContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsSalesByPaymentMethodAndSalesChanneleReport.ShouldBeAdmin = true;
AdminAnalyticsSalesByPaymentMethodAndSalesChanneleReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report a number of factors based on payment method and sales channel",
};
