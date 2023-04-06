import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsInventoryHistoryContainer from "containers/AdminReports/containers/reports/InventoryHistory";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsPurchaseByIngredients() {
  return (
    <AdminAnalyticsInventoryHistoryContainer isSuper plugin={BRANCHES_PLUGIN} />
  );
}
AdminAnalyticsPurchaseByIngredients.ShouldBeAdmin = true;
AdminAnalyticsPurchaseByIngredients.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش کامل انبار مواد اولیه",
};
