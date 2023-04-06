import AdminLayout from "containers/AdminLayout";
import AdminSOWContainer from "containers/AdminFinance/SOW";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminSOW() {
  return <AdminSOWContainer plugin={BRANCHES_PLUGIN} isSuper />;
}
AdminSOW.ShouldBeAdmin = true;
AdminSOW.Wrapper = AdminLayout;
