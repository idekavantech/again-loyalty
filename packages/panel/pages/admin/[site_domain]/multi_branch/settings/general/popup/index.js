import AdminLayout from "containers/AdminLayout";
import AdminShoppingPopupPageContainer from "containers/AdminShopping/containers/AdminPopup";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminShoppingPopupPage() {
  return <AdminShoppingPopupPageContainer isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminShoppingPopupPage[BRANCHES_PLUGIN] = true;
AdminShoppingPopupPage.ShouldBeAdmin = true;
AdminShoppingPopupPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Popper Settings",
};
