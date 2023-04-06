import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCategoriesSalesReportContainer from "containers/AdminReports/containers/reports/CategoriesSalesReport";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsCategoriesSalesReport() {
  return (
    <AdminAnalyticsCategoriesSalesReportContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsCategoriesSalesReport.ShouldBeAdmin = true;
AdminAnalyticsCategoriesSalesReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش مالی فروش دسته‌بندی‌ها",
};
