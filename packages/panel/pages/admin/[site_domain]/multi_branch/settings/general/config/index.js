import AdminLayout from "containers/AdminLayout";
import AdminShoppingConfigPageContainer from "containers/AdminShopping/containers/AdminConfig";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminShoppingConfigPage() {
  return <AdminShoppingConfigPageContainer isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminShoppingConfigPage[BRANCHES_PLUGIN] = true;
AdminShoppingConfigPage.ShouldBeAdmin = true;
AdminShoppingConfigPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Public Ordering Online Order Settings",
};
