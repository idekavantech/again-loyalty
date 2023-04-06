import CRMLevels from "containers/AdminCRM/containers/CRMLevels";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import {
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default function AdminCRMLevelsPage() {
  return <CRMLevels />;
}
AdminCRMLevelsPage[CRM_PLUGIN] = true;
AdminCRMLevelsPage.ShouldBeAdmin = true;
AdminCRMLevelsPage.Wrapper = AdminLayout;
AdminCRMLevelsPage[INCLUDED_WEBAPPS_ONLY_KEY] = [DOBARE_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "سطوح مشتریان",
};
