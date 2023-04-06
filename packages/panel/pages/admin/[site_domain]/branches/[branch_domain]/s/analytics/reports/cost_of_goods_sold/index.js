import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCostOfGoodsSoldContainer from "containers/AdminReports/containers/reports/CostOfGoodsSold";

export default function AdminAnalyticsCostOfGoodsSold() {
  return <AdminAnalyticsCostOfGoodsSoldContainer />;
}
AdminAnalyticsCostOfGoodsSold.ShouldBeAdmin = true;
AdminAnalyticsCostOfGoodsSold.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report of cost -sold products",
};
