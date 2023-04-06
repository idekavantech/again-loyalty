import CRMSegments from "containers/AdminCRM/containers/CRMSegments";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import {
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default function AdminCRMSegmentsPage() {
  return <CRMSegments />;
}
AdminCRMSegmentsPage[CRM_PLUGIN] = true;
AdminCRMSegmentsPage.ShouldBeAdmin = true;
AdminCRMSegmentsPage.Wrapper = AdminLayout;
AdminCRMSegmentsPage[INCLUDED_WEBAPPS_ONLY_KEY] = [DOBARE_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "بخش‌بندی مشتریان",
};
