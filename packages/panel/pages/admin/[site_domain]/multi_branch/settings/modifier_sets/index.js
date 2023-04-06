import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import AdminModifierSetList from "containers/AdminShopping/containers/AdminModifierSetList";
import AdminLayout from "containers/AdminLayout";

export default function AdminModifierSetListPage() {
  return <AdminModifierSetList isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminModifierSetListPage[BRANCHES_PLUGIN] = true;
AdminModifierSetListPage.ShouldBeAdmin = true;
AdminModifierSetListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Additive sets",
};
