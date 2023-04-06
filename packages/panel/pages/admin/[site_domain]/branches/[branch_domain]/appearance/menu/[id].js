import AdminLayout from "containers/AdminLayout";
import AdminNavigationMenuContainer from "containers/AdminNavigationMenus/AdminNavigationMenu";

export default function AdminHeaderSettingsMenuPage() {
  return <AdminNavigationMenuContainer />;
}

AdminHeaderSettingsMenuPage.ShouldBeAdmin = true;
AdminHeaderSettingsMenuPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Menu Details",
};
