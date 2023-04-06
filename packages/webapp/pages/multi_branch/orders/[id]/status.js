import OrderPageContainer from "@saas/plugins/Shopping/containers/OrderStatus";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function OrderPage() {
  return <OrderPageContainer isSuper />;
}
OrderPage[BRANCHES_PLUGIN] = true;
OrderPage.NeedAuth = true;
