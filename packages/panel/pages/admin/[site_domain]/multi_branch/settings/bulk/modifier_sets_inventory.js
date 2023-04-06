import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import ModifiersBulkInventory from "containers/AdminShopping/containers/AdminModifierSetsInventoryBulkEditor";
import AdminLayout from "containers/AdminLayout";

export default function BulkModifiersPage() {
  return <ModifiersBulkInventory isSuper plugin={BRANCHES_PLUGIN} />;
}
BulkModifiersPage[BRANCHES_PLUGIN] = true;
BulkModifiersPage.ShouldBeAdmin = true;
BulkModifiersPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Adjustment of additives",
};
