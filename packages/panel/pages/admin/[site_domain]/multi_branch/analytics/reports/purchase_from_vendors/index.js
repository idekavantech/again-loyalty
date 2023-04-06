import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsPurchaseFromVendorsContainer from "containers/AdminReports/containers/reports/PurchaseFromVendors";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminAnalyticsPurchaseFromVendors() {
  return (
    <AdminAnalyticsPurchaseFromVendorsContainer
      isSuper
      plugin={BRANCHES_PLUGIN}
    />
  );
}
AdminAnalyticsPurchaseFromVendors.ShouldBeAdmin = true;
AdminAnalyticsPurchaseFromVendors.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report branch purchase documents from suppliers",
};
