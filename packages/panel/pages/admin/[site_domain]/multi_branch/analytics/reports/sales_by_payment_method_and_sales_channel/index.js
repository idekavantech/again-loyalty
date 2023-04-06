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
  title: "گزارش تعدادی فاکتور براساس روش پرداخت و کانال فروش",
};
