import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsIngredientsStorageUpdatingContainer from "containers/AdminReports/containers/reports/IngredientsStorage/containers/IngredientsStorageUpdating";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsIngredientsStorageUpdating() {
  return (
    <AdminAnalyticsIngredientsStorageUpdatingContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsIngredientsStorageUpdating.ShouldBeAdmin = true;
AdminAnalyticsIngredientsStorageUpdating.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش انبارگردانی مواد اولیه بر اساس کالا",
};
