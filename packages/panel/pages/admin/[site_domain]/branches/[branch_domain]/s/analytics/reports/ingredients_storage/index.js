import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsIngredientsStorageContainer from "containers/AdminReports/containers/reports/IngredientsStorage";
import {
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default function AdminAnalyticsIngredientsStorage() {
  return <AdminAnalyticsIngredientsStorageContainer />;
}
AdminAnalyticsIngredientsStorage.ShouldBeAdmin = true;
AdminAnalyticsIngredientsStorage[INCLUDED_WEBAPPS_ONLY_KEY] = [
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
];
AdminAnalyticsIngredientsStorage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "View the results of warehousing raw materials",
};
