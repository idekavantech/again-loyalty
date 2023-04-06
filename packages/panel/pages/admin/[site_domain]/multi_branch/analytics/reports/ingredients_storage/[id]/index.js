import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsIngredientsStorageDetailsContainer from "containers/AdminReports/containers/reports/IngredientsStorage/containers/IngredientsStorageUpdating";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsIngredientsStorageDetails() {
  return (
    <AdminAnalyticsIngredientsStorageDetailsContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsIngredientsStorageDetails.ShouldBeAdmin = true;
AdminAnalyticsIngredientsStorageDetails.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report of warehousing raw materials based on goods",
};
