import AdminDevice from "containers/AdminPOS/containers/AdminDevice";
import AdminLayout from "containers/AdminLayout";
import { POS_PLUGIN } from "@saas/utils/constants/plugins";
import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  DARAMAD_WEBAPP_CONSTANT,
} from "@saas/utils/constants";
export default function DevicesPage() {
  return <AdminDevice />;
}

DevicesPage[POS_PLUGIN] = true;
DevicesPage.ShouldBeAdmin = true;
DevicesPage.Wrapper = AdminLayout;
DevicesPage[INCLUDED_WEBAPPS_ONLY_KEY] = [DARAMAD_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "Settings",
};
