import AdminDevicesContainer from "containers/AdminPOS/containers/AdminDevices";
import AdminLayout from "containers/AdminLayout";
import { POS_PLUGIN } from "@saas/utils/constants/plugins";
import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  DARAMAD_WEBAPP_CONSTANT,
} from "@saas/utils/constants";
export default function DevicesPage() {
  return <AdminDevicesContainer />;
}

DevicesPage[POS_PLUGIN] = true;
DevicesPage.ShouldBeAdmin = true;
DevicesPage.Wrapper = AdminLayout;
DevicesPage[INCLUDED_WEBAPPS_ONLY_KEY] = [DARAMAD_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "دستگاه‌ها",
};
