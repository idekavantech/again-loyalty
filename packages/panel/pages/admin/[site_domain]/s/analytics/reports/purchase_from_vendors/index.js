import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsPurchaseFromVendorsContainer from "containers/AdminReports/containers/reports/PurchaseFromVendors";

export default function AdminAnalyticsPurchaseFromVendors() {
  return <AdminAnalyticsPurchaseFromVendorsContainer />;
}
AdminAnalyticsPurchaseFromVendors.ShouldBeAdmin = true;
AdminAnalyticsPurchaseFromVendors.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report purchase documents from suppliers",
};
