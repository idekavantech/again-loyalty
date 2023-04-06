import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsModifiersSaleContainer from "containers/AdminReports/containers/reports/ModifiersSaleReport";

export default function AdminAnalyticsModifiersSale() {
  return <AdminAnalyticsModifiersSaleContainer />;
}
AdminAnalyticsModifiersSale.ShouldBeAdmin = true;
AdminAnalyticsModifiersSale.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Sale of additives",
};
