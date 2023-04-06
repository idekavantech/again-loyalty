import AdminCRMLabelsListPageContainer from "containers/AdminCRM/containers/CRMLabelsListPage";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminCRMLabelsListPage() {
  return <AdminCRMLabelsListPageContainer />;
}

AdminCRMLabelsListPage[CRM_PLUGIN] = true;
AdminCRMLabelsListPage.ShouldBeAdmin = true;
AdminCRMLabelsListPage.layoutConfig = { isSmall: true };
AdminCRMLabelsListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "تنظیمات اتوماسیون مارکتینگ",
};
