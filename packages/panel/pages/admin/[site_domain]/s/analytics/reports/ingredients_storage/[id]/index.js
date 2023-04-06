import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsIngredientsStorageDetailsContainer from "containers/AdminReports/containers/reports/IngredientsStorage/containers/IngredientsStorageUpdating";

export default function AdminAnalyticsIngredientsStorageDetails() {
  return <AdminAnalyticsIngredientsStorageDetailsContainer />;
}
AdminAnalyticsIngredientsStorageDetails.ShouldBeAdmin = true;
AdminAnalyticsIngredientsStorageDetails.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report of warehousing raw materials based on goods",
};
