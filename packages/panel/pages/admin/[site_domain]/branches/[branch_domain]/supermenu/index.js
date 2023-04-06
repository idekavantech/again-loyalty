import AdminSuperMenuLayout from "containers/AdminSuperMenu";
import AdminLayout from "containers/AdminLayout";
import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  DARAMAD_WEBAPP_CONSTANT,
} from "@saas/utils/constants";
export default function SuperMenuPage() {
  return <AdminSuperMenuLayout />;
}
SuperMenuPage.ShouldBeAdmin = true;
SuperMenuPage.Wrapper = AdminLayout;
SuperMenuPage[INCLUDED_WEBAPPS_ONLY_KEY] = [DARAMAD_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "Product layout and shortcut",
};
