import AdminIngredientSettings from "containers/AdminShopping/containers/AdminIngredientList";
import AdminLayout from "containers/AdminLayout";
import {
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
} from "@saas/utils/constants";

export default function AdminCategoriesPage() {
  return <AdminIngredientSettings />;
}
AdminCategoriesPage[INCLUDED_WEBAPPS_ONLY_KEY] = [
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
];
AdminCategoriesPage.ShouldBeAdmin = true;
AdminCategoriesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Raw material",
};
