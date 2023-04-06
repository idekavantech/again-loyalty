import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import CampaignDetails from "containers/AdminCRM/containers/campaignDetail";
export default function AdminCampaignDetailsPage() {
  return <CampaignDetails />;
}
AdminCampaignDetailsPage[CRM_PLUGIN] = true;
AdminCampaignDetailsPage.ShouldBeAdmin = true;
AdminCampaignDetailsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Creating a new campaign",
};
