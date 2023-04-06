import CRMSegments from "containers/AdminCRM/containers/CRMSegments";
import AdminLayout from "containers/AdminLayout";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import {
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default function CRMSegmentsPage() {
  return <CRMSegments />;
}
CRMSegmentsPage[CRM_PLUGIN] = true;
CRMSegmentsPage.ShouldBeAdmin = true;
CRMSegmentsPage.Wrapper = AdminLayout;
CRMSegmentsPage[INCLUDED_WEBAPPS_ONLY_KEY] = [DOBARE_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "Customer segmentation",
};
