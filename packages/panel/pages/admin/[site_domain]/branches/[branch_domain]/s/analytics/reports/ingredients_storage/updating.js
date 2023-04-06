import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsIngredientsStorageUpdatingContainer from "containers/AdminReports/containers/reports/IngredientsStorage/containers/IngredientsStorageUpdating";

export default function AdminAnalyticsIngredientsStorageUpdating() {
  return <AdminAnalyticsIngredientsStorageUpdatingContainer />;
}
AdminAnalyticsIngredientsStorageUpdating.ShouldBeAdmin = true;
AdminAnalyticsIngredientsStorageUpdating.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report of warehousing raw materials based on goods",
};
