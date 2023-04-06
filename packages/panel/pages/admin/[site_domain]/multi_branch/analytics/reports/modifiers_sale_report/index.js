import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsModifiersSaleContainer from "containers/AdminReports/containers/reports/ModifiersSaleReport";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsModifiersSale() {
  return (
    <AdminAnalyticsModifiersSaleContainer isSuper plugin={BRANCHES_PLUGIN} />
  );
}
AdminAnalyticsModifiersSale.ShouldBeAdmin = true;
AdminAnalyticsModifiersSale.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Sale of additives",
};
