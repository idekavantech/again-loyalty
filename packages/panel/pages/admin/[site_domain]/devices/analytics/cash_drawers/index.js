import AdminLayout from "containers/AdminLayout";
import { POS_PLUGIN } from "@saas/utils/constants/plugins";
import AdminDrawerAnalytics from "containers/AdminPOS/containers/AdminDrawerAnalytics";
import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  DARAMAD_WEBAPP_CONSTANT,
} from "@saas/utils/constants";
export default function AdminDrawerAnalyticsPage() {
  return <AdminDrawerAnalytics />;
}

AdminDrawerAnalyticsPage[POS_PLUGIN] = true;
AdminDrawerAnalyticsPage.ShouldBeAdmin = true;
AdminDrawerAnalyticsPage.Wrapper = AdminLayout;
AdminDrawerAnalyticsPage[INCLUDED_WEBAPPS_ONLY_KEY] = [DARAMAD_WEBAPP_CONSTANT];

export const breadcrumb = {
  title: "Funds",
};
