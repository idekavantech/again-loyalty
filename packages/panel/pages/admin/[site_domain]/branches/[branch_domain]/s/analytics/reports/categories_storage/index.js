import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCategoriesStorageContainer from "containers/AdminReports/containers/reports/CategoriesStorage";

export default function AdminAnalyticsCategoriesStorage() {
  return <AdminAnalyticsCategoriesStorageContainer />;
}
AdminAnalyticsCategoriesStorage.ShouldBeAdmin = true;
AdminAnalyticsCategoriesStorage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Product warehousing report",
};
