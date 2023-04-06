import AdminCRMLabelPagePageContainer from "containers/AdminCRM/containers/CRMLabelPage";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminCRMLabelPagePage() {
  return <AdminCRMLabelPagePageContainer />;
}
AdminCRMLabelPagePage[CRM_PLUGIN] = true;
AdminCRMLabelPagePage.ShouldBeAdmin = true;
AdminCRMLabelPagePage.layoutConfig = { isSmall: true };
AdminCRMLabelPagePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Build a discount code",
};
