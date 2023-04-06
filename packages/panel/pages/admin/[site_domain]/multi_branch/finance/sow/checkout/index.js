import AdminLayout from "containers/AdminLayout";
import AdminSOWCheckoutContainer from "containers/AdminFinance/SOW/Checkout";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminSOWCheckout() {
  return <AdminSOWCheckoutContainer plugin={BRANCHES_PLUGIN} isSuper />;
}
AdminSOWCheckout.ShouldBeAdmin = true;
AdminSOWCheckout.Wrapper = AdminLayout;
