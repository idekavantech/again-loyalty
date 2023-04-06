import AdminLayout from "containers/AdminLayout";
import AdminNavigationMenusContainer from "containers/AdminNavigationMenus";

export default function AdminHeaderSettingsMenusPage() {
  return <AdminNavigationMenusContainer />;
}

AdminHeaderSettingsMenusPage.ShouldBeAdmin = true;
AdminHeaderSettingsMenusPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Edit site menus",
};
