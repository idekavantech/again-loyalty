import OrdersPageContainer from "@saas/plugins/Shopping/containers/Orders";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function OrdersPage() {
  return <OrdersPageContainer isSuper plugin={BRANCHES_PLUGIN} />;
}
OrdersPage[BRANCHES_PLUGIN] = true;
OrdersPage.NeedAuth = true;
