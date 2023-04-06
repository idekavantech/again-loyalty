import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsInventoryHistoryContainer from "containers/AdminReports/containers/reports/InventoryHistory";

export default function AdminAnalyticsPurchaseByIngredients() {
  return <AdminAnalyticsInventoryHistoryContainer />;
}
AdminAnalyticsPurchaseByIngredients.ShouldBeAdmin = true;
AdminAnalyticsPurchaseByIngredients.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش کامل انبار مواد اولیه",
};
