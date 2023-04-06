import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCategoriesStorageContainer from "containers/AdminReports/containers/reports/CategoriesStorage";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsCategoriesStorage() {
  return (
    <AdminAnalyticsCategoriesStorageContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsCategoriesStorage.ShouldBeAdmin = true;
AdminAnalyticsCategoriesStorage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش انبارگردانی محصولات",
};
