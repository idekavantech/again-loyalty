import AdminCRMMainPagePageContainer from "containers/AdminCRM/containers/CRMMembershipsList";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
export default function AdminCRMMainPagePage() {
  return <AdminCRMMainPagePageContainer />;
}
AdminCRMMainPagePage[CRM_PLUGIN] = true;
AdminCRMMainPagePage.ShouldBeAdmin = true;
AdminCRMMainPagePage.Wrapper = AdminLayout;
