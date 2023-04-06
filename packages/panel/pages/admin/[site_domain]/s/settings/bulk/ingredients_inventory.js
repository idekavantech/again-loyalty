import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import IngredientBulkInventory from "containers/AdminShopping/containers/AdminIngredientsInventoryBulkEditor";
import AdminLayout from "containers/AdminLayout";
import {
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default function BulkSuperIngredientPage() {
  return <IngredientBulkInventory plugin={SHOPPING_PLUGIN} />;
}
BulkSuperIngredientPage[SHOPPING_PLUGIN] = true;
BulkSuperIngredientPage[INCLUDED_WEBAPPS_ONLY_KEY] = [
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
];
BulkSuperIngredientPage.ShouldBeAdmin = true;
BulkSuperIngredientPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Regulating the inventory of raw materials",
};
