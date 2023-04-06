import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import ModifiersBulkInventory from "containers/AdminShopping/containers/AdminModifierSetsInventoryBulkEditor";
import AdminLayout from "containers/AdminLayout";

export default function BulkModifiersPage() {
  return <ModifiersBulkInventory plugin={SHOPPING_PLUGIN} />;
}
BulkModifiersPage.ShouldBeAdmin = true;
BulkModifiersPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Adjustment of additives",
};
