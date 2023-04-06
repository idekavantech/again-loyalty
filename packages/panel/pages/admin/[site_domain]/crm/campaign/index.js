import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import CRMRCampaignPage from "containers/AdminCRM/containers/campaignList/index";

export default function AdminCRMCampaign() {
  return <CRMRCampaignPage />;
}
AdminCRMCampaign[CRM_PLUGIN] = true;
AdminCRMCampaign.ShouldBeAdmin = true;
AdminCRMCampaign.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Campaigns",
};
