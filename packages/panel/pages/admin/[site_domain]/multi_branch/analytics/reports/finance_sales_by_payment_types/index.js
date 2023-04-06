import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsFinanceSalesByPaymentTypesContainer from "containers/AdminReports/containers/reports/FinanceSalesByPaymentTypes";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsFinanceSalesByPaymentTypes() {
  return (
    <AdminAnalyticsFinanceSalesByPaymentTypesContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsFinanceSalesByPaymentTypes.ShouldBeAdmin = true;
AdminAnalyticsFinanceSalesByPaymentTypes.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش مالی فروش شعب بر اساس روش پرداخت",
};
