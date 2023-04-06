import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCostOfGoodsSoldContainer from "containers/AdminReports/containers/reports/CostOfGoodsSold";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsCostOfGoodsSold() {
  return (
    <AdminAnalyticsCostOfGoodsSoldContainer isSuper plugin={BRANCHES_PLUGIN} />
  );
}
AdminAnalyticsCostOfGoodsSold.ShouldBeAdmin = true;
AdminAnalyticsCostOfGoodsSold.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report of cost -sold products",
};
