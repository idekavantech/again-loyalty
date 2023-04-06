import AdminOrdersListPageContainer from "containers/AdminShopping/containers/AdminOrdersList";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminLayout from "containers/AdminLayout";

export default function AdminOrdersListPage() {
  return <AdminOrdersListPageContainer isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminOrdersListPage[BRANCHES_PLUGIN] = true;
AdminOrdersListPage.ShouldBeAdmin = true;
AdminOrdersListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Orders",
};
