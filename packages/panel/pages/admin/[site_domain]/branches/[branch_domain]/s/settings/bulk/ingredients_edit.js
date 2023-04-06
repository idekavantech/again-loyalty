import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import IngredientBulkEditor from "containers/AdminShopping/containers/AdminIngredientsBulkEditor";
import AdminLayout from "containers/AdminLayout";

export default function BulkIngredientPage() {
  return <IngredientBulkEditor plugin={SHOPPING_PLUGIN} />;
}
BulkIngredientPage.ShouldBeAdmin = true;
BulkIngredientPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "ویرایش جمعی مواد اولیه",
};
