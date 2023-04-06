import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsIngredientsStorageDetailsContainer from "containers/AdminReports/containers/reports/IngredientsStorage/containers/IngredientsStorageCounting";

export default function AdminAnalyticsIngredientsStorageDetails() {
  return <AdminAnalyticsIngredientsStorageDetailsContainer />;
}
AdminAnalyticsIngredientsStorageDetails.ShouldBeAdmin = true;
AdminAnalyticsIngredientsStorageDetails.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "درخواست شمارش موجودی مواداولیه",
};
