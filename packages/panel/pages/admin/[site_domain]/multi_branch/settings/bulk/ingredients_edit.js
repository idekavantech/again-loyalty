import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import IngredientBulkEditor from "containers/AdminShopping/containers/AdminIngredientsBulkEditor";
import AdminLayout from "containers/AdminLayout";

export default function BulkIngredientPage() {
  return <IngredientBulkEditor isSuper plugin={BRANCHES_PLUGIN} />;
}
BulkIngredientPage[BRANCHES_PLUGIN] = true;
BulkIngredientPage.ShouldBeAdmin = true;
BulkIngredientPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Collective editing of raw materials",
};
